/**
 * 工具：读写 localStorage，并做异常捕获
 */
export function storageGet(key, defaultValue) {
    try { return JSON.parse(localStorage.getItem(key)); }
    catch { return defaultValue; }
  }
  export function storageSet(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); }
    catch {}
  }
  