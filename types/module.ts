import { MODULE_GROUPS } from '@/config/modules'

// 简历模块类型
export type ModuleID =
    | 'personal-info'
    | 'social'
    | 'skills'
    | 'work-experience'
    | 'education'
    | 'languages'
    | 'projects'
    | 'awards'
    | 'certificates'
    | 'portfolio';

// 模块基础类型
export type Module = {
    id: ModuleID
    name: string
    isSelected: boolean
    isVisible: boolean
    isFixed: boolean
    group: typeof MODULE_GROUPS[keyof typeof MODULE_GROUPS]
}

// 模块状态类型
export type ModuleState = {
    modules: Module[]
    selectedModules: Module[]
    availableModules: Module[]
}

// 模块操作函数类型
export type ModuleActions = {
    initializeStore: () => void
    setModules: (modules: Module[]) => void
    setSelectedModules: (modules: Module[]) => void
    setAvailableModules: (modules: Module[]) => void
    handleDragEnd: (result: any) => void
    toggleModuleVisibility: (moduleId: string) => void
    moveModuleToVisibility: (id: string) => void
    moveModuleToAvailable: (moduleId: string) => void
    renameModule: (moduleId: string, newName: string) => boolean
    deleteModule: (moduleId: string) => void
    addCustomModule: (name: string) => boolean
}

// 模块工具函数类型
export type ModuleUtils = {
    getModuleById: (id: string) => Module | undefined
    validateModuleName: (name: string) => boolean
} 