import ext from './utils/ext'

const createWindow = (tab) => {
  const args: any = {
    url: tab.url,
    type: (ext.windows as any).WindowType.POPUP
  }
  if (tab.cookieStoreId) {
    args.cookieStoreId = tab.cookieStoreId
  }
  ext.windows.create(args)
}

ext.contextMenus.removeAll()
ext.contextMenus.create({
  id: 'menu',
  title: ext.i18n.getMessage('contextMenuText')
})

ext.contextMenus.onClicked.addListener((_, tab) => tab && createWindow(tab))
ext.browserAction.onClicked.addListener((tab) => createWindow(tab))
