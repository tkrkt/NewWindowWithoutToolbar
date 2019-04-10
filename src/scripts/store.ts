import storage from './utils/storage'

export const load = (): Promise<{ closeOriginalPage: boolean, useContextMenu: boolean }> => {
  return new Promise((resolve) => {
    storage.get('options', (result) => {
      resolve(result.options || {
        closeOriginalPage: false,
        useContextMenu: true
      })
    })
  })
}

export const save = ({ closeOriginalPage, useContextMenu }: { closeOriginalPage: boolean, useContextMenu: boolean }) => {
  storage.set({ options: { closeOriginalPage, useContextMenu } })
}
