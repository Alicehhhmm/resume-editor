import type { CanvasElement } from '@/types/canvas'
import type { Module, ModuleID } from '@/types/module'
import type {
    PersonalInfo,
    Education,
    WorkExperience,
    Skill,
    Language,
    Certificate,
    Project,
    Award,
    Publication,
    VolunteerExperience,
    ResumeData
} from '@/types/resume'
import type { CanvasElement, TemplateElementProperties } from '@/types/canvas'

/**
 * 模板分类类型
 */
export type Category = 'all' | 'simple' | 'canon' | 'creativity' | 'specialty'

/**
 * 模板唯一标识
 */
export type TemplateIdType =
    | 'simple-default'
    | 'simple-modern'
    | 'canon-classic'
    | 'canon-professional'
    | 'creativity-modern'
    | 'creativity-minimal'
    | 'specialty-academic'
    | 'specialty-technical'

/**
 * 模板主题类型
 */
export type TemplateTheme = 'light' | 'dark' | 'custom'

/**
 * 模板布局类型
 */
export type TemplateLayout = 'single' | 'double' | 'triple'

/**
 * 模板样式配置
 */
export interface TemplateStyle {
    theme: TemplateTheme
    layout: TemplateLayout
    colors: {
        primary: string
        secondary: string
        background: string
        text: string
    }
    typography: {
        fontFamily: string
        fontSize: string
        lineHeight: string
    }
}

/**
 * 模板导出选项
 */
export interface ExportOptions {
    format: 'pdf' | 'docx' | 'html'
    quality: 'low' | 'medium' | 'high'
    pageSize: 'A4' | 'Letter'
    includeMetadata: boolean
}

/**
 * 模板分享选项
 */
export interface ShareOptions {
    platform: 'email' | 'link' | 'social'
    permissions: {
        canEdit: boolean
        canCopy: boolean
        canDownload: boolean
    }
    expiration?: string
}

/**
 * 模板历史记录
 */
export interface TemplateHistory {
    undo: Template[]
    redo: Template[]
}

/**
 * 简历模板数据结构
 * @description 定义简历模板的基本信息
 */
export interface Template {
    id: TemplateIdType
    title: string
    description: string
    category: Category
    thumbnail: string
    modules: Partial<Record<ModuleID, ResumeModule>>
    style: TemplateStyle
    preview?: {
        images: string[]
        description: string
        features: string[]
    }
    metadata?: {
        author: string
        version: string
        tags: string[]
        rating: number
        downloads: number
    }
    createdAt: string
    updatedAt: string
}

// 模板显示的模块内容-类型合并
export interface ResumeModule extends ResumeData {
    module?: Module,
    config?: {
        isCollapsible?: boolean
        isDraggable?: boolean
        isEditable?: boolean
    }
}

/**
 * 模板状态类型
 * @description 定义模板状态管理所需的数据结构
 */
export interface TemplateState {
    templates: Template[]
    currentTemplate: Template | null
    isLoading: boolean
    error: string | null
    history: TemplateHistory
    currentHistoryIndex: number
}

/**
 * 模板操作类型
 * @description 定义模板操作方法
 */
export interface TemplateActions {
    fetchTemplates: () => Promise<void>
    selectTemplate: (templateId: string) => void
    updateTemplate: (template: Partial<Template>) => void
    updateModuleContent: (moduleId: string, content: any) => void
    createTemplate: (template: Omit<Template, 'id'>) => Promise<void>
    applyTheme: (theme: TemplateTheme) => void
    applyLayout: (layout: TemplateLayout) => void
    updateStyle: (style: Partial<TemplateStyle>) => void
    exportTemplate: (options: ExportOptions) => Promise<void>
    shareTemplate: (options: ShareOptions) => Promise<void>
    undo: () => void
    redo: () => void
}

/**
 * 模板组件Props类型
 */
export interface ResumeTemplateElement extends CanvasElement {
    template: Template
    properties: TemplateElementProperties
}

/**
 * 简历模板元素类型
 * @description 扩展CanvasElement，添加模板特有的属性
 */
export interface ResumeTemplateElement extends CanvasElement {
    type: 'template'
    properties: TemplateElementProperties & {
        template: Template
        modules: Record<ModuleID, ResumeModule>
    }
}

