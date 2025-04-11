import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { toast } from 'sonner'

import type {
  Template,
  TemplateState,
  TemplateActions
} from '@/types/resume-template'

import { DEFAULT_TEMPLATE } from '@/config/resume-template'

/**
 * 简历模板状态管理
 * @description 管理简历模板相关的状态和操作
 */
const useTemplateStore = create<TemplateState & TemplateActions>()(
  persist(
    (set, get) => ({
      // 初始状态
      templates: [],
      currentTemplate: DEFAULT_TEMPLATE,
      isLoading: false,
      error: null,

      /**
       * 获取所有模板
       */
      fetchTemplates: async () => {
        try {
          set({ isLoading: true, error: null })
          const response = await fetch('/api/templates')

          if (!response.ok) {
            throw new Error('Failed to fetch templates')
          }

          const data = await response.json()
          set({
            templates: data.data,
            isLoading: false
          })
        } catch (error) {
          console.error('Error fetching templates:', error)
          set({
            error: error instanceof Error ? error.message : 'Unknown error',
            isLoading: false
          })
          toast.error('加载模板失败')
        }
      },

      /**
       * 选择模板
       */
      selectTemplate: (templateId: string) => {
        const { templates } = get()
        const template = templates.find(t => t.id === templateId)

        if (template) {
          set({ currentTemplate: template })
          toast.success(`已选择"${template.title}"模板`)
        } else {
          toast.error('模板不存在')
        }
      },

      /**
       * 更新模板信息
       */
      updateTemplate: (template: Partial<Template>) => {
        const { currentTemplate } = get()

        if (!currentTemplate) {
          toast.error('没有选中的模板')
          return
        }

        const updatedTemplate = {
          ...currentTemplate,
          ...template,
          updatedAt: new Date().toISOString()
        }

        set({
          currentTemplate: updatedTemplate,
          templates: get().templates.map(t =>
            t.id === updatedTemplate.id ? updatedTemplate : t
          )
        })

        toast.success('模板已更新')
      },

      /**
       * 更新模块内容
       */
      updateModuleContent: (moduleId: string, content: any) => {
        const { currentTemplate } = get()

        if (!currentTemplate) {
          toast.error('没有选中的模板')
          return
        }

        const modules = {
          ...currentTemplate.modules,
          [moduleId]: content
        }

        const updatedTemplate = {
          ...currentTemplate,
          modules,
          updatedAt: new Date().toISOString()
        }

        set({
          currentTemplate: updatedTemplate,
          templates: get().templates.map(t =>
            t.id === updatedTemplate.id ? updatedTemplate : t
          )
        })

        toast.success('模块内容已更新')
      },

      /**
       * 创建自定义模板
       */
      createTemplate: async (template: Omit<Template, 'id'>) => {
        try {
          set({ isLoading: true, error: null })

          // 在实际应用中，这里应该是一个API请求
          const newTemplate: Template = {
            ...template,
            id: `custom-${Date.now()}`,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }

          set(state => ({
            templates: [...state.templates, newTemplate],
            currentTemplate: newTemplate,
            isLoading: false
          }))

          toast.success('自定义模板已创建')
        } catch (error) {
          console.error('Error creating template:', error)
          set({
            error: error instanceof Error ? error.message : 'Unknown error',
            isLoading: false
          })
          toast.error('创建模板失败')
        }
      }
    }),
    {
      name: 'resume-template-storage',
      partialize: (state) => ({
        currentTemplate: state.currentTemplate,
        templates: state.templates
      }),
    }
  )
)

export default useTemplateStore