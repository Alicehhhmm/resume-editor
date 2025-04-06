import type { ReactNode } from 'react'

import { CollapsedWrapper } from '@/components/common'

interface RightSiderbarProps {
    children: ReactNode
}

export const RightSiderbar = ({ children }: RightSiderbarProps) => {
    return (
        <CollapsedWrapper
            collapsedWidth={0}
            expandedWidth={320}
            resizable
            position="right"
        >
            {children}
        </CollapsedWrapper>
    )
}
