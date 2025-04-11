import type { FC } from 'react'

import type { ResumeModule, TemplateIdType } from '@/types/resume-template'

import { SimpleDefault } from './simple'

// TODO: more tamplate

const templates = {
    'simple-default': SimpleDefault,
    'simple-modern': SimpleDefault,
    'canon-classic': SimpleDefault,
    'canon-professional': SimpleDefault,
    'creativity-modern': SimpleDefault,
    'creativity-minimal': SimpleDefault,
    'specialty-academic': SimpleDefault,
    'specialty-technical': SimpleDefault,
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
