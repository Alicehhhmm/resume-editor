/**
 * 存储工具模块
 * 封装本地存储(localStorage)的基本操作
 * 提供类型安全和错误处理
 */

// 客户端检测
const isClient = typeof window !== 'undefined'

/**
 * 设置存储项
 * @param key 存储键
 * @param value 存储值
 */
export const setStorageItem = <T>(key: string, value: T): void => {
  if (!isClient) return

  try {
    const serializedValue = JSON.stringify(value)
    localStorage.setItem(key, serializedValue)
  } catch (error) {
    console.error(`Failed to store item with key "${key}":`, error)
  }
}

/**
 * 获取存储项
 * @param key 存储键
 * @param defaultValue 默认值(未找到时返回)
 * @returns 存储项的值或默认值
 */
export const getStorageItem = <T>(key: string, defaultValue?: T): T | null => {
  if (!isClient) return defaultValue ?? null

  try {
    const item = localStorage.getItem(key)
    if (item === null) return defaultValue ?? null
    return JSON.parse(item) as T
  } catch (error) {
    console.error(`Failed to retrieve item with key "${key}":`, error)
    return defaultValue ?? null
  }
}

/**
 * 移除存储项
 * @param key 存储键
 */
export const removeStorageItem = (key: string): void => {
  if (!isClient) return

  try {
    localStorage.removeItem(key)
  } catch (error) {
    console.error(`Failed to remove item with key "${key}":`, error)
  }
}

/**
 * 清空所有存储
 */
export const clearStorage = (): void => {
  if (!isClient) return

  try {
    localStorage.clear()
  } catch (error) {
    console.error('Failed to clear storage:', error)
  }
}

/**
 * 获取所有存储键
 * @returns 所有存储键的数组
 */
export const getStorageKeys = (): string[] => {
  if (!isClient) return []

  try {
    return Object.keys(localStorage)
  } catch (error) {
    console.error('Failed to get storage keys:', error)
    return []
  }
} 