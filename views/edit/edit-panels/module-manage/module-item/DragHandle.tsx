import { GripVertical } from 'lucide-react'

import { ActionTooltip } from '@/components/ui/action-tooltip'

interface DragHandleProps {
    attributes: any
    listeners: any
}

export const DragHandle = ({ attributes, listeners }: DragHandleProps) => {
    return (
        <ActionTooltip label="拖拽排序" side="right">
            <button
                className="cursor-grab text-muted-foreground hover:text-foreground touch-none p-1 transition-colors flex-shrink-0"
                {...attributes}
                {...listeners}
            >
                <GripVertical size={14} />
            </button>
        </ActionTooltip>
    )
}
