const THEME_STORAGE_KEY = "theme";
const root = document.documentElement;
const themeToggle = document.getElementById("theme-toggle");

function applyTheme(theme) {
  const isLightMode = theme === "light";
  root.classList.toggle("light-mode", isLightMode);

  if (themeToggle) {
    themeToggle.setAttribute(
      "aria-label",
      isLightMode ? "Ativar modo escuro" : "Ativar modo claro"
    );
  }
}

const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const initialTheme = savedTheme || (prefersDark ? "dark" : "light");

applyTheme(initialTheme);

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const nextTheme = root.classList.contains("light-mode") ? "dark" : "light";
    localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    applyTheme(nextTheme);
  });
}
