import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible'

import { type Module } from '@/hooks/use-module-manager'

import { SortableModuleItem } from '../module-item/SortableModuleItem'
import { CollapsibleHeader } from './collapsible-header'

interface SelectedModulesProps {
    modules: Module[]
    isOpen: boolean
    onOpenChange: (open: boolean) => void
    toggleSelect: (id: string) => void
    toggleVisible: (id: string) => void
    onRename: (id: string, name: string) => void
    onDelete: (id: string) => void
}

export const SelectedModules = ({
    modules,
    isOpen,
    onOpenChange,
    toggleSelect,
    toggleVisible,
    onRename,
    onDelete,
}: SelectedModulesProps) => {
    return (
        <Collapsible open={isOpen} onOpenChange={onOpenChange} className="mb-6">
            <CollapsibleHeader
                title="已选择模块"
                count={modules.length}
                isOpen={isOpen}
                isPrimary={true}
            />

            <CollapsibleContent className="space-y-2">
                <SortableContext
                    items={modules.map((module) => module.id)}
                    strategy={verticalListSortingStrategy}
                >
                    <div className="space-y-2">
                        {modules.length > 0 ? (
                            modules.map((module, index) => (
                                <SortableModuleItem
                                    key={module.id}
                                    module={module}
                                    index={index}
                                    toggleSelect={toggleSelect}
                                    toggleVisible={toggleVisible}
                                    onRename={onRename}
                                    onDelete={onDelete}
                                />
                            ))
                        ) : (
                            <div className="text-center py-6 bg-muted/30 rounded-md">
                                <p className="text-sm text-muted-foreground">
                                    没有已选择的模块，请从可用模块中选择
                                </p>
                            </div>
                        )}
                    </div>
                </SortableContext>
            </CollapsibleContent>
        </Collapsible>
    )
}
