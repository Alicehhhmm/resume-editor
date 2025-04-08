import { Edit, Eye, EyeOff, PlusCircle, Trash } from 'lucide-react'

import { ActionTooltip } from '@/components/ui/action-tooltip'
import { Button } from '@/components/ui/button'

interface ModuleActionsProps {
    isAvailable: boolean
    isSelected: boolean
    isFixed: boolean
    isEditing: boolean
    isVisible: boolean
    onToggleSelect: () => void
    onToggleVisible: () => void
    onStartEditing: () => void
    onDelete?: () => void
}

export const ModuleActions = ({
    isAvailable,
    isSelected,
    isFixed,
    isEditing,
    isVisible,
    onToggleSelect,
    onToggleVisible,
    onStartEditing,
    onDelete,
}: ModuleActionsProps) => {
    return (
        <div className="flex items-center gap-2 flex-shrink-0">
            {/* 可用模块只显示添加按钮和编辑按钮 */}
            {isAvailable && (
                <>
                    {/* 添加按钮 */}
                    <ActionTooltip label="添加到简历" side="bottom">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={onToggleSelect}
                            className="h-7 w-7 text-muted-foreground hover:text-primary"
                        >
                            <PlusCircle size={16} />
                        </Button>
                    </ActionTooltip>

                    {/* 可用模块的编辑按钮 */}
                    {!isFixed && !isEditing && (
                        <ActionTooltip label="编辑模块名称" side="bottom">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={onStartEditing}
                                className="h-7 w-7 text-muted-foreground"
                            >
                                <Edit size={14} />
                            </Button>
                        </ActionTooltip>
                    )}
                </>
            )}

            {/* 已选择模块只显示垃圾桶图标和可见性按钮 */}
            {isSelected && (
                <>
                    {/* 可见性按钮 */}
                    <ActionTooltip
                        label={isVisible ? '隐藏模块' : '显示模块'}
                        side="bottom"
                    >
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={onToggleVisible}
                            className={`h-7 w-7 ${
                                isVisible
                                    ? 'text-emerald-500'
                                    : 'text-muted-foreground'
                            }`}
                        >
                            {isVisible ? (
                                <Eye size={14} />
                            ) : (
                                <EyeOff size={14} />
                            )}
                        </Button>
                    </ActionTooltip>

                    {/* 删除按钮 */}
                    {!isFixed && (
                        <ActionTooltip label="从简历中移除" side="bottom">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={onDelete}
                                className="h-7 w-7 text-muted-foreground hover:text-destructive"
                            >
                                <Trash size={14} />
                            </Button>
                        </ActionTooltip>
                    )}
                </>
            )}
        </div>
    )
}
