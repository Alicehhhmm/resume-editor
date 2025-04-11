import type { FC } from 'react'

import type { ResumeModule, TemplateIdType } from '@/types/resume-template'

import { SimpleDefault } from './simple'

const templates = {
    'simple-default': SimpleDefault,
    'simple-modern': SimpleDefault,
} satisfies Record<TemplateIdType, FC>

type WithTemplateProps = {
    templateId: TemplateIdType
    data: ResumeModule
}

const WithTemplate: FC<WithTemplateProps> = ({ templateId, data }) => {
    const Component: FC<{ data: ResumeModule }> = templates[templateId] ?? SimpleDefault

    return <Component data={data} />
}

export default WithTemplate
