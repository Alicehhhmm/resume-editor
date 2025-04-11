import type { Category, Template, TemplateStyle, TemplateTheme, TemplateLayout } from '@/types/resume-template'
import type { ModuleID } from '@/types/module'
import { MODULE_GROUPS } from "@/config/modules"

/** 默认封面 */
const DEFAULT_THUMBANAIL = '/placeholder.svg'

/**
 * 默认模板样式
 */
const DEFAULT_STYLE: TemplateStyle = {
  theme: 'light',
  layout: 'single',
  colors: {
    primary: '#2196f3',
    secondary: '#757575',
    background: '#ffffff',
    text: '#333333'
  },
  typography: {
    fontFamily: 'Arial',
    fontSize: '12px',
    lineHeight: '1.5'
  }
}

/**
 * 默认模块配置
 */
const DEFAULT_MODULES: Record<ModuleID, any> = {
  'personal-info': {
    id: 'personal-info',
    name: '个人信息',
    isSelected: true,
    isVisible: true,
    isFixed: true,
    group: MODULE_GROUPS.SELECTED
  },
  social: {
    id: 'social',
    name: '社交账号',
    isSelected: true,
    isVisible: true,
    isFixed: false,
    group: MODULE_GROUPS.SELECTED
  },
  skills: {
    id: 'skills',
    name: '专业技能',
    isSelected: true,
    isVisible: true,
    isFixed: false,
    group: MODULE_GROUPS.SELECTED
  },
  'work-experience': {
    id: 'work-experience',
    name: '工作经历',
    isSelected: true,
    isVisible: true,
    isFixed: false,
    group: MODULE_GROUPS.SELECTED
  },
  education: {
    id: 'education',
    name: '教育经历',
    isSelected: true,
    isVisible: true,
    isFixed: false,
    group: MODULE_GROUPS.SELECTED
  },
  languages: {
    id: 'languages',
    name: '语言能力',
    isSelected: false,
    isVisible: true,
    isFixed: false,
    group: MODULE_GROUPS.AVAILABLE
  },
  projects: {
    id: 'projects',
    name: '项目经验',
    isSelected: false,
    isVisible: true,
    isFixed: false,
    group: MODULE_GROUPS.AVAILABLE
  },
  awards: {
    id: 'awards',
    name: '荣誉奖项',
    isSelected: false,
    isVisible: false,
    isFixed: false,
    group: MODULE_GROUPS.AVAILABLE
  },
  certificates: {
    id: 'certificates',
    name: '证书',
    isSelected: false,
    isVisible: false,
    isFixed: false,
    group: MODULE_GROUPS.AVAILABLE
  },
  portfolio: {
    id: 'portfolio',
    name: '作品集',
    isSelected: false,
    isVisible: false,
    isFixed: false,
    group: MODULE_GROUPS.AVAILABLE
  }
}

/**
 * 模板分类常量
 */
export const TEMPLATE_CATEGORIES = {
  ALL: 'all',
  SIMPLE: 'simple',
  CANON: 'canon',
  CREATIVITY: 'creativity',
  SPECIALTY: 'specialty',
} as const

/**
 * 默认模板
 */
export const DEFAULT_TEMPLATE: Template = {
  id: 'simple-default',
  title: '简约风格',
  description: '清新简约的专业简历模板',
  category: 'simple',
  thumbnail: DEFAULT_THUMBANAIL,
  modules: DEFAULT_MODULES,
  style: DEFAULT_STYLE,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
}

/**
 * 模板MOCK数据
 * 按分类组织的模板数据
 */
