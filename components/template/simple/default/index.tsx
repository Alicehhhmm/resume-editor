import { type FC, useMemo } from 'react'

import type { Education, PersonalInfo, Skill, WorkExperience } from '@/types/resume'
import type { ResumeModule } from '@/types/resume-template'

import type { TemplateProps } from '@/components/template/WithTemplate'

import ContactBar from './contact-bar'
import EducationSection from './education-section'
import ExperienceSection from './experience-section'
import ProfileSection from './profile-section'
import ResumeHeader from './resume-header'
import SkillsSection from './skills-section'

// 默认个人信息数据
const DEFAULT_PERSONAL_INFO: PersonalInfo = {
    name: '',
    title: '',
    contact: {
        phone: '',
        email: '',
        location: '',
    },
    profile: '',
}

/**
 * 简约风格默认模板
 * @description 一个简洁、现代的简历模板实现
 */
const SimpleDefault: FC<TemplateProps> = ({ data }) => {
    console.log('SimpleDefault@data', data)

    // 处理并缓存模板所需数据
    const { modules, visibleModules } = useMemo(() => {
        const templateModules = data.modules || {}

        // 提取模块数据
        const extractedModules = {
            personal: (templateModules.personal || {}) as PersonalInfo,
            education: (templateModules.education || {}) as unknown as Education[],
            experience: (templateModules.experience || {}) as unknown as WorkExperience[],
            skills: (templateModules.skills || {}) as unknown as Skill[],
        }

        // 确定哪些模块需要显示
        const visibleModules = {
            personal: !!templateModules.personal?.module?.isVisible,
            education: !!templateModules.education?.module?.isVisible,
            experience: !!templateModules.experience?.module?.isVisible,
            skills: !!templateModules.skills?.module?.isVisible,
        }

        return { modules: extractedModules, visibleModules }
    }, [data.modules])

    // 解构个人信息数据
    const { name, title, contact, profile } = modules.personal || DEFAULT_PERSONAL_INFO

    return (
        <div className="min-h-screen bg-background">
            {/* 头部区域 - 个人信息模块必须显示 */}
            <ResumeHeader name={name || ''} title={title || ''} />

            {/* 联系信息区域 - 个人信息模块的一部分 */}
            <ContactBar
                phone={contact?.phone || ''}
                email={contact?.email || ''}
                location={contact?.location || ''}
                linkedin={contact?.linkedin || ''}
            />

            {/* 内容区域 */}
            <div className="p-8 space-y-6">
                {/* 个人简介部分 */}
                {visibleModules.personal && <ProfileSection profile={profile || ''} />}

                {/* 工作经验部分 */}
                {visibleModules.experience && <ExperienceSection experiences={modules.experience} />}

                {/* 教育经历部分 */}
                {visibleModules.education && <EducationSection educations={modules.education} />}

                {/* 技能部分 */}
                {visibleModules.skills && <SkillsSection skills={modules.skills} />}
            </div>
        </div>
    )
}

export default SimpleDefault
