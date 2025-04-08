import { useCallback, useState } from 'react'
import { type DragEndEvent } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { toast } from 'sonner'

// 定义模块类型
export type Module = {
  id: string
  name: string
  isSelected: boolean
  isVisible: boolean
  isFixed: boolean
  group: 'selected' | 'available' // 分组属性
}

// 模块管理器Hook
export const useModuleManager = () => {
  // 模块列表状态
  const [modules, setModules] = useState<Module[]>([
    {
      id: 'personal-info',
      name: '个人简介',
      isSelected: true,
      isVisible: true,
      isFixed: true,
      group: 'selected',
    },
    {
      id: 'social',
      name: '社交账号',
      isSelected: true,
      isVisible: true,
      isFixed: false,
      group: 'selected',
    },
    {
      id: 'skills',
      name: '专业技能',
      isSelected: true,
      isVisible: true,
      isFixed: false,
      group: 'selected',
    },
    {
      id: 'work-experience',
      name: '工作经历',
      isSelected: true,
      isVisible: true,
      isFixed: false,
      group: 'selected',
    },
    {
      id: 'education',
      name: '教育经历',
      isSelected: true,
      isVisible: true,
      isFixed: false,
      group: 'selected',
    },
    {
      id: 'languages',
      name: '语言能力',
      isSelected: false,
      isVisible: true,
      isFixed: false,
      group: 'available',
    },
    {
      id: 'projects',
      name: '项目经验',
      isSelected: false,
      isVisible: true,
      isFixed: false,
      group: 'available',
    },
    {
      id: 'awards',
      name: '荣誉奖项',
      isSelected: false,
      isVisible: false,
      isFixed: false,
      group: 'available',
    },
    {
      id: 'certificates',
      name: '证书',
      isSelected: false,
      isVisible: false,
      isFixed: false,
      group: 'available',
    },
    {
      id: 'portfolio',
      name: '作品集',
      isSelected: false,
      isVisible: false,
      isFixed: false,
      group: 'available',
    },
  ])

  // 缓存筛选后的模块列表
  const selectedModules = modules.filter((m) => m.group === 'selected')
  const availableModules = modules.filter((m) => m.group === 'available')

  // 处理拖拽结束事件
  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      setModules((items) => {
        const oldIndex = items.findIndex(
          (item) => item.id === active.id
        )
        const newIndex = items.findIndex((item) => item.id === over.id)

        // 获取模块所在的组
        const activeGroup = items[oldIndex].group
        const overGroup = items[newIndex].group

        // 只允许在同一组内拖拽
        if (activeGroup !== overGroup) {
          toast.error('不能跨组拖拽模块')
          return items
        }

        toast.success(`已将 "${items[oldIndex].name}" 移动到新位置`)
        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }, [])

  // 切换模块选择状态 - 在已选择和可用之间移动
  const toggleSelect = useCallback(
    (id: string) => {
      setModules((items) => {
        const index = items.findIndex((item) => item.id === id)
        if (index === -1) return items

        const module = items[index]
        const newItems = [...items]

        // 更新选择状态和分组
        newItems[index] = {
          ...module,
          isSelected: !module.isSelected,
          group: !module.isSelected ? 'selected' : 'available',
        }

        return newItems
      })

      const module = modules.find((m) => m.id === id)
      if (module) {
        toast.info(
          `${!module.isSelected ? '已添加' : '已移除'} "${module.name}" 模块`
        )
      }
    },
    [modules]
  )

  // 将模块从已选择列表移到可用列表（垃圾桶操作）
  const moveToAvailable = useCallback(
    (id: string) => {
      const module = modules.find((m) => m.id === id)
      if (!module) return

      if (module.isFixed) {
        toast.error('不能移除固定模块')
        return
      }

      setModules((items) =>
        items.map((item) =>
          item.id === id
            ? { ...item, isSelected: false, group: 'available' }
            : item
        )
      )

      toast.info(`已将 "${module.name}" 模块移至可用列表`)
    },
    [modules]
  )

  // 切换模块可见状态
  const toggleVisible = useCallback(
    (id: string) => {
      setModules((items) =>
        items.map((item) =>
          item.id === id
            ? { ...item, isVisible: !item.isVisible }
            : item
        )
      )

      const module = modules.find((m) => m.id === id)
      if (module) {
        toast.info(
          `${!module.isVisible ? '已显示' : '已隐藏'} "${module.name}" 模块`
        )
      }
    },
    [modules]
  )

  // 重命名模块
  const renameModule = useCallback((id: string, newName: string) => {
    setModules((items) =>
      items.map((item) =>
        item.id === id ? { ...item, name: newName } : item
      )
    )
    toast.success(`已将模块重命名为 "${newName}"`)
  }, [])

  // 彻底删除自定义模块
  const deleteModule = useCallback(
    (id: string) => {
      const module = modules.find((m) => m.id === id)
      if (!module) return

      if (module.isFixed) {
        toast.error('不能删除固定模块')
        return
      }

      // 只有自定义模块（ID以custom开头）才能被彻底删除
      if (!id.startsWith('custom-')) {
        moveToAvailable(id)
        return
      }

      setModules((items) => items.filter((item) => item.id !== id))
      toast.success(`已删除自定义模块 "${module.name}"`)
    },
    [modules, moveToAvailable]
  )

  // 添加自定义模块
  const addCustomModule = useCallback((name: string) => {
    if (!name.trim()) {
      toast.error('模块名称不能为空')
      return false
    }

    const id = `custom-${Date.now()}`
    const newModule: Module = {
      id,
      name: name.trim(),
      isSelected: true,
      isVisible: true,
      isFixed: false,
      group: 'selected',
    }

    setModules((prev) => [...prev, newModule])
    toast.success(`已添加新的自定义模块 "${name}"`)
    return true
  }, [])

  return {
    modules,
    selectedModules,
    availableModules,
    handleDragEnd,
    toggleSelect,
    toggleVisible,
    moveToAvailable,
    renameModule,
    deleteModule,
    addCustomModule,
  }
}
