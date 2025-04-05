'use client'

import { useSearchParams } from 'next/navigation'
import { TemplateView } from './template/view'

type Props = {}

export const EditView = ({}: Props) => {
    const searchParams = useSearchParams()
    const templateId = searchParams.get('templateId') || ''

    return (
        <div className="w-full h-full">
            <TemplateView templateId={templateId} />
        </div>
    )
}
