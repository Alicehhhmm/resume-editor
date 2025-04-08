import { useEffect } from 'react'
import { useModuleStore } from '@/stores'
import { type Module } from '@/types/module'
import { MODULE_GROUPS } from '@/config/modules'

/**
 * 模块管理器 Hook
 * 用于管理模块的状态和操作
 */
export const useModuleManager = () => {
    const store = useModuleStore()

    // 初始化 store
    useEffect(() => {
        store.initializeStore()
    }, [store])

    return {
        // 状态
        modules: store.modules,
        selectedModules: store.selectedModules,
        availableModules: store.availableModules,

        // 方法
        handleDragEnd: store.handleDragEnd,
        toggleSelect: store.moveModuleToVisibility,
        toggleVisible: store.toggleModuleVisibility,
        moveToAvailable: store.moveModuleToAvailable,
        renameModule: store.renameModule,
        deleteModule: store.deleteModule,
        addCustomModule: store.addCustomModule,

        // 工具方法
        getModuleById: store.getModuleById,
        validateModuleName: store.validateModuleName,
    }
}

// 导出类型和常量
export type { Module }
export { MODULE_GROUPS }
