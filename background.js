// Load settings from storage
async function loadSettings() {
  const result = await chrome.storage.sync.get("options");
  return (
    result.options || {
      closeOriginalPage: false,
      useContextMenu: true,
    }
  );
}

// Create new window without toolbar
async function createWindow(tabId, url) {
  const settings = await loadSettings();

  await chrome.windows.create({
    url: url,
    type: "popup",
  });

  if (settings.closeOriginalPage && tabId) {
    chrome.tabs.remove(tabId);
  }
}

// Initialize context menu
async function initializeContextMenu() {
  const settings = await loadSettings();
  await chrome.contextMenus.removeAll();

  if (settings.useContextMenu) {
    chrome.contextMenus.create({
      id: "new-window-without-toolbar",
      title: chrome.i18n.getMessage("contextMenuText"),
      contexts: ["page", "link"],
    });
  }
}

// Event listeners
chrome.contextMenus.onClicked.addListener((info, tab) => {
  const url = info.linkUrl || info.pageUrl;
  createWindow(tab.id, url);
});

chrome.action.onClicked.addListener((tab) => {
  if (tab.url) {
    createWindow(tab.id, tab.url);
  }
});

chrome.commands.onCommand.addListener((command) => {
  if (command === "open-new-window") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];
      if (tab && tab.url) {
        createWindow(tab.id, tab.url);
      }
    });
  }
});

// Listen for storage changes to update context menu
chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName === "sync" && changes.options) {
    initializeContextMenu();
  }
});

// Initialize on install or startup
chrome.runtime.onStartup.addListener(() => {
  initializeContextMenu();
});

chrome.runtime.onInstalled.addListener(() => {
  initializeContextMenu();
});
