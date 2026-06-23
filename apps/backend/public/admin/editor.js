const api = {
  posts: "/api/admin/posts",
  post: (id) => `/api/admin/posts/${encodeURIComponent(id)}`
};

const state = {
  posts: [],
  activePost: null
};

const elements = {
  postList: document.querySelector("#postList"),
  newPostButton: document.querySelector("#newPostButton"),
  form: document.querySelector("#postForm"),
  postId: document.querySelector("#postId"),
  title: document.querySelector("#titleInput"),
  slug: document.querySelector("#slugInput"),
  status: document.querySelector("#statusInput"),
  author: document.querySelector("#authorInput"),
  excerpt: document.querySelector("#excerptInput"),
  heroImage: document.querySelector("#heroImageInput"),
  tags: document.querySelector("#tagsInput"),
  editor: document.querySelector("#bodyEditor"),
  saveStatus: document.querySelector("#saveStatus")
};

document.querySelectorAll(".toolbar button").forEach((button) => {
  button.addEventListener("click", () => {
    elements.editor.focus();

    const command = button.dataset.command;
    const block = button.dataset.block;
    if (command === "createLink") {
      const href = window.prompt("URL");
      if (href) {
        document.execCommand("createLink", false, href);
      }
      return;
    }

    if (command) {
      document.execCommand(command, false);
      return;
    }

    if (block) {
      document.execCommand("formatBlock", false, block);
    }
  });
});

elements.newPostButton.addEventListener("click", () => {
  state.activePost = null;
  fillForm(createEmptyPost());
  setSaveStatus("Draft ready.");
});

elements.title.addEventListener("input", () => {
  if (!elements.postId.value) {
    elements.slug.value = slugify(elements.title.value);
  }
});

elements.form.addEventListener("submit", async (event) => {
  event.preventDefault();
  setSaveStatus("Saving...");
  const payload = readForm();
  const id = elements.postId.value;
  const response = await fetch(id ? api.post(id) : api.posts, {
    method: id ? "PUT" : "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: "UnknownError" }));
    setSaveStatus(`${error.error}: ${error.message ?? "Check required fields."}`);
    return;
  }

  const post = await response.json();
  state.activePost = post;
  fillForm(post);
  await loadPosts(post.id);
  setSaveStatus("Saved.");
});

loadPosts().catch((error) => {
  console.error(error);
  setSaveStatus("Unable to load posts.");
});

async function loadPosts(preferredId) {
  const response = await fetch(api.posts);
  state.posts = await response.json();
  renderPostList(preferredId);

  const nextId = preferredId ?? state.posts[0]?.id;
  if (nextId) {
    await loadPost(nextId);
  } else {
    fillForm(createEmptyPost());
  }
}

async function loadPost(id) {
  const response = await fetch(api.post(id));
  const post = await response.json();
  state.activePost = post;
  fillForm(post);
  renderPostList(id);
}

function renderPostList(activeId = state.activePost?.id) {
  elements.postList.innerHTML = "";
  for (const post of state.posts) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = post.id === activeId ? "active" : "";
    button.innerHTML = `
      <span class="post-title"></span>
      <span class="post-meta">
        <span class="status-pill ${post.status}">${post.status}</span>
        <span>${post.slug}</span>
      </span>
    `;
    button.querySelector(".post-title").textContent = post.title;
    button.addEventListener("click", () => loadPost(post.id));
    elements.postList.append(button);
  }
}

function fillForm(post) {
  elements.postId.value = post.id ?? "";
  elements.title.value = post.title;
  elements.slug.value = post.slug;
  elements.status.value = post.status;
  elements.author.value = post.author;
  elements.excerpt.value = post.excerpt;
  elements.heroImage.value = post.heroImageUrl ?? "";
  elements.tags.value = post.tags.join(", ");
  elements.editor.innerHTML = blocksToEditorHtml(post.body);
}

function readForm() {
  return {
    title: elements.title.value.trim(),
    slug: slugify(elements.slug.value),
    status: elements.status.value,
    author: elements.author.value.trim() || "Editorial",
    excerpt: elements.excerpt.value.trim(),
    heroImageUrl: elements.heroImage.value.trim() || null,
    tags: elements.tags.value
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean),
    body: serializeEditor()
  };
}

