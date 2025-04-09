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

/** Map unique key */
export type Modulekey = (typeof DEFAULT_MODULES)[number]['id']

/** module key enum */
export const MODULE_COMPONENTS: Record<Modulekey, React.ComponentType> = {
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
