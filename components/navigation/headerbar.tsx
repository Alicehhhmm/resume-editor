'use client'

import { useRouter } from 'next/navigation'

import { Eye } from 'lucide-react'

import { ThemeToggleBtn } from '@/components/common'
import { Button } from '@/components/ui/button'

export const HeaderBar = () => {
    const router = useRouter()

    const handlePreviewClick = () => {
        router.push('/preview')
    }

    return (
        <div>
            <header className="border-b bg-background/80 dark:bg-background backdrop-blur-sm z-50 h-14 flex items-center px-4">
                <div className="flex-1 flex items-center">
                    <h1 className="text-lg font-semibold">Resume Builder</h1>
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        onClick={handlePreviewClick}
                        size="sm"
                        variant="outline"
                    >
                        <Eye size={16} className="mr-2" />
                    </Button>
                    <ThemeToggleBtn />
                </div>
            </header>
        </div>
    )
}
