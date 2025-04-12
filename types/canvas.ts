
// 元素类型枚举
export type ElementType = 'template' | 'text' | 'image' | 'shape'

// 画布元素类型
export interface CanvasElement {
    id: string
    type: ElementType
    x: number
    y: number
    width: number
    height: number
    rotation: number
    properties: Record<string, any>
}

// 模板元素特有属性
export interface TemplateElementProperties {
    templateId: string
    backgroundColor: string
    borderRadius: number
    borderWidth: number
    borderColor: string
    shadowEnabled: boolean
    shadowColor: string
    shadowBlur: number
    shadowOffsetX: number
    shadowOffsetY: number
}

// 文本元素特有属性
export interface TextElementProperties {
    text: string
    fontSize: number
    fontFamily: string
    fontWeight: 'normal' | 'bold' | 'light' | number
    fontStyle: 'normal' | 'italic'
    textAlign: 'left' | 'center' | 'right' | 'justify'
    lineHeight: number
    color: string
}

// 图片元素特有属性
export interface ImageElementProperties {
    src: string
    alt: string
    objectFit: 'cover' | 'contain' | 'fill'
    opacity: number
}

// 形状元素特有属性
export interface ShapeElementProperties {
    shapeType: 'rectangle' | 'circle' | 'line' | 'polygon'
    backgroundColor: string
    borderRadius: number
    borderWidth: number
    borderColor: string
    opacity: number
}

// 画布状态类型
export interface CanvasState {
    elements: CanvasElement[]
    selectedElementIds: string[]
    zoom: number
    pan: { x: number; y: number }
}

// 画布动作类型
export interface CanvasActions {

    // 元素操作
    addElement: (element: Omit<CanvasElement, 'id'>) => void
    updateElement: (id: string, updates: Partial<CanvasElement>) => void
    removeElement: (id: string) => void

    // 选择操作
    selectElement: (id: string) => void
    deselectElement: (id: string) => void
    selectMultipleElements: (ids: string[]) => void
    clearSelection: () => void

    // 视图操作
    setZoom: (zoom: number) => void
    setPan: (pan: { x: number; y: number }) => void
    resetView: () => void
}

// 合并状态和动作
export type CanvasStore = CanvasState & CanvasActions

// 常量定义
export const PAPER_SIZES = {
    A4: {
        width: 794, // 210mm to px @96dpi
        height: 1123, // 297mm to px @96dpi
    },
    LETTER: {
        width: 816, // 8.5in to px @96dpi
        height: 1056, // 11in to px @96dpi
    },
} 