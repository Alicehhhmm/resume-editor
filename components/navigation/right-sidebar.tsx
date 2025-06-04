'use client'

import type { FC, ReactNode } from 'react'

import { CollapsedWrapper } from '@/components/common'

interface RightSiderbarProps {
    hide?: boolean
    onToggle?: (collapsed: boolean) => void
    children: ReactNode
}

export const RightSiderbar: FC<RightSiderbarProps> = ({ children, hide = false, onToggle }) => {
    return (
        <CollapsedWrapper collapsedWidth={0} expandedWidth={320} resizable position="right" collapsed={hide} onCollapsedChange={onToggle}>
            {children}
        </CollapsedWrapper>
    )
}
