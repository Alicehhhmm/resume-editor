'use client'

import type { ReactNode } from 'react'
import { HeaderBar, LeftSiderbar, RightSiderbar } from '@/components/navigation'

interface EditorLayoutProps {
    children: ReactNode
}

export default function EditorLayout({ children }: EditorLayoutProps) {
    return (
        <div className='h-screen flex flex-col bg-background'>
            {/* Header */}
            <HeaderBar />

            {/* Main content */}
            <div className='flex-1 flex overflow-hidden'>
                {/* Left sidebar - Template selection */}
                <LeftSiderbar />

                {/* Main content area - Resume preview */}
                <div className='flex-1 overflow-auto p-6 bg-[#f8f9fa] dark:bg-gray-900'>
                    <div className='max-w-[850px] mx-auto'>{children}</div>
                </div>

                {/* Right sidebar - Content editing */}
                <RightSiderbar />
            </div>
        </div>
    )
}
