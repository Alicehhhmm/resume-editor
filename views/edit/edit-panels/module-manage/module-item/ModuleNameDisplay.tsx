import { Badge } from '@/components/ui/badge'

interface ModuleNameDisplayProps {
    name: string
    isSelected: boolean
    isFixed: boolean
    onDoubleClick: () => void
}

export const ModuleNameDisplay = ({
    name,
    isSelected,
    isFixed,
    onDoubleClick,
}: ModuleNameDisplayProps) => {
    return (
        <div
            className="flex flex-col flex-1 min-w-0"
            onDoubleClick={onDoubleClick}
        >
            <div className="flex items-center gap-1.5">
                <span
                    className={`font-medium text-sm truncate ${
                        isSelected ? 'text-primary' : 'text-foreground'
                    }`}
                >
                    {name}
                </span>
                {isFixed && (
                    <Badge
                        variant="secondary"
                        className="text-[10px] px-1 py-0 h-4 flex-shrink-0"
                    >
                        固定
                    </Badge>
                )}
            </div>
            <span className="text-[10px] text-muted-foreground mt-0.5 truncate">
                {isSelected ? '已添加到简历' : '点击添加按钮添加到简历'}
            </span>
        </div>
    )
} 