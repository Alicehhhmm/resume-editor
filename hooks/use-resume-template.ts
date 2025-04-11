import { useEffect } from 'react'
import useTemplateStore from '@/stores/template-store'
import type {
    TemplateStyle,
    TemplateLayout,
    TemplateTheme,
    ExportOptions,
    ShareOptions
} from '@/types/resume-template'

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

    /**
     * 应用主题
     * @param theme 主题类型
     */
    const applyTheme = (theme: TemplateTheme) => {
        store.applyTheme(theme)
    }

    /**
     * 应用布局
     * @param layout 布局类型
     */
    const applyLayout = (layout: TemplateLayout) => {
        store.applyLayout(layout)
    }

    /**
     * 更新样式
     * @param style 样式配置
     */
    const updateStyle = (style: Partial<TemplateStyle>) => {
        store.updateStyle(style)
    }

    /**
     * 导出模板
     * @param options 导出选项
     */
    const exportTemplate = async (options: ExportOptions) => {
        await store.exportTemplate(options)
    }

    /**
     * 分享模板
     * @param options 分享选项
     */
    const shareTemplate = async (options: ShareOptions) => {
        await store.shareTemplate(options)
    }

    /**
     * 撤销操作
     */
    const undo = () => {
        store.undo()
    }

    /**
     * 重做操作
     */
    const redo = () => {
        store.redo()
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
        applyTheme,
        applyLayout,
        updateStyle,
        exportTemplate,
        shareTemplate,
        undo,
        redo,

        // 辅助方法
        hasTemplate: store.templates.length > 0,
        hasSelectedTemplate: !!store.currentTemplate,
        canUndo: store.currentHistoryIndex > 0,
        canRedo: store.currentHistoryIndex < (store.history.undo.length || 0) - 1,
    }
}