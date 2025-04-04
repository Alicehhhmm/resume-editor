import TemplateCard from './template-card'

import type { Category, Template } from '@/types/resume-template'

import { ScrollArea } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'

interface TemplateGridProps {
    category: Category
    selectedId?: string
    onSelect: (template: Template) => void
    templates: Record<Category, Template[]>
    children?: React.ReactNode
}

export const TemplateGrid = ({
    category,
    selectedId,
    onSelect,
    templates,
    children,
}: TemplateGridProps) => {
    const items =
        category === 'all'
            ? Object.values(templates).flat()
            : templates[category as Category] || []

    return (
        <div className="h-full">
            <ScrollArea className="h-[calc(100vh-220px)]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                    {items.length > 0
                        ? items.map((template) => (
                              <TemplateCard
                                  key={template.id}
                                  {...template}
                                  isActive={selectedId === template.id}
                                  onClick={() => onSelect(template)}
                              />
                          ))
                        : Array.from({ length: 6 }).map((_, index) => (
                              <Skeleton key={index} />
                          ))}
                </div>
                {children}
            </ScrollArea>
        </div>
    )
}

export default TemplateGrid
