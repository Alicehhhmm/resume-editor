'use client'

import type { ReactNode } from 'react'

import { Draw as DrawingBoard } from '@/components/canvas'
import {
    EditorMenuSidebar,
    HeaderNavBar,
    LeftSiderbar,
    RightSiderbar,
} from '@/components/navigation'
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from '@/components/ui/sidebar'

interface EditorLayoutProps {
    children: ReactNode
}

export default function EditorLayout({ children }: EditorLayoutProps) {
    return (
        <SidebarProvider defaultOpen={false}>
            <div className="flex w-full">
                <EditorMenuSidebar />
                <section className="flex-1 h-screen flex flex-col bg-background">
                    <HeaderNavBar />

                    <div className="flex-1 flex overflow-hidden">
                        {/* Left sidebar - Template selection */}
                        <LeftSiderbar>{children}</LeftSiderbar>

                        {/* Main content area - Resume preview */}
                        <main className="flex-1 overflow-auto p-6 bg-[#f8f9fa] dark:bg-neutral-900">
                            {/* <div className="max-w-[850px] mx-auto"> */}
                            <DrawingBoard />
                            {/* </div> */}
                        </main>

                        {/* Right sidebar - Content editing */}
                        <RightSiderbar />
                    </div>
                </section>
            </div>
        </SidebarProvider>
    )
}
