import type { FC, ReactNode } from 'react'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import { Module } from '@/types/module'

interface SortableItemProps {
    module: Module
    children: ReactNode
}

export const WithSortableItem: FC<SortableItemProps> = ({ module, children }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: module.id })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    }

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            {children}
        </div>
    )
}
