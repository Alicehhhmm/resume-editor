import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { toast } from 'sonner'

import type {
  Template,
  TemplateState,
  TemplateActions,
  TemplateStyle,
  TemplateLayout,
  TemplateTheme,
  ExportOptions,
  ShareOptions,
  TemplateHistory
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
      history: {
        undo: [],
        redo: []
      },
      currentHistoryIndex: -1,

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
          set({
            currentTemplate: template,
            history: {
              undo: [template],
              redo: []
            },
            currentHistoryIndex: 0
          })
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

        // 更新历史记录
        const { history, currentHistoryIndex } = get()
        const newUndo = history.undo.slice(0, currentHistoryIndex + 1)
        newUndo.push(updatedTemplate)

        set({
          currentTemplate: updatedTemplate,
          templates: get().templates.map(t =>
            t.id === updatedTemplate.id ? updatedTemplate : t
          ),
          history: {
            undo: newUndo,
            redo: []
          },
          currentHistoryIndex: newUndo.length - 1
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

        // 更新历史记录
        const { history, currentHistoryIndex } = get()
        const newUndo = history.undo.slice(0, currentHistoryIndex + 1)
        newUndo.push(updatedTemplate)

        set({
          currentTemplate: updatedTemplate,
          templates: get().templates.map(t =>
            t.id === updatedTemplate.id ? updatedTemplate : t
          ),
          history: {
            undo: newUndo,
            redo: []
          },
          currentHistoryIndex: newUndo.length - 1
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
            id: `simple-default`,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }

          set(state => ({
            templates: [...state.templates, newTemplate],
            currentTemplate: newTemplate,
            history: {
              undo: [newTemplate],
              redo: []
            },
            currentHistoryIndex: 0,
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
      },

      /**
       * 应用主题
       */
      applyTheme: (theme: TemplateTheme) => {
        const { currentTemplate } = get()
        if (!currentTemplate) return

        const updatedTemplate = {
          ...currentTemplate,
          style: {
            ...currentTemplate.style,
            theme
          },
          updatedAt: new Date().toISOString()
        }

        set({
          currentTemplate: updatedTemplate,
          templates: get().templates.map(t =>
            t.id === updatedTemplate.id ? updatedTemplate : t
          )
        })
      },

      /**
       * 应用布局
       */
      applyLayout: (layout: TemplateLayout) => {
        const { currentTemplate } = get()
        if (!currentTemplate) return

        const updatedTemplate = {
          ...currentTemplate,
          style: {
            ...currentTemplate.style,
            layout
          },
          updatedAt: new Date().toISOString()
        }

        set({
          currentTemplate: updatedTemplate,
          templates: get().templates.map(t =>
            t.id === updatedTemplate.id ? updatedTemplate : t
          )
        })
      },

      /**
       * 更新样式
       */
      updateStyle: (style: Partial<TemplateStyle>) => {
        const { currentTemplate } = get()
        if (!currentTemplate) return

        const updatedTemplate = {
          ...currentTemplate,
          style: {
            ...currentTemplate.style,
            ...style
          },
          updatedAt: new Date().toISOString()
        }

        set({
          currentTemplate: updatedTemplate,
          templates: get().templates.map(t =>
            t.id === updatedTemplate.id ? updatedTemplate : t
          )
        })
      },

      /**
       * 导出模板
       */
      exportTemplate: async (options: ExportOptions) => {
        const { currentTemplate } = get()
        if (!currentTemplate) {
          toast.error('没有选中的模板')
          return
        }

        try {
          // 这里应该调用导出 API
          console.log('Exporting template with options:', options)
          toast.success('模板导出成功')
        } catch (error) {
          console.error('Error exporting template:', error)
          toast.error('模板导出失败')
        }
      },

      /**
       * 分享模板
       */
      shareTemplate: async (options: ShareOptions) => {
        const { currentTemplate } = get()
        if (!currentTemplate) {
          toast.error('没有选中的模板')
          return
        }

        try {
          // 这里应该调用分享 API
          console.log('Sharing template with options:', options)
          toast.success('模板分享成功')
        } catch (error) {
          console.error('Error sharing template:', error)
          toast.error('模板分享失败')
        }
      },

      /**
       * 撤销操作
       */
      undo: () => {
        const { history, currentHistoryIndex } = get()
        if (currentHistoryIndex <= 0) return

        const newIndex = currentHistoryIndex - 1
        const previousTemplate = history.undo[newIndex]

        set({
          currentTemplate: previousTemplate,
          currentHistoryIndex: newIndex
        })
      },

      /**
       * 重做操作
       */
      redo: () => {
        const { history, currentHistoryIndex } = get()
        if (currentHistoryIndex >= history.undo.length - 1) return

        const newIndex = currentHistoryIndex + 1
        const nextTemplate = history.undo[newIndex]

        set({
          currentTemplate: nextTemplate,
          currentHistoryIndex: newIndex
        })
      }
    }),
    {
      name: 'resume-template-storage',
      partialize: (state) => ({
        currentTemplate: state.currentTemplate,
        templates: state.templates,
        history: state.history,
        currentHistoryIndex: state.currentHistoryIndex
      }),
    }
  )
)

export default useTemplateStore