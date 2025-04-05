import type { ReactNode } from 'react'

import { EditorLayout } from '@/components/layout'
import { CanvasProvider } from '@/components/provider'

export default function EditRootLayout({ children }: { children: ReactNode }) {
    return (
        <CanvasProvider>
            <EditorLayout>{children}</EditorLayout>
        </CanvasProvider>
    )
}