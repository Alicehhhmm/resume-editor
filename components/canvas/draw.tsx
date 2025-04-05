import type { ReactNode } from 'react'

type DrawProps = {
    children: ReactNode
}

// TUDO: 画布组件
// 该组件可以用于实现画图、绘制图形等功能

export const Draw = ({ children }: DrawProps) => {
    return <div>{children}</div>
}