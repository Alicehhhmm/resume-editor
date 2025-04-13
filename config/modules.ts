import { type Module as ModuleItem } from '@/types/module'
import { resumeData } from '@/data/resume-data'
import type { ResumeModule } from '@/types/resume-template'
import type { ModuleID } from '@/types/module'
import type { ResumeData } from '@/types/resume'

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
    {
        id: 'publications',
        name: '出版物',
        isSelected: false,
        isVisible: false,
        isFixed: false,
        group: MODULE_GROUPS.AVAILABLE,
    },
    {
        id: 'volunteer',
        name: '志愿者经历',
        isSelected: false,
        isVisible: false,
        isFixed: false,
        group: MODULE_GROUPS.AVAILABLE,
    },
    {
        id: 'references',
        name: '推荐人',
        isSelected: false,
        isVisible: false,
        isFixed: false,
        group: MODULE_GROUPS.AVAILABLE,
    },
    {
        id: 'custom',
        name: '自定义模块',
        isSelected: false,
        isVisible: false,
        isFixed: false,
        group: MODULE_GROUPS.AVAILABLE,
    }
]

/**
 * 将resume-data转换为当前模块格式
 * @param data 简历数据
 * @returns 转换后的模块对象
 */
export const convertResumeDataToModules = (
    data: ResumeData
): { modules: Partial<Record<ModuleID, ResumeModule>>, current_visible_modules: ModuleItem[] } => {
    const modules: Partial<Record<ModuleID, ResumeModule>> = {}
    const current_visible_modules: ModuleItem[] = []

    Object.entries(data).forEach(([key, value]) => {
        const moduleId = key as ModuleID

        // 查找默认模块配置
        const defaultModule = DEFAULT_MODULES.find(m => m.id === moduleId)

        if (defaultModule) {
            const visible_module: ModuleItem = {
                id: moduleId,
                name: defaultModule.name,
                isSelected: true,
                isVisible: true,
                isFixed: defaultModule.isFixed,
                group: MODULE_GROUPS.SELECTED
            }

            // 添加到当前可见模块列表
            current_visible_modules.push(visible_module)

            modules[moduleId] = {
                module: visible_module,
                ...value
            }
        }
    })

    return { modules, current_visible_modules }
}


/**
 * 简历模板默认显示的模块
 * @description 基于resume-data.ts中的数据生成的默认显示模块
 */
const result = convertResumeDataToModules(resumeData);
export const RESUME_DEFAULT_MODULES: Partial<Record<ModuleID, ResumeModule>> = result.modules;

/**
 * 当前需要渲染的模块列表
 * @description 默认resume-data中的模块
 */
export const getVisibleModules = (): ModuleItem[] => {
    const visibleModules = [...result.current_visible_modules];

    return visibleModules
};

/**
 * 当前可选择模块（未选中的模块）
 * @description 返回未被选中的模块，排除自定义模块
 */
export const getAvailableModules = (): ModuleItem[] => {
    const visibleModuleIds = new Set(getVisibleModules().map((m) => m.id));
    return DEFAULT_MODULES.filter((m) => {
        return !visibleModuleIds.has(m.id) && m.group !== MODULE_GROUPS.AVAILABLE;
    });
};