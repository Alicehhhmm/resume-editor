import { type FC } from 'react'

import { Module } from '@/types'

import type { Template, TemplateIdType } from '@/types/resume-template'

import { SimpleDefault } from './simple'

// TODO: more template implementations

/**
 * 模板组件的通用Props类型
 */
export type TemplateProps = {
    data: Template
    sort?: Module[]
}

/**
 * 模板组件映射表
 * 每种模板ID对应一个实现组件
 */
const TEMPLATE_COMPONENTS = {
    'simple-default': SimpleDefault,
    'simple-modern': SimpleDefault,
    'canon-classic': SimpleDefault,
    'canon-professional': SimpleDefault,
    'creativity-modern': SimpleDefault,
    'creativity-minimal': SimpleDefault,
    'specialty-academic': SimpleDefault,
    'specialty-technical': SimpleDefault,
} satisfies Record<TemplateIdType, FC<TemplateProps>>

/**
 * WithTemplate组件Props类型
 */
interface WithTemplateProps {
    templateId: TemplateIdType
    data: Template
    sort?: Module[]
}

/**
 * 模板包装组件
 * @description 根据模板ID选择并渲染相应的模板组件
 */
const WithTemplate: FC<WithTemplateProps> = ({ templateId, data, sort }) => {
    const Component = TEMPLATE_COMPONENTS[templateId] ?? SimpleDefault

    return <Component data={data} sort={sort} />
}

export default WithTemplate
