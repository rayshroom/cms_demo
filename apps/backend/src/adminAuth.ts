import { createHmac, timingSafeEqual } from "node:crypto";
import type { NextFunction, Request, Response } from "express";

const adminCookieName = "cms_demo_admin_session";
const sessionMaxAgeSeconds = 60 * 60 * 8;

export interface AdminAuthConfig {
  username: string;
  password: string;
  sessionSecret: string;
  secureCookie: boolean;
}

export function createAdminAuth(config: AdminAuthConfig) {
  return {
    login(request: Request, response: Response) {
      const { username, password } = parseLoginBody(request.body);
      if (
        !safeEquals(username, config.username) ||
        !safeEquals(password, config.password)
      ) {
        response.status(401).json({ error: "InvalidCredentials" });
        return;
      }

      response.setHeader("Set-Cookie", serializeSessionCookie(createSessionToken(config), config));
      response.json({ ok: true });
    },

    logout(_request: Request, response: Response) {
      response.setHeader("Set-Cookie", clearSessionCookie(config));
      response.json({ ok: true });
    },

    session(request: Request, response: Response) {
      response.json({ ok: isLoggedIn(request, config) });
    },

    requireAdminPage(request: Request, response: Response, next: NextFunction) {
      if (isLoggedIn(request, config)) {
        next();
        return;
      }

      response.redirect("/admin/login.html");
    },

    requireAdminApi(request: Request, response: Response, next: NextFunction) {
      if (isLoggedIn(request, config)) {
        next();
        return;
      }

      response.status(401).json({ error: "AdminLoginRequired" });
    }
  };
}

function parseLoginBody(body: unknown) {
  if (typeof body !== "object" || body === null) {
    return { username: "", password: "" };
  }

  const input = body as { username?: unknown; password?: unknown };
  return {
    username: typeof input.username === "string" ? input.username : "",
    password: typeof input.password === "string" ? input.password : ""
  };
}

function isLoggedIn(request: Request, config: AdminAuthConfig) {
  return readCookie(request.headers.cookie, adminCookieName) === createSessionToken(config);
}

function createSessionToken(config: AdminAuthConfig) {
  const payload = Buffer.from(config.username, "utf8").toString("base64url");
  const signature = createHmac("sha256", config.sessionSecret).update(payload).digest("base64url");
  return `${payload}.${signature}`;
}

function serializeSessionCookie(token: string, config: AdminAuthConfig) {
  return [
    `${adminCookieName}=${token}`,
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
    `Max-Age=${sessionMaxAgeSeconds}`,
    config.secureCookie ? "Secure" : null
  ]
    .filter(Boolean)
    .join("; ");
}

function clearSessionCookie(config: AdminAuthConfig) {
  return [
    `${adminCookieName}=`,
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
    "Max-Age=0",
    config.secureCookie ? "Secure" : null
  ]
    .filter(Boolean)
    .join("; ");
}

function readCookie(cookieHeader: string | undefined, name: string) {
  if (!cookieHeader) {
    return null;
  }

  const cookies = cookieHeader.split(";").map((cookie) => cookie.trim());
  for (const cookie of cookies) {
    const separatorIndex = cookie.indexOf("=");
    if (separatorIndex === -1) {
      continue;
    }

    const cookieName = cookie.slice(0, separatorIndex);
    if (cookieName === name) {
      return cookie.slice(separatorIndex + 1);
    }
  }

  return null;
}

function safeEquals(actual: string, expected: string) {
  const actualBytes = Buffer.from(actual);
  const expectedBytes = Buffer.from(expected);
  return (
    actualBytes.length === expectedBytes.length && timingSafeEqual(actualBytes, expectedBytes)
  );
}
