import Image from 'next/image'

import { SidebarHeader } from '@/components/ui/sidebar'

export const SidebarHeaderToLogo = () => {
    return (
        <SidebarHeader className="flex items-center border-b px-4 h-14">
            <div className="flex items-center gap-2 w-full min-w-[36px]">
                {/* Logo image with scaling */}
                <div className="flex-shrink-0 w-9 h-9 bg-primary/10 rounded-lg p-1.5">
                    <Image
                        src="/placeholder.svg"
                        width={24}
                        height={24}
                        alt="Logo"
                        className="text-primary"
                    />
                </div>

                {/* Title with collapse animation */}
                <div className="flex-1 overflow-hidden transition-all duration-300 ml-2">
                    <div className="flex items-baseline gap-2">
                        <span className="font-semibold text-lg truncate tracking-tight">
                            ResumeEditor
                        </span>
                        <span className="text-xs text-muted-foreground truncate">
                            v1.0.0
                        </span>
                    </div>
                </div>
            </div>
        </SidebarHeader>
    )
}
