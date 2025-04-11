import type { FC } from 'react'
import type { ResumeModule } from '@/types/resume-template'

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

/** 模块唯一标识类型 */
export type ModuleKey = (typeof DEFAULT_MODULES)[number]['id']

/** 模块编辑器属性 */
export interface ModuleEditorProps {
  data: ResumeModule | null
  onChange: (content: ResumeModule) => void
}

/** 模块组件映射表 */
export const MODULE_COMPONENTS: Record<ModuleKey, FC<ModuleEditorProps>> = {
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
} 
