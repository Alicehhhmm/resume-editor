'use client'

import type { ReactNode } from 'react'

import { useCanvas } from '@/hooks'
import { DrawView as DrawingBoard } from '@/views/edit/draw/view'
import { RightPanel as InfoPanel } from '@/views/edit/info-panels/view'

import { EditorMenuSidebar, HeaderNavBar, LeftSiderbar, RightSiderbar } from '@/components/navigation'
import { SidebarProvider } from '@/components/ui/sidebar'

interface EditorLayoutProps {
    children: ReactNode
}

export default function EditorLayout({ children }: EditorLayoutProps) {
    const { panels, pagePreview } = useCanvas()

    return (
        <SidebarProvider defaultOpen={false}>
            <div className="flex w-full">
                <EditorMenuSidebar />
                <section className="flex-1 h-screen flex flex-col bg-background">
                    <HeaderNavBar />

                    <div className="flex-1 flex overflow-hidden">
                        {/* Left sidebar */}
                        <LeftSiderbar hide={panels.leftHide} onToggle={(collapsed) => pagePreview({ leftHide: collapsed })}>
                            {children}
                        </LeftSiderbar>

                        {/* Main content */}
                        <main className="flex-1 overflow-auto p-6 bg-[#f8f9fa] dark:bg-neutral-900">
                            <DrawingBoard />
                        </main>

                        {/* Right sidebar */}
                        <RightSiderbar hide={panels.rightHide} onToggle={(collapsed) => pagePreview({ rightHide: collapsed })}>
                            <InfoPanel />
                        </RightSiderbar>
                    </div>
                </section>
            </div>
        </SidebarProvider>
    )
}
