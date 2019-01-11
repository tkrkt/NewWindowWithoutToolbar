import ext from './utils/ext'
import { load } from './store'

const createWindow = ({ tabId, url, cookieStoreId }: { tabId?: number, url: string, cookieStoreId?: string }) => {
  const args: any = {
    url,
    type: (ext.windows as any).WindowType.POPUP,
    ...(cookieStoreId ? { cookieStoreId } : {})
  }
  ext.windows.create(args)
  load().then(({ closeOriginalPage }) => {
    if (closeOriginalPage && tabId) {
      ext.tabs.remove(tabId)
    }
  })
}

load().then(({ useContextMenu }) => {
  ext.contextMenus.removeAll()
  if (useContextMenu) {
    ext.contextMenus.create({
      id: 'menu',
      title: ext.i18n.getMessage('contextMenuText')
    })
  }
})

ext.contextMenus.onClicked.addListener((info, tab) => createWindow({
  tabId: tab && tab.id,
  url: info.pageUrl,
  cookieStoreId: tab && (tab as any).cookieStoreId
}))
ext.browserAction.onClicked.addListener((tab) => tab.url && createWindow({
  tabId: tab.id,
  url: tab.url,
  cookieStoreId: (tab as any).cookieStoreId
}))
