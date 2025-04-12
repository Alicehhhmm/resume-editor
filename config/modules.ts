import { type Module as ModuleItem } from '@/types/module'

// 模块分组类型
export const MODULE_GROUPS = {
  SELECTED: 'selected',
  AVAILABLE: 'available',
  CUSTOM: 'custom',
} as const

// 模块名称验证规则
export const MODULE_NAME_RULES = {
  maxLength: 20,
  minLength: 1,
}

// 模块操作类型
export const MODULE_ACTIONS = {
  ADD: 'add',
  REMOVE: 'remove',
  RENAME: 'rename',
  TOGGLE_VISIBLE: 'toggle_visible',
  MOVE: 'move',
} as const

// 默认模块配置
export const DEFAULT_MODULES: ModuleItem[] = [
  {
    id: 'personal',
    name: '个人简介',
    isSelected: true,
    isVisible: true,
    isFixed: true,
    group: MODULE_GROUPS.SELECTED,
  },
  {
    id: 'social',
    name: '社交账号',
    isSelected: true,
    isVisible: true,
    isFixed: false,
    group: MODULE_GROUPS.SELECTED,
  },
  {
    id: 'skills',
    name: '专业技能',
    isSelected: true,
    isVisible: true,
    isFixed: false,
    group: MODULE_GROUPS.SELECTED,
  },
  {
    id: 'experience',
    name: '工作经历',
    isSelected: true,
    isVisible: true,
    isFixed: false,
    group: MODULE_GROUPS.SELECTED,
  },
  {
    id: 'education',
    name: '教育经历',
    isSelected: true,
    isVisible: true,
    isFixed: false,
    group: MODULE_GROUPS.SELECTED,
  },
  {
    id: 'languages',
    name: '语言能力',
    isSelected: false,
    isVisible: true,
    isFixed: false,
    group: MODULE_GROUPS.AVAILABLE,
  },
  {
    id: 'projects',
    name: '项目经验',
    isSelected: false,
    isVisible: true,
    isFixed: false,
    group: MODULE_GROUPS.AVAILABLE,
  },
  {
    id: 'awards',
    name: '荣誉奖项',
    isSelected: false,
    isVisible: false,
    isFixed: false,
    group: MODULE_GROUPS.AVAILABLE,
  },
  {
    id: 'certificates',
    name: '证书',
    isSelected: false,
    isVisible: false,
    isFixed: false,
    group: MODULE_GROUPS.AVAILABLE,
  },
  {
    id: 'portfolio',
    name: '作品集',
    isSelected: false,
    isVisible: false,
    isFixed: false,
    group: MODULE_GROUPS.AVAILABLE,
  },
] 