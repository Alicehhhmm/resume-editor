import * as React from 'react'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip'

interface ActionTooltipProps {
    children: React.ReactNode
    label: string
    side?: 'top' | 'right' | 'bottom' | 'left'
}

export const ActionTooltip = ({
    children,
    label,
    side = 'bottom',
}: ActionTooltipProps) => {
    return (
        <TooltipProvider delayDuration={300}>
            <Tooltip>
                <TooltipTrigger asChild>{children}</TooltipTrigger>
                <TooltipContent side={side}>
                    <p className="text-xs">{label}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
} 