type StorageKeys = 'count' | 'sheets' | 'items'

const Storage = {
  getItem: (key: StorageKeys) => {
    return localStorage.getItem(key)
  },
  setItem: (key: StorageKeys, value = '') => {
    return localStorage.setItem(key, value)
  },
  removeItem: (key: StorageKeys) => {
    return localStorage.removeItem(key)
  },
  clearItems: () => {
    return localStorage.clear()
  }
}

export default Storage
