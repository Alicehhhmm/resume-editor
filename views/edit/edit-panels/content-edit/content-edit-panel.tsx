import { useEffect, useState } from 'react'

import { useModuleManager } from '@/hooks'

import type { ModuleID } from '@/types/module'

import { MODULE_COMPONENTS } from './Enums'

interface SequenceType {
    moduleId: ModuleID
    show: boolean
}

export const ContentEditPanel = () => {
    const { selectedModules } = useModuleManager()
    const [sequence, setSequence] = useState<SequenceType[]>([])

    useEffect(() => {
        // 根据 selectedModules 的顺序渲染模块
        if (selectedModules && selectedModules.length > 0) {
            setSequence(
                selectedModules.map((module) => ({
                    moduleId: module.id,
                    show: module.isVisible,
                }))
            )
        }
    }, [selectedModules])

    return (
        <div className="border p-4 rounded-md">
            <h2 className="text-xl font-semibold mb-4">内容编辑</h2>

            {sequence.length > 0 ? (
                sequence.map(({ moduleId, show }) => {
                    const ModuleComponent = MODULE_COMPONENTS[moduleId]

                    return ModuleComponent && show ? (
                        <div key={moduleId} className="mb-4">
                            <ModuleComponent />
                        </div>
                    ) : null
                })
            ) : (
                <div className="text-center py-8 text-gray-500">
                    请在模块管理中选择要编辑的模块
                </div>
            )}
        </div>
    )
}
