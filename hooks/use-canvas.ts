'use client'

import { useContext } from 'react'
import { useStore } from 'zustand'
import { CanvasStoreContext } from '@/contexts/canvas-context'
import { CanvasStore } from '@/store/canvas-store'

export const useCanvasContext = () => {
  return useContext(CanvasStoreContext)
}

export const useCanvas = () => {
  const storeContext = useCanvasContext()

  // 检查 context 是否存在
  if (!storeContext) {
    console.error('Canvas store context is missing. Make sure to use within CanvasProvider')
    return {} as CanvasStore
  }

  // 使用 useStore 从 zustand store 获取数据
  const state = useStore(storeContext, state => state)

  return state
}
