import React from 'react'

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

import { useModuleTemplate } from '@/hooks'

import { MODULE_COMPONENTS } from './Enums'

/**
 * 内容编辑面板组件
 * @description 根据选择的模块，渲染对应的编辑组件
 */
export const ContentEditPanel: React.FC = () => {
    const {
        visibleModules,
        templateTitle,
        getModuleContent,
        updateModule,
        hasModuleContent,
    } = useModuleTemplate()

    return (
        <Card className="w-full shadow-sm">
            <CardHeader className="pb-3">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                    <div>
                        <CardTitle className="text-xl">内容编辑</CardTitle>
                        {templateTitle && (
                            <CardDescription className="text-sm">
                                正在编辑: {templateTitle}
                            </CardDescription>
                        )}
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                {visibleModules.length > 0 ? (
                    <div className="space-y-8">
                        {visibleModules.map((module) => {
                            // 获取对应的组件
                            const ModuleComponent = MODULE_COMPONENTS[module.id]

                            if (!ModuleComponent) return null

                            // 获取模块内容
                            const moduleContent = getModuleContent(module.id)

                            return (
                                <Card key={module.id} className="shadow-sm">
                                    <CardContent className="p-4 pt-5">
                                        <ModuleComponent
                                            data={moduleContent}
                                            onChange={(content) =>
                                                updateModule(module.id, content)
                                            }
                                        />
                                    </CardContent>
                                </Card>
                            )
                        })}
                    </div>
                ) : (
                    <div className="py-12 text-center space-y-6">
                        <div className="space-y-3 mx-auto max-w-md">
                            <p className="text-muted-foreground">
                                请在模块管理中选择要编辑的模块
                            </p>
                            <div className="space-y-2">
                                <Skeleton className="h-8 w-full" />
                                <Skeleton className="h-20 w-full" />
                                <Skeleton className="h-8 w-3/4 mx-auto" />
                            </div>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
