// Apply i18n translations
function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    const message = chrome.i18n.getMessage(key);
    if (message) {
      element.textContent = message;
    }
  });

  // Set page title
  document.title = chrome.i18n.getMessage('optionsTitle');
}

// Load settings and populate UI
async function loadSettings() {
  const result = await chrome.storage.sync.get("options");
  const settings = result.options || {
    closeOriginalPage: false,
    useContextMenu: true,
  };

  document.getElementById("close-original-page").checked =
    settings.closeOriginalPage;
  document.getElementById("use-context-menu").checked = settings.useContextMenu;
}

// Save settings
async function saveSettings() {
  const closeOriginalPage = document.getElementById(
    "close-original-page"
  ).checked;
  const useContextMenu = document.getElementById("use-context-menu").checked;

  await chrome.storage.sync.set({
    options: {
      closeOriginalPage: closeOriginalPage,
      useContextMenu: useContextMenu,
    },
  });

  // Show saved message
  const message = document.getElementById("saved-message");
  message.style.display = "block";
  setTimeout(() => {
    message.style.display = "none";
  }, 2000);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  applyTranslations();
  loadSettings();
});

// Add event listeners
document
  .getElementById("close-original-page")
  .addEventListener("change", saveSettings);
document
  .getElementById("use-context-menu")
  .addEventListener("change", saveSettings);
