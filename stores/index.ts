/**
 * 状态管理入口文件
 * 统一导出所有 store 和类型
 */

export { default as useModuleStore } from './module-store'

// 画布状态
export { createCanvasStore, initCanvasState } from './canvas-store'

// 模板状态
export { default as useResumeTemplateStore } from './template-store'