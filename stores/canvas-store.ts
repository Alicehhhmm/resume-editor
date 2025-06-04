import { createStore } from 'zustand/vanilla'
import {
    CanvasState,
    CanvasStore,
} from '@/types/canvas'

export const defaultInitState: CanvasState = {
    elements: [],
    selectedElementIds: [],
    zoom: 1,
    pan: { x: 0, y: 0 },
    panels: {
        leftHide: false,
        rightHide: false
    }
}

// Store 工厂函数
export const createCanvasStore = (initState: CanvasState = defaultInitState) => {
    return createStore<CanvasStore>()((set) => ({
        ...initState,

        // 元素操作
        addElement: (element) =>
            set((state) => ({
                elements: ['template'].includes(element.type)
                    ? [{ ...element, id: crypto.randomUUID() }]
                    : [...state.elements, { ...element, id: crypto.randomUUID() }]
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

        updateElementAttributes: (el) => set((state) => {
            const newArt = state.elements.filter((item) => item.id === el.id)

            return {
                elements: newArt
            }
        }),

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

        resetView: () => set({ zoom: 1, pan: { x: 0, y: 0 } }),

        pagePreview: (panels) => set((state) => ({
            panels: {
                ...state.panels,
                ...panels
            }
        })),


    }))
}

// 创建初始状态函数
export const initCanvasState = (): CanvasState => {
    return defaultInitState
}