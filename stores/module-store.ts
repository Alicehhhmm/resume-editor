import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { toast } from 'sonner'
import { arrayMove } from '@dnd-kit/sortable'
import { type DragEndEvent } from '@dnd-kit/core'

import { MODULE_GROUPS, MODULE_NAME_RULES, getVisibleModules, getAvailableModules } from '@/config/modules'
import type { Module, ModuleState, ModuleActions, ModuleUtils } from '@/types/module'

const useModuleStore = create<ModuleState & ModuleActions & ModuleUtils>()(
    persist(
        (set, get) => ({
            // 初始状态
            modules: [],
            selectedModules: [],
            availableModules: [],

            // 初始化 store
            initializeStore: () => {
                const { modules } = get()

                if (modules.length === 0) {
                    const selectedModules = getVisibleModules()
                    const availableModules = getAvailableModules()

                    set({
                        modules: [...selectedModules, ...availableModules],
                        selectedModules,
                        availableModules,
                    })
                }
            },

            // 设置模块
            setModules: (modules) => set({ modules }),
            setSelectedModules: (modules) => set({ selectedModules: modules }),
            setAvailableModules: (modules) => set({ availableModules: modules }),

            // 处理拖拽结束
            handleDragEnd: (event: DragEndEvent) => {
                const { active, over } = event

                if (over && active.id !== over.id) {
                    const { modules } = get()
                    const oldIndex = modules.findIndex(item => item.id === active.id)
                    const newIndex = modules.findIndex(item => item.id === over.id)

                    if (oldIndex === -1 || newIndex === -1) {
                        toast.error('模块不存在')
                        return
                    }

                    // 获取模块所在的组
                    const activeGroup = modules[oldIndex].group
                    const overGroup = modules[newIndex].group

                    // 只允许在同一组内拖拽
                    if (activeGroup !== overGroup) {
                        toast.error('不能跨组拖拽模块')
                        return
                    }

                    // 使用 arrayMove 重新排序
                    const newModules = arrayMove(modules, oldIndex, newIndex)

                    // 更新状态
                    set({
                        modules: newModules,
                        selectedModules: newModules.filter((m: Module) => m.group === MODULE_GROUPS.SELECTED),
                        availableModules: newModules.filter((m: Module) => m.group === MODULE_GROUPS.AVAILABLE),
                    })

                    toast.success(`已将 "${modules[oldIndex].name}" 移动到新位置`)
                }
            },

            //  将渲染列表的模块切换：显示隐藏（👁操作）
            toggleModuleVisibility: (moduleId) => {
                const { selectedModules } = get()
                const moduleIndex = selectedModules.findIndex((m) => m.id === moduleId)
                if (moduleIndex === -1) return

                const updatedModules = [...selectedModules]
                const updatedModule = updatedModules[moduleIndex]
                const isVisible = !updatedModules[moduleIndex].isVisible

                updatedModules[moduleIndex] = {
                    ...updatedModule,
                    isVisible,
                }

                set({ selectedModules: updatedModules })
                toast.info(
                    `${isVisible ? '已显示' : '已隐藏'} "${updatedModule.name}" 模块`
                )
            },

            // 将模块移动到可用列表: (🗑 操作)
            moveModuleToAvailable: (moduleId) => {
                const { selectedModules, availableModules, deleteModule } = get()
                const moduleIndex = selectedModules.findIndex((m) => m.id === moduleId)
                if (moduleIndex === -1) return

                const module = selectedModules[moduleIndex]
                if (module.isFixed) {
                    toast.error('固定模块不能移动')
                    return
                }

                // 只有自定义模块（ID以custom开头）才能被彻底删除
                if (module.id.startsWith('custom-') || module.group === MODULE_GROUPS.CUSTOM) {
                    deleteModule(moduleId)
                    return
                }

                const [movedModule] = selectedModules.splice(moduleIndex, 1)

                let updatedModule = {
                    ...movedModule,
                    isSelected: !movedModule.isSelected,
                    group: movedModule.group === MODULE_GROUPS.SELECTED
                        ? MODULE_GROUPS.AVAILABLE
                        : MODULE_GROUPS.SELECTED
                }

                set({
                    selectedModules: [...selectedModules],
                    availableModules: [...availableModules, updatedModule],
                })

                toast.success(`已将 "${module.name}" 模块移至可用列表`)
            },

            // 将可用模块移动到 -> 已选择模块(➕操作)
            moveModuleToVisibility: (moduleId) => {
                const { selectedModules, availableModules } = get()
                const moduleIndex = availableModules.findIndex((m) => m.id === moduleId)
                if (moduleIndex === -1) return

                // 更新模块的选择状态和分组
                const [movedModule] = availableModules.splice(moduleIndex, 1)

                let updatedModule = {
                    ...movedModule,
                    isSelected: !movedModule.isSelected,
                    group: movedModule.group === MODULE_GROUPS.AVAILABLE
                        ? MODULE_GROUPS.SELECTED
                        : MODULE_GROUPS.AVAILABLE
                }

                // 更新状态
                set({
                    selectedModules: [...selectedModules, updatedModule],
                    availableModules: [...availableModules],
                })

                toast.success(`已将 "${updatedModule.name}" 模块移至已选择列表`)
            },

            // 重命名模块
            renameModule: (moduleId, newName) => {
                const { modules, validateModuleName } = get()
                const trimmedName = newName.trim()

                // 验证模块名称
                if (!trimmedName) {
                    toast.error('模块名称不能为空')
                    return false
                }
                if (trimmedName.length > MODULE_NAME_RULES.maxLength) {
                    toast.error(`模块名称不能超过 ${MODULE_NAME_RULES.maxLength} 个字符`)
                    return false
                }
                if (trimmedName.length < MODULE_NAME_RULES.minLength) {
                    toast.error(`模块名称不能少于 ${MODULE_NAME_RULES.minLength} 个字符`)
                    return false
                }
                if (!validateModuleName(trimmedName)) {
                    toast.error('模块名称已存在')
                    return false
                }

                const moduleIndex = modules.findIndex((m) => m.id === moduleId)
                if (moduleIndex === -1) {
                    toast.error('模块不存在')
                    return false
                }

                const updatedModules = [...modules]
                updatedModules[moduleIndex] = {
                    ...updatedModules[moduleIndex],
                    name: trimmedName,
                }

                set({ modules: updatedModules })
                toast.success('模块名称已更新')
                return true
            },

            // 删除模块自定义模块
            deleteModule: (moduleId) => {
                const { modules, selectedModules, availableModules } = get()
                const module = modules.find(m => m.id === moduleId)

                if (!module) {
                    toast.error('模块不存在')
                    return
                }

                if (module.isFixed) {
                    toast.error('固定模块不能删除')
                    return
                }

                set({
                    modules: modules.filter((m) => m.id !== moduleId),
                    selectedModules: selectedModules.filter((m) => m.id !== moduleId),
                    availableModules: availableModules.filter((m) => m.id !== moduleId),
                })
                toast.success(`已删除自定义模块 "${module.name}"`)
            },

            // 添加自定义模块
            addCustomModule: (name) => {
                const { modules, selectedModules, validateModuleName } = get()
                const trimmedName = name.trim()

                // 验证模块名称
                if (!trimmedName) {
                    toast.error('模块名称不能为空')
                    return false
                }
                if (trimmedName.length > MODULE_NAME_RULES.maxLength) {
                    toast.error(`模块名称不能超过 ${MODULE_NAME_RULES.maxLength} 个字符`)
                    return false
                }
                if (trimmedName.length < MODULE_NAME_RULES.minLength) {
                    toast.error(`模块名称不能少于 ${MODULE_NAME_RULES.minLength} 个字符`)
                    return false
                }
                if (!validateModuleName(trimmedName)) {
                    toast.error('模块名称已存在')
                    return false
                }

                const newModule: Module = {
                    id: `custom`,
                    name: trimmedName,
                    group: MODULE_GROUPS.CUSTOM,
                    isFixed: false,
                    isSelected: true,
                    isVisible: true,
                }

                set({
                    modules: [...modules, newModule],
                    selectedModules: [...selectedModules, newModule],
                })

                toast.success('自定义模块已添加')
                return true
            },

            // 工具函数
            getModuleById: (id) => {
                const { modules } = get()
                return modules.find((m) => m.id === id)
            },

            validateModuleName: (name) => {
                const { modules } = get()
                return !modules.some((m) => m.name === name)
            },
        }),
        {
            name: 'module-storage',
            partialize: (state) => ({
                modules: state.modules,
                selectedModules: state.selectedModules,
                availableModules: state.availableModules,
            }),
        }
    )
)

export default useModuleStore 