export const TEMPLATES_MOCK: Record<string, Template[]> = {
  simple: [
    {
      id: 'simple-default',
      title: '简约简历模板',
      description: '清新简约风格',
      category: 'simple',
      thumbnail: DEFAULT_THUMBANAIL,
      modules: DEFAULT_MODULES,
      style: {
        ...DEFAULT_STYLE,
        colors: {
          ...DEFAULT_STYLE.colors,
          primary: '#2196f3'
        }
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'simple-modern',
      title: '现代简约',
      description: '现代简约设计',
      category: 'simple',
      thumbnail: DEFAULT_THUMBANAIL,
      modules: DEFAULT_MODULES,
      style: {
        ...DEFAULT_STYLE,
        theme: 'light',
        layout: 'single',
        colors: {
          primary: '#4caf50',
          secondary: '#9e9e9e',
          background: '#ffffff',
          text: '#212121'
        },
        typography: {
          fontFamily: 'Roboto',
          fontSize: '14px',
          lineHeight: '1.6'
        }
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ],
  canon: [
    {
      id: 'canon-classic',
      title: '经典商务',
      description: '传统专业风格',
      category: 'canon',
      thumbnail: DEFAULT_THUMBANAIL,
      modules: DEFAULT_MODULES,
      style: {
        ...DEFAULT_STYLE,
        theme: 'light',
        layout: 'double',
        colors: {
          primary: '#1976d2',
          secondary: '#424242',
          background: '#f5f5f5',
          text: '#212121'
        },
        typography: {
          fontFamily: 'Times New Roman',
          fontSize: '12px',
          lineHeight: '1.5'
        }
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'canon-professional',
      title: '专业标准',
      description: '专业标准风格',
      category: 'canon',
      thumbnail: DEFAULT_THUMBANAIL,
      modules: DEFAULT_MODULES,
      style: {
        ...DEFAULT_STYLE,
        theme: 'light',
        layout: 'double',
        colors: {
          primary: '#1976d2',
          secondary: '#424242',
          background: '#f5f5f5',
          text: '#212121'
        },
        typography: {
          fontFamily: 'Times New Roman',
          fontSize: '12px',
          lineHeight: '1.5'
        }
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ],
  creativity: [
    {
      id: 'creativity-modern',
      title: '创意设计',
      description: '独特视觉效果',
      category: 'creativity',
      thumbnail: DEFAULT_THUMBANAIL,
      modules: DEFAULT_MODULES,
      style: {
        ...DEFAULT_STYLE,
        theme: 'custom',
        layout: 'triple',
        colors: {
          primary: '#ff4081',
          secondary: '#9c27b0',
          background: '#ffffff',
          text: '#000000'
        },
        typography: {
          fontFamily: 'Montserrat',
          fontSize: '13px',
          lineHeight: '1.8'
        }
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'creativity-minimal',
      title: '极简创意',
      description: '极简创意风格',
      category: 'creativity',
      thumbnail: DEFAULT_THUMBANAIL,
      modules: DEFAULT_MODULES,
      style: {
        ...DEFAULT_STYLE,
        theme: 'custom',
        layout: 'triple',
        colors: {
          primary: '#ff4081',
          secondary: '#9c27b0',
          background: '#ffffff',
          text: '#000000'
        },
        typography: {
          fontFamily: 'Montserrat',
          fontSize: '13px',
          lineHeight: '1.8'
        }
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ],
  specialty: [
    {
      id: 'specialty-academic',
      title: '学术简历',
      description: '学术研究风格',
      category: 'specialty',
      thumbnail: DEFAULT_THUMBANAIL,
      modules: DEFAULT_MODULES,
      style: {
        ...DEFAULT_STYLE,
        theme: 'dark',
        layout: 'single',
        colors: {
          primary: '#00bcd4',
          secondary: '#607d8b',
          background: '#263238',
          text: '#ffffff'
        },
        typography: {
          fontFamily: 'Consolas',
          fontSize: '12px',
          lineHeight: '1.5'
        }
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'specialty-technical',
      title: '技术简历',
      description: '技术专业风格',
      category: 'specialty',
      thumbnail: DEFAULT_THUMBANAIL,
      modules: DEFAULT_MODULES,
      style: {
        ...DEFAULT_STYLE,
        theme: 'dark',
        layout: 'single',
        colors: {
          primary: '#00bcd4',
          secondary: '#607d8b',
          background: '#263238',
          text: '#ffffff'
        },
        typography: {
          fontFamily: 'Consolas',
          fontSize: '12px',
          lineHeight: '1.5'
        }
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ]
}

/**
 * 获取所有模板列表
 */
export const getAllTemplates = (): Template[] => {
  return Object.values(TEMPLATES_MOCK).flat()
}

/**
 * 按分类获取模板
 */
export const getTemplatesByCategory = (category: Category): Template[] => {
  if (category === 'all') {
    return getAllTemplates()
  }
  return TEMPLATES_MOCK[category] || []
}

/**
 * 获取模板详情
 */
export const getTemplateById = (id: string): Template | undefined => {
  return getAllTemplates().find(template => template.id === id)
}
