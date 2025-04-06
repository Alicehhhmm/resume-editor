import type { ReactNode } from 'react'

import { CollapsedWrapper } from '@/components/common'

interface LeftSiderbarProps {
    children: ReactNode
}

export const LeftSiderbar = ({ children }: LeftSiderbarProps) => {
    return (
        <CollapsedWrapper collapsedWidth={0} resizable position="left">
            {children}
        </CollapsedWrapper>
    )
}
