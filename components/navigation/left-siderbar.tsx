import type { ReactNode } from 'react'

import { CollapsedWrapper } from '@/components/common'

// 模板栏目组件

// 编辑栏目组件

interface LeftSiderbarProps {
    children: ReactNode
}

export const LeftSiderbar = ({ children }: LeftSiderbarProps) => {
    // 如果路由时 /edit/template 测显示 模板选择栏目
    // 否则 默认情况下显示 /edit 编辑页栏目

    return (
        <div>
            <CollapsedWrapper collapsedWidth={0} resizable position="left">
                LeftSiderbar
                {children}
            </CollapsedWrapper>
        </div>
    )
}
