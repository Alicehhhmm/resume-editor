import type { Category, Template } from '@/types/resume-template'
import { MODULE_GROUPS } from "@/config/modules";

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
  id: 'simple-1',
  title: '简约风格',
  description: '清新简约的专业简历模板',
  category: 'simple',
  thumbnail: '/templates/simple-1.png',
  modules: {},
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}

/**
 * 模板MOCK数据
 * 按分类组织的模板数据
 */
export const TEMPLATES_MOCK: Record<string, Template[]> = {
  simple: [
    {
      id: 'simple-1',
      title: '简约简历模板',
      description: '清新简约风格',
      category: 'simple',
      thumbnail: '/templates/simple-1.png',
      modules: {},
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'simple-2',
      title: '极简风格',
      description: '黑白配色',
      category: 'simple',
      thumbnail: '/templates/simple-2.png',
      modules: {},
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'simple-3',
      title: '现代简约',
      description: '现代简约设计',
      category: 'simple',
      thumbnail: '/templates/simple-3.png',
      modules: {},
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  canon: [
    {
      id: 'canon-1',
      title: '经典商务',
      description: '传统专业风格',
      category: 'canon',
      thumbnail: '/templates/canon-1.png',
      modules: {},
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'canon-2',
      title: '标准简历',
      description: '规范布局',
      category: 'canon',
      thumbnail: '/templates/canon-2.png',
      modules: {},
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  creativity: [
    {
      id: 'creative-1',
      title: '创意设计',
      description: '独特视觉效果',
      category: 'creativity',
      thumbnail: '/templates/creative-1.png',
      modules: {},
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'creative-2',
      title: '艺术简历',
      description: '个性化展示',
      category: 'creativity',
      thumbnail: '/templates/creative-2.png',
      modules: {},
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  specialty: [
    {
      id: 'specialty-1',
      title: '技术简历',
      description: '突出专业技能',
      category: 'specialty',
      thumbnail: '/templates/specialty-1.png',
      modules: {},
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'specialty-2',
      title: '学术简历',
      description: '研究成果展示',
      category: 'specialty',
      thumbnail: '/templates/specialty-2.png',
      modules: {},
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
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
