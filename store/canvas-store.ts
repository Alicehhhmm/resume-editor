import { createStore } from 'zustand/vanilla'
import type { Template } from '@/types/resume-template'
import {
  CanvasState,
  CanvasActions,
  CanvasStore,
  CanvasElement,
  PAPER_SIZES
} from '@/types/canvas'

// 默认模板状态
export const DEFAULT_TEMPLATE: Template = {
  id: '1',
  title: '简约',
  description: '简约风格',
  category: 'simple',
  thumbnail: '/placeholder.svg',
}

export const defaultInitState: CanvasState = {
  currentTemplate: DEFAULT_TEMPLATE,
  elements: [],
  selectedElementIds: [],
  zoom: 1,
  pan: { x: 0, y: 0 }
}

// Store 工厂函数
export const createCanvasStore = (initState: CanvasState = defaultInitState) => {
  return createStore<CanvasStore>()((set) => ({
    ...initState,

    // 模板操作
    updateTemplate: (template) => set({ currentTemplate: template }),

    // 元素操作
    addElement: (element) =>
      set((state) => ({
        elements: [...state.elements, { ...element, id: crypto.randomUUID() }]
      })),

    updateElement: (id, updates) =>
      set((state) => ({
        elements: state.elements.map((el) =>
          el.id === id ? { ...el, ...updates } : el
        )
      })),

    removeElement: (id) =>
      set((state) => ({
        elements: state.elements.filter((el) => el.id !== id),
        selectedElementIds: state.selectedElementIds.filter((elId) => elId !== id)
      })),

    // 选择操作
    selectElement: (id) =>
      set((state) => ({
        selectedElementIds: [id]
      })),

    deselectElement: (id) =>
      set((state) => ({
        selectedElementIds: state.selectedElementIds.filter((elId) => elId !== id)
      })),

    selectMultipleElements: (ids) =>
      set({ selectedElementIds: ids }),

    clearSelection: () =>
      set({ selectedElementIds: [] }),

    // 视图操作
    setZoom: (zoom) => set({ zoom }),

    setPan: (pan) => set({ pan }),

    resetView: () => set({ zoom: 1, pan: { x: 0, y: 0 } })
  }))
}

// 创建初始状态函数
export const initCanvasState = (): CanvasState => {
  // 这里可以添加服务端逻辑初始化状态
  return defaultInitState
}