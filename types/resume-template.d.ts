type Category = 'all' | 'simple' | 'canon' | 'creativity' | 'specialty'

type Template = {
    id: string
    title: string
    description: string
    category: Category
    thumbnail: string
}

type TemplateCardProps = {
    id: string
    title: string
    description: string
    thumbnail: string
    isActive?: boolean
    onClick?: () => void
}

type TemplateGridProps = {
    category: Category
    selectedId?: string
    onSelect: (template: Template) => void
}

export type { Category, Template, TemplateCardProps, TemplateGridProps }