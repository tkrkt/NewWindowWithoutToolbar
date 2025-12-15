# NewWindowWithoutToolbar

Open current page in new window without toolbar.

- [New window without toolbar - Chrome Web Store](https://chrome.google.com/webstore/detail/new-window-without-toolba/epcobhhlenfbjlmooebphgjcgdmbjgnb)

## Features

- Open current page in a popup window (without address bar and toolbar)
- Right-click context menu support
- Keyboard shortcut support (Alt+Shift+N)
- Options to configure behavior

## Installation for Development

1. Clone this repository
2. Run `npm install && npm run prepare` to copy locale and icon files
3. Open Chrome and navigate to `chrome://extensions/`
4. Enable "Developer mode"
5. Click "Load unpacked" and select this directory

## Project Structure

```
manifest.json       # Manifest V3 configuration
background.js       # Background service worker
options.html        # Options page
options.js          # Options page script
_locales/           # Internationalization files
icons/              # Extension icons
```

## Version 2.0 Changes

- Migrated to Manifest V3
- Removed complex build system (Webpack, TypeScript)
- Simplified codebase for easier maintenance
- Chrome-focused (removed Firefox-specific code)
./build.sh