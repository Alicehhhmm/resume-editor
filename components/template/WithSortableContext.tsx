import type { FC, ReactNode } from 'react'

import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

import type { Module } from '@/types/module'

interface WithSortableContextProps {
    modules: Module[]
    children: ReactNode
}

export const WithSortableContext: FC<WithSortableContextProps> = ({ modules, children }) => {
    return (
        <SortableContext items={modules.map((module) => module.id)} strategy={verticalListSortingStrategy}>
            {children}
        </SortableContext>
    )
}
