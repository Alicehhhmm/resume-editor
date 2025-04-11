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

// TODO: 后续添加的模板
// | 'canon-classic'
// | 'canon-professional'
// | 'creativity-modern'
// | 'creativity-minimal'
// | 'specialty-academic'
// | 'specialty-technical'

/**
 * 模板主题类型
 */
export type TemplateTheme = 'light' | 'dark' | 'custom'

/**
 * 模板布局类型
 */
export type TemplateLayout = 'single-column' | 'two-column' | 'custom'

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
        accent: string
    }
    typography: {
        fontFamily: string
        fontSize: {
            base: string
            heading: string
            subheading: string
        }
        lineHeight: {
            base: string
            heading: string
        }
    }
}

/**
 * 模板导出选项
 */
export interface ExportOptions {
    format: 'pdf' | 'docx' | 'html'
    quality: 'low' | 'medium' | 'high'
    includeMetadata?: boolean
    watermark?: boolean
    pageSize?: 'A4' | 'Letter' | 'Custom'
    orientation?: 'portrait' | 'landscape'
}

/**
 * 模板分享选项
 */
export interface ShareOptions {
    platform: 'email' | 'link' | 'social'
    permissions: 'view' | 'edit' | 'comment'
    expiration?: string
    password?: string
}

/**
 * 简历模板数据结构
 * @description 定义简历模板的基本信息
 */
export interface Template {
    id: string
    title: string
    description: string
    category: Category
    templateId: TemplateIdType
    thumbnail: string
    modules?: Record<ModuleID, ResumeModule>
    createdAt?: string
    updatedAt?: string
    layout?: {
        sections: string[]
        styles: TemplateStyle
    }
    metadata?: {
        version: string
        author: string
        tags: string[]
        rating: number
        downloads: number
        lastModified: string
    }
    preview?: {
        images: string[]
        description: string
        features: string[]
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
    previewMode?: boolean
    editMode?: boolean
    exportOptions?: ExportOptions
    shareOptions?: ShareOptions
    history?: {
        undo: Template[]
        redo: Template[]
    }
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
    togglePreviewMode: () => void
    toggleEditMode: () => void
    resetTemplate: () => void
    exportTemplate: (options: ExportOptions) => Promise<void>
    shareTemplate: (options: ShareOptions) => Promise<void>
    undo: () => void
    redo: () => void
    saveTemplate: () => Promise<void>
    deleteTemplate: (templateId: string) => Promise<void>
    duplicateTemplate: (templateId: string) => Promise<void>
    applyTheme: (theme: TemplateTheme) => void
    updateStyle: (style: Partial<TemplateStyle>) => void
}

/**
 * 模板组件Props类型
 */
export interface TemplateCardProps {
    id: string
    title: string
    description: string
    thumbnail: string
    isActive?: boolean
    onClick?: () => void
}

/**
 * 模板网格Props类型
 */
export interface TemplateGridProps {
    category: Category
    selectedId?: string
    isLoading?: boolean
    onSelect: (template: Template) => void
}

/**
 * 模板与模块的关联类型
 * @description 将模板与模块关联起来
 */
export interface TemplateModuleMap {
    templateId: string
    moduleId: string
    content: any
    order?: number
    isVisible?: boolean
    isRequired?: boolean
    validation?: {
        required?: boolean
        minLength?: number
        maxLength?: number
        pattern?: string
        custom?: (value: any) => boolean
    }
    permissions?: {
        canEdit?: boolean
        canDelete?: boolean
        canMove?: boolean
        canResize?: boolean
    }
}

/**
 * 模板编辑器Props类型
 */
export interface TemplateEditorProps {
    template: Template
    onUpdate: (template: Partial<Template>) => void
    onSave: () => Promise<void>
    onExport: (options: ExportOptions) => Promise<void>
    onShare: (options: ShareOptions) => Promise<void>
    onUndo: () => void
    onRedo: () => void
    onReset: () => void
    isDirty?: boolean
    isSaving?: boolean
    isExporting?: boolean
    isSharing?: boolean
    error?: string
}

/**
 * 模板预览Props类型
 */
export interface TemplatePreviewProps {
    template: Template
    data: ResumeData
    onClose: () => void
    onEdit: () => void
    onExport: (options: ExportOptions) => Promise<void>
    onShare: (options: ShareOptions) => Promise<void>
    isExporting?: boolean
    isSharing?: boolean
    error?: string
}

/**
 * 简历模板元素类型
 * @description 扩展CanvasElement，添加模板特有的属性
 */
export interface ResumeTemplateElement extends CanvasElement {
    type: 'template'
    properties: TemplateElementProperties & {
        template: Template
        modules: Record<string, ResumeModule>
    }
}

type ModuleMerge =
    | PersonalInfo
    | Education
    | WorkExperience
    | Skill[]
    | Language[]
    | Certificate[]
    | Project[]
    | Award[]
    | Publication[]
    | VolunteerExperience[]

// 模板显示的模块内容-类型合并
export interface ResumeModule extends Module {
    data?: ModuleMerge
    style?: Record<string, any>
    config?: {
        isCollapsible?: boolean
        isDraggable?: boolean
        isEditable?: boolean
        validation?: {
            required?: boolean
            minLength?: number
            maxLength?: number
            pattern?: string
            custom?: (value: any) => boolean
        }
        permissions?: {
            canEdit?: boolean
            canDelete?: boolean
            canMove?: boolean
            canResize?: boolean
        }
    }
}

export type { ResumeModule }