function createEmptyPost() {
  return {
    id: "",
    title: "",
    slug: "",
    status: "draft",
    author: "Editorial",
    excerpt: "",
    heroImageUrl: "",
    tags: [],
    body: [
      {
        type: "paragraph",
        text: "Start writing here.",
        html: "Start writing here."
      }
    ]
  };
}

function blocksToEditorHtml(blocks) {
  return blocks
    .map((block) => {
      if (block.type === "heading") {
        const tag = block.level === 3 ? "h3" : "h2";
        return `<${tag}>${sanitizeInlineHtml(block.html ?? escapeHtml(block.text))}</${tag}>`;
      }
      if (block.type === "list") {
        const itemsHtml = block.itemsHtml ?? block.items.map(escapeHtml);
        return `<ul>${itemsHtml
          .map((item) => `<li>${sanitizeInlineHtml(item)}</li>`)
          .join("")}</ul>`;
      }
      if (block.type === "quote") {
        return `<blockquote>${sanitizeInlineHtml(block.html ?? escapeHtml(block.text))}</blockquote>`;
      }
      return `<p>${sanitizeInlineHtml(block.html ?? escapeHtml(block.text))}</p>`;
    })
    .join("");
}

function serializeEditor() {
  const blocks = [];
  const nodes = Array.from(elements.editor.childNodes);

  for (const node of nodes) {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent.trim();
      if (text) {
        blocks.push({ type: "paragraph", text, html: escapeHtml(text) });
      }
      continue;
    }

    if (!(node instanceof HTMLElement)) {
      continue;
    }

    const tag = node.tagName.toLowerCase();
    const text = normalizedText(node);
    if (!text) {
      continue;
    }

    if (tag === "h2" || tag === "h3") {
      blocks.push({
        type: "heading",
        level: tag === "h3" ? 3 : 2,
        text,
        html: sanitizeInlineHtml(node.innerHTML)
      });
      continue;
    }

    if (tag === "ul" || tag === "ol") {
      const items = Array.from(node.querySelectorAll("li"))
        .map((item) => normalizedText(item))
        .filter(Boolean);
      const itemsHtml = Array.from(node.querySelectorAll("li"))
        .map((item) => sanitizeInlineHtml(item.innerHTML))
        .filter(Boolean);
      if (items.length) {
        blocks.push({ type: "list", items, itemsHtml });
      }
      continue;
    }

    if (tag === "blockquote") {
      blocks.push({ type: "quote", text, html: sanitizeInlineHtml(node.innerHTML) });
      continue;
    }

    blocks.push({ type: "paragraph", text, html: sanitizeInlineHtml(node.innerHTML) });
  }

  if (!blocks.length) {
    return [{ type: "paragraph", text: "Draft content.", html: "Draft content." }];
  }
  return blocks;
}

function sanitizeInlineHtml(input) {
  const template = document.createElement("template");
  template.innerHTML = input;
  const allowedTags = new Set(["A", "B", "BR", "CODE", "EM", "I", "STRONG"]);

  const visit = (node) => {
    for (const child of Array.from(node.childNodes)) {
      if (child.nodeType !== Node.ELEMENT_NODE) {
        continue;
      }

      const element = child;
      if (!allowedTags.has(element.tagName)) {
        element.replaceWith(document.createTextNode(element.textContent ?? ""));
        continue;
      }

      for (const attribute of Array.from(element.attributes)) {
        const keepHref =
          element.tagName === "A" &&
          attribute.name === "href" &&
          /^(https?:|mailto:|\/)/.test(attribute.value);
        if (!keepHref) {
          element.removeAttribute(attribute.name);
        }
      }

      if (element.tagName === "A") {
        element.setAttribute("target", "_blank");
        element.setAttribute("rel", "noreferrer");
      }

      visit(element);
    }
  };

  visit(template.content);
  return template.innerHTML.trim();
}

function escapeHtml(input) {
  return input.replace(/[&<>"']/g, (char) => {
    return {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    }[char];
  });
}

function normalizedText(node) {
  return (node.textContent ?? "").replace(/\s+/g, " ").trim();
}

function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function setSaveStatus(message) {
  elements.saveStatus.textContent = message;
}
