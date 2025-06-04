'use client'

import { type FC, useMemo } from 'react'

import type { Module } from '@/types/module'
import type { ModuleKey, ModuleToDataType, ResumeData, Skill, WorkExperience } from '@/types/resume'
import type { ResumeModule } from '@/types/resume-template'

import { WithSortableContext, WithSortableItem } from '@/components/template'
import type { TemplateProps } from '@/components/template/WithTemplate'

import ContactBar from './contact-bar'
import EducationSection from './education-section'
import ExperienceSection from './experience-section'
import ProfileSection from './profile-section'
import ResumeHeader from './resume-header'
import SkillsSection from './skills-section'

type ModuleProps<K extends ModuleKey> = {
    data: ModuleToDataType[K]
    className?: string
}

export type ModuleComponent<K extends ModuleKey> = FC<ModuleProps<K>>

/** 当前模板-模块组件映射表 */
export const TEMPLATE_MODULE_COMPONENTS: Partial<{
    [K in ModuleKey]: ModuleComponent<K>
}> = {
    personal: ResumeHeader,
    social: ContactBar,
    skills: SkillsSection,
    education: EducationSection,
    portfolio: ProfileSection,
    experience: ExperienceSection,
}

/**
 * 简约风格默认模板
 * @description 一个简洁、现代的简历模板实现
 */
const SimpleDefault: FC<TemplateProps> = ({ data, sort }) => {
    console.log('SimpleDefault@data', data)
    console.log('SimpleDefault@sort', sort)

    if (!sort) return null
    const list: Module[] = [...sort]

    return (
        <div className="min-h-screen bg-background">
            <WithSortableContext modules={list}>
                <>
                    {list.length > 0 &&
                        list.map((module, index) => {
                            // 获取模块对应的组件
                            const ComponentItem = TEMPLATE_MODULE_COMPONENTS[module.id]
                            if (!ComponentItem || !module.isVisible) return null

                            // 获取模块数据
                            const sectionData = data.modules[module.id] as ModuleToDataType[typeof module.id]

                            if (!sectionData) return null
                            console.log('sectionData', module.id, sectionData)

                            return (
                                <WithSortableItem key={module.id} module={module}>
                                    <>
                                        <div className="p-8">
                                            <ComponentItem data={sectionData as any} />
                                        </div>
                                    </>
                                </WithSortableItem>
                            )
                        })}
                </>
            </WithSortableContext>
        </div>
    )
}

export default SimpleDefault
