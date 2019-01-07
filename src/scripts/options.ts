import ext from './utils/ext'
import { save, load } from './store'

const closeOriginalPageCheckBox: any = document.querySelector('#close-original-page')!
const contextMenuCheckBox: any = document.querySelector('#use-context-menu')!

load().then(({ closeOriginalPage, useContextMenu }) => {
  closeOriginalPageCheckBox.checked = closeOriginalPage
  contextMenuCheckBox.checked = useContextMenu
})

closeOriginalPageCheckBox.addEventListener('change', () => {
  save({
    closeOriginalPage: closeOriginalPageCheckBox.checked,
    useContextMenu: contextMenuCheckBox.checked
  })
})

contextMenuCheckBox.addEventListener('change', () => {
  save({
    closeOriginalPage: closeOriginalPageCheckBox.checked,
    useContextMenu: contextMenuCheckBox.checked
  })
  ext.contextMenus.removeAll()
  if (contextMenuCheckBox.checked) {
    ext.contextMenus.create({
      id: 'menu',
      title: ext.i18n.getMessage('contextMenuText')
    })
  }
})
