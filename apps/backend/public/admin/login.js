const form = document.querySelector("#loginForm");
const usernameInput = document.querySelector("#usernameInput");
const passwordInput = document.querySelector("#passwordInput");
const loginStatus = document.querySelector("#loginStatus");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  setStatus("Signing in...");

  const response = await fetch("/api/admin/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: usernameInput.value.trim(),
      password: passwordInput.value
    })
  });

  if (!response.ok) {
    setStatus("Invalid username or password.");
    passwordInput.value = "";
    passwordInput.focus();
    return;
  }

  window.location.href = "/admin";
});

function setStatus(message) {
  loginStatus.textContent = message;
}
