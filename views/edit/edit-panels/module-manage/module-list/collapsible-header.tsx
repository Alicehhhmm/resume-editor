import { ChevronDown, ChevronRight } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CollapsibleTrigger } from '@/components/ui/collapsible'

interface CollapsibleHeaderProps {
    title: string
    count: number
    isOpen: boolean
    isPrimary?: boolean
}

export const CollapsibleHeader = ({
    title,
    count,
    isOpen,
    isPrimary = false,
}: CollapsibleHeaderProps) => {
    return (
        <div className="flex items-center justify-between mb-2 group">
            <h3 className="text-sm font-medium flex items-center">
                {title}
                <Badge
                    className={`ml-2 text-[10px] ${
                        isPrimary ? 'bg-primary' : 'bg-muted-foreground'
                    }`}
                >
                    {count}
                </Badge>
            </h3>
            <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm" className="p-0 h-6 w-6 ml-2">
                    {isOpen ? (
                        <ChevronDown
                            size={16}
                            className="transition-transform duration-200"
                        />
                    ) : (
                        <ChevronRight
                            size={16}
                            className="transition-transform duration-200"
                        />
                    )}
                </Button>
            </CollapsibleTrigger>
        </div>
    )
}
