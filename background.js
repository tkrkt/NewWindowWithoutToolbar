/*global chrome*/

chrome.contextMenus.onClicked.addListener((info) => {
  chrome.windows.create({
    url: info.pageUrl,
    type: chrome.windows.WindowType.POPUP
  });
});

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'menu',
    title: 'New window without toolbar'
  });
});