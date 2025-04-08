import { useState } from 'react'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import { type Module } from '@/hooks/use-module-manager'

import { DragHandle } from './DragHandle'
import { ModuleActions } from './ModuleActions'
import { ModuleNameDisplay } from './ModuleNameDisplay'
import { ModuleNameEditor } from './ModuleNameEditor'

interface SortableModuleItemProps {
    module: Module
    index: number
    toggleSelect: (id: string) => void
    toggleVisible: (id: string) => void
    onRename: (id: string, newName: string) => void
    onDelete: (id: string) => void
}

// 可排序的模块项组件
export const SortableModuleItem = ({
    module,
    index,
    toggleSelect,
    toggleVisible,
    onRename,
    onDelete,
}: SortableModuleItemProps) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: module.id, disabled: module.isFixed })

    const [isEditing, setIsEditing] = useState(false)

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        zIndex: isDragging ? 1 : 0,
    }

    const handleDoubleClick = () => {
        if (!module.isFixed) {
            setIsEditing(true)
        }
    }

    const handleSave = (name: string) => {
        onRename(module.id, name)
        setIsEditing(false)
    }

    const handleCancel = () => {
        setIsEditing(false)
    }

    const isAvailable = module.group === 'available'
    const isSelected = module.group === 'selected'

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`
                bg-background border rounded-lg transition-all duration-200
                hover:shadow-sm hover:border-border/80
                ${isDragging && 'shadow-md border-primary/50'}
            `}
        >
            <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                    {!module.isFixed && (
                        <DragHandle
                            attributes={attributes}
                            listeners={listeners}
                        />
                    )}
                    {isEditing ? (
                        <ModuleNameEditor
                            name={module.name}
                            onSave={handleSave}
                            onCancel={handleCancel}
                        />
                    ) : (
                        <ModuleNameDisplay
                            name={module.name}
                            isSelected={module.isSelected}
                            isFixed={module.isFixed}
                            onDoubleClick={handleDoubleClick}
                        />
                    )}
                </div>

                {/* 编辑时不能使用：添加 */}
                {!isEditing && (
                    <ModuleActions
                        isAvailable={isAvailable}
                        isSelected={isSelected}
                        isFixed={module.isFixed}
                        isEditing={isEditing}
                        isVisible={module.isVisible}
                        onToggleSelect={() => toggleSelect(module.id)}
                        onToggleVisible={() => toggleVisible(module.id)}
                        onStartEditing={() => setIsEditing(true)}
                        onDelete={() => onDelete(module.id)}
                    />
                )}
            </div>
        </div>
    )
}
