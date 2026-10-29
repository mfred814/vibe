const root = document.documentElement;
const themeToggle = document.querySelector("#theme-toggle");
const productDialog = document.querySelector("#product-dialog");
const dialogTitle = document.querySelector("#dialog-title");
const dialogDescription = document.querySelector("#dialog-description");
const dialogPrice = document.querySelector("#dialog-price");
const dialogAction = document.querySelector("#dialog-action");
const dialogFeedback = document.querySelector("#dialog-feedback");
const productCards = document.querySelectorAll(".product-card");

function setTheme(theme, persist = true) {
  const isDark = theme === "dark";
  root.dataset.theme = isDark ? "dark" : "light";
  themeToggle.setAttribute("aria-pressed", String(isDark));
  themeToggle.setAttribute(
    "aria-label",
    isDark ? "Switch to light mode" : "Switch to dark mode",
  );

  if (persist) {
    try {
      localStorage.setItem("product-showcase-theme", root.dataset.theme);
    } catch (error) {
      console.warn("Could not save the selected theme in localStorage.", error);
    }
  }
}

try {
  const savedTheme = localStorage.getItem("product-showcase-theme");
  if (savedTheme === "light" || savedTheme === "dark") {
    setTheme(savedTheme, false);
  }
} catch (error) {
  console.warn("Could not restore the selected theme from localStorage.", error);
}

themeToggle.addEventListener("click", () => {
  setTheme(root.dataset.theme === "dark" ? "light" : "dark");
});

productCards.forEach((card, index) => {
  const viewButton = card.querySelector(".view-button");

  viewButton.addEventListener("click", () => {
    dialogTitle.textContent = card.dataset.name;
    dialogDescription.textContent = card.dataset.description;
    dialogPrice.textContent = card.dataset.price;
    dialogFeedback.textContent = "";
    dialogAction.textContent = "Add to your shortlist";
    productDialog.showModal();
  });

  window.setTimeout(() => {
    card.classList.add("is-visible");
  }, 100 + index * 120);
});

document.querySelector(".dialog-close").addEventListener("click", () => {
  productDialog.close();
});

productDialog.addEventListener("click", (event) => {
  if (event.target === productDialog) {
    productDialog.close();
  }
});

dialogAction.addEventListener("click", () => {
  dialogAction.textContent = "Added to your shortlist";
  dialogFeedback.textContent = `${dialogTitle.textContent} is saved for later.`;
});

document.querySelector("#current-year").textContent = String(
  new Date().getFullYear(),
);
