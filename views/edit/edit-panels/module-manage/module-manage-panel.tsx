import { useState } from 'react'

import { Plus } from 'lucide-react'

import {
    closestCenter,
    DndContext,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core'
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable'

import { Button } from '@/components/ui/button'

import { useModuleManager } from '@/hooks/use-module-manager'

import { CreateModuleDialog } from './create-module'
import { AvailableModules } from './module-list/AvailableModules'
import { SelectedModules } from './module-list/SelectedModules'

export const ModuleManagePanel = () => {
    // 新增模块对话框状态
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

    // 分组折叠状态
    const [isSelectedOpen, setIsSelectedOpen] = useState(true)
    const [isAvailableOpen, setIsAvailableOpen] = useState(true)

    // 使用自定义hooks管理模块状态
    const {
        selectedModules,
        availableModules,
        handleDragEnd,
        toggleSelect,
        toggleVisible,
        moveToAvailable,
        renameModule,
        deleteModule,
        addCustomModule,
    } = useModuleManager()

    // 设置传感器
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8, // 至少移动8像素才会触发拖拽
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    )

    return (
        <div className="bg-background">
            <div className="flex flex-col border-b bg-background/95 backdrop-blur-sm sticky top-0 z-10 space-y-1">
                <div className="flex justify-between items-center px-4">
                    <h2 className="text-lg font-medium">模块管理</h2>
                    <Button
                        onClick={() => setIsAddDialogOpen(true)}
                        size="sm"
                        className="flex items-center gap-1"
                    >
                        <span>自定义模块</span>
                        <Plus size={16} />
                    </Button>
                </div>
                <p className="text-sm text-muted-foreground px-4 leading-8">
                    通过选择、排序和自定义模块定制您的简历内容
                </p>
            </div>

            <div className="p-4 space-y-6">
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                >
                    {/* 已选择的模块组 */}
                    <SelectedModules
                        modules={selectedModules}
                        isOpen={isSelectedOpen}
                        onOpenChange={setIsSelectedOpen}
                        toggleSelect={toggleSelect}
                        toggleVisible={toggleVisible}
                        onRename={renameModule}
                        onDelete={moveToAvailable}
                    />

                    {/* 可用模块组 */}
                    <AvailableModules
                        modules={availableModules}
                        isOpen={isAvailableOpen}
                        onOpenChange={setIsAvailableOpen}
                        toggleSelect={toggleSelect}
                        toggleVisible={toggleVisible}
                        onRename={renameModule}
                        onDelete={deleteModule}
                    />
                </DndContext>

                <div className="bg-muted/30 rounded-lg p-4 text-center">
                    <p className="text-sm text-muted-foreground">
                        已选择的模块将显示在简历中，可通过拖拽调整顺序。双击模块名称可编辑。
                    </p>
                </div>
            </div>

            {/* 添加自定义模块对话框 */}
            <CreateModuleDialog
                isOpen={isAddDialogOpen}
                onOpenChange={setIsAddDialogOpen}
                onAddModule={addCustomModule}
            />
        </div>
    )
}
