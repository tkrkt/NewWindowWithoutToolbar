# Chrome Web Store Submission

## Single Purpose Description
This extension opens the current web page in a new popup window without the address bar and toolbar, allowing users to view content in a clean, distraction-free window.

## Permission Justifications

### contextMenus
Required to add a right-click menu option for opening pages in toolbar-free windows. Users can enable/disable this in settings.

### storage
Required to save user preferences (whether to close the original page and whether to show the context menu). Settings are synced across devices.

### activeTab
Required to access the current tab's URL when the user clicks the extension icon or uses the keyboard shortcut (Alt+Shift+N). Only accesses tab information when explicitly triggered by user action.
