import { TemplateView } from '@/views/edit/select-template/view'

import { HydrateClient as TanstackHydrateClient } from '@/components/provider'

interface TemplatesPageProps {
    params: Promise<{ templateId: string }>
}

const TemplatesPage = async ({ params }: TemplatesPageProps) => {
    const { templateId } = await params

    return (
        <TanstackHydrateClient>
            <TemplateView templateId={templateId} />
        </TanstackHydrateClient>
    )
}

export const dynamic = 'force-dynamic'

export default TemplatesPage
