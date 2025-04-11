import type { FC } from 'react'

import { DEFAULT_MODULES } from '@/config/modules'

import { AwardsPanel } from './modules/awards'
import { CertificatesPanel } from './modules/certificates'
import { EducationPanel } from './modules/education'
import { LanguagesPanel } from './modules/languages'
import { PersonalInfoPanel } from './modules/personal-info'
import { PortfolioPanel } from './modules/portfolio'
import { ProjectsPanel } from './modules/projects'
import { SkillsPanel } from './modules/skills'
import { SocialPanel } from './modules/social'
import { WorkExperiencePanel } from './modules/work-experience'

/**
 * 模块编辑组件 Props 类型
 */
export interface ModuleEditorProps {
    data: any
    onChange: (content: any) => void
}

/** 模块唯一标识类型 */
export type ModuleKey = (typeof DEFAULT_MODULES)[number]['id']

/**
 * 模块组件映射表
 * 将模块ID映射到对应的React组件
 */
export const MODULE_COMPONENTS = {
    'personal-info': PersonalInfoPanel,
    social: SocialPanel,
    skills: SkillsPanel,
    'work-experience': WorkExperiencePanel,
    education: EducationPanel,
    languages: LanguagesPanel,
    projects: ProjectsPanel,
    awards: AwardsPanel,
    certificates: CertificatesPanel,
    portfolio: PortfolioPanel,
} satisfies Record<ModuleKey, FC<ModuleEditorProps>>
