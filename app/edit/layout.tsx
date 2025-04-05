import type { ReactNode } from 'react'

import { EditorLayout } from '@/components/layout'

export default function EditRootLayout({ children }: { children: ReactNode }) {
    return <EditorLayout>{children}</EditorLayout>
}
