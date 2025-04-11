import { useEffect } from 'react'
import useTemplateStore from '@/stores/template-store'
import type { Template } from '@/types/resume-template'

/**
 * 简历模板 Hook
 * @description 提供操作简历模板的统一接口
 */
export const useResumeTemplate = () => {
  const store = useTemplateStore()

  // 初始化：获取所有模板
  useEffect(() => {
    if (store.templates.length === 0 && !store.isLoading) {
      store.fetchTemplates()
    }
  }, [store])

  /**
   * 更新模块内容并同步到模板
   * @param moduleId 模块ID
   * @param content 模块内容
   */
  const updateModuleContent = (moduleId: string, content: any) => {
    store.updateModuleContent(moduleId, content)
  }

  /**
   * 按分类获取模板
   * @param category 模板分类
   */
  const getTemplatesByCategory = (category: string) => {
    if (category === 'all') {
      return store.templates
    }
    return store.templates.filter(template => template.category === category)
  }

  return {
    // 状态
    templates: store.templates,
    currentTemplate: store.currentTemplate,
    isLoading: store.isLoading,
    error: store.error,

    // 方法
    fetchTemplates: store.fetchTemplates,
    selectTemplate: store.selectTemplate,
    updateTemplate: store.updateTemplate,
    updateModuleContent,
    createTemplate: store.createTemplate,
    getTemplatesByCategory,

    // 辅助方法
    hasTemplate: store.templates.length > 0,
    hasSelectedTemplate: !!store.currentTemplate,
  }
}