import type { FC } from 'react'

import { DEFAULT_MODULES } from '@/config/modules'

import type { ModuleKey } from '@/types/resume'
import type { ResumeModule } from '@/types/resume-template'

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

/** 模块组件映射表 */
export const MODULE_COMPONENTS: Partial<Record<ModuleKey, FC>> = {
    personal: PersonalInfoPanel,
    social: SocialPanel,
    skills: SkillsPanel,
    experience: WorkExperiencePanel,
    education: EducationPanel,
    languages: LanguagesPanel,
    projects: ProjectsPanel,
    awards: AwardsPanel,
    certificates: CertificatesPanel,
    portfolio: PortfolioPanel,
}
