import type { Module } from '@/types/module'

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
    modules?: Record<string, any> // 模板中各模块的具体内容
    createdAt?: string
    updatedAt?: string
}

/**
 * 模板状态类型
 * @description 定义模板状态管理所需的数据结构
 */
export interface TemplateState {
    templates: Template[] // 所有可用模板
    currentTemplate: Template | null // 当前选中的模板
    isLoading: boolean // 加载状态
    error: string | null // 错误信息
}

/**
 * 模板操作类型
 * @description 定义模板操作方法
 */
export interface TemplateActions {
    fetchTemplates: () => Promise<void> // 获取所有模板
    selectTemplate: (templateId: string) => void // 选择模板
    updateTemplate: (template: Partial<Template>) => void // 更新模板
    updateModuleContent: (moduleId: string, content: any) => void // 更新模块内容
    createTemplate: (template: Omit<Template, 'id'>) => Promise<void> // 创建自定义模板
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
    content: any // 具体内容
    position?: { x: number, y: number } // 在画布中的位置
    style?: Record<string, any> // 样式配置
}

// 个人信息-模块内容类型
type PersonalInfo = {
    name: string;
    contact: {
        phone: string;
        email: string;
        location?: string;
    };
    socialProfiles?: {
        linkedin?: string;
        github?: string;
    };
};

// 教育-模块内容类型
type Education = {
    institution: string;
    degree: string;
    major: string;
    duration: [Date, Date?];
    gpa?: number;
    courses?: string[];
};

// 工作经历-模块内容类型
type WorkExperience = {
    company: string;
    position: string;
    duration: [Date, Date?];
    achievements: {
        description: string;
        metrics?: string;
        technologies?: string[];
    }[];
};

// 模板显示的模块内容-类型合并
interface ResumeModule extends Module {
    data?: PersonalInfo | Education | WorkExperience
}

export type { ResumeModule }