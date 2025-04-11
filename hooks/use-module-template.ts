import { useMemo } from 'react'
import { useModuleManager } from './use-module-manager'
import { useResumeTemplate } from './use-resume-template'
import type { Module } from '@/types/module'

/**
 * 模块与模板关联 Hook
 * @description 将模块内容与当前选择的简历模板绑定
 */
export const useModuleTemplate = () => {
  const {
    selectedModules,
    toggleVisible,
    getModuleById,
    renameModule,
    moveToAvailable
  } = useModuleManager()

  const {
    currentTemplate,
    updateModuleContent
  } = useResumeTemplate()

  /**
   * 获取模块在当前模板中的内容
   * @param moduleId 模块ID
   */
  const getModuleContent = (moduleId: string) => {
    if (!currentTemplate || !currentTemplate.modules) {
      return null
    }
    return currentTemplate.modules[moduleId] || null
  }

  /**
   * 更新模块内容
   * @param moduleId 模块ID
   * @param content 模块内容
   */
  const updateModule = (moduleId: string, content: any) => {
    updateModuleContent(moduleId, content)
  }

  /**
   * 切换模块可见性
   * @param moduleId 模块ID
   */
  const toggleModuleVisibility = (moduleId: string) => {
    toggleVisible(moduleId)
  }

  /**
   * 获取可见的模块列表
   * 按照 selectedModules 的顺序返回可见的模块
   */
  const visibleModules = useMemo(() => {
    return selectedModules.filter(module => module.isVisible)
  }, [selectedModules])

  /**
   * 获取隐藏的模块列表
   */
  const hiddenModules = useMemo(() => {
    return selectedModules.filter(module => !module.isVisible)
  }, [selectedModules])

  /**
   * 检查模块是否有内容
   * @param moduleId 模块ID
   */
  const hasModuleContent = (moduleId: string) => {
    const content = getModuleContent(moduleId)
    return content !== null && Object.keys(content || {}).length > 0
  }

  return {
    // 模块列表
    selectedModules,
    visibleModules,
    hiddenModules,

    // 模块操作
    getModuleById,
    getModuleContent,
    updateModule,
    renameModule,
    toggleModuleVisibility,
    moveToAvailable,
    hasModuleContent,

    // 模板信息
    templateId: currentTemplate?.id,
    templateTitle: currentTemplate?.title,
  }
} 