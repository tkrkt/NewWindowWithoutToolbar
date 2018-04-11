import ext from './utils/ext'

const createWindow = (url) => {
  ext.windows.create({
    url,
    type: (ext.windows as any).WindowType.POPUP
  })
}

ext.contextMenus.removeAll()
ext.contextMenus.create({
  id: 'menu',
  title: 'New window without toolbar'
})

ext.contextMenus.onClicked.addListener((info) => createWindow(info.pageUrl))
ext.browserAction.onClicked.addListener((tab) => createWindow(tab.url))
