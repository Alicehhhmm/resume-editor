'use client'

import type { FC, ReactNode } from 'react'

import { CollapsedWrapper } from '@/components/common'

interface LeftSiderbarProps {
    hide?: boolean
    onToggle?: (collapsed: boolean) => void
    children: ReactNode
}

export const LeftSiderbar: FC<LeftSiderbarProps> = ({ children, hide = false, onToggle }) => {
    return (
        <CollapsedWrapper collapsedWidth={0} expandedWidth={320} resizable position="left" collapsed={hide} onCollapsedChange={onToggle}>
            {children}
        </CollapsedWrapper>
    )
}
