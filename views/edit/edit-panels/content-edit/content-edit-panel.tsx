import { Suspense, useCallback } from 'react'
import type { FC } from 'react'

import { useModuleTemplate, useResumeTemplate } from '@/hooks'
import { ErrorBoundary } from 'react-error-boundary'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

import { MODULE_COMPONENTS } from './Enums'

export const ContentEditPanel: FC = () => (
    <ErrorBoundary fallback={<ErrorFallback />}>
        <Suspense fallback={<SkeletonLayout />}>
            <EditPanelContent />
        </Suspense>
    </ErrorBoundary>
)

const EditPanelContent: FC = () => {
    const { visibleModules, templateTitle } = useModuleTemplate()

    return (
        <Card className="w-full rounded-none border-0">
            <CardHeader className="pb-3">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                    <div>{templateTitle && <CardDescription className="text-sm">正在编辑: {templateTitle}</CardDescription>}</div>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                {visibleModules.length > 0 ? (
                    <div className="space-y-8">
                        {visibleModules.map((module, index) => {
                            const ModuleComponent = MODULE_COMPONENTS[module.id]

                            if (!ModuleComponent) return <EmptyPrompt key={index} />

                            return (
                                <Card key={module.id} className="rounded-none border-0">
                                    <CardContent className="">
                                        <ModuleComponent />
                                    </CardContent>
                                </Card>
                            )
                        })}
                    </div>
                ) : (
                    <div className="py-12 text-center space-y-6">
                        <div className="space-y-3 mx-auto max-w-md">
                            <p className="text-muted-foreground">请在模块管理中选择要编辑的模块</p>
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

// 辅助组件
const EmptyPrompt: FC = () => (
    <div className="py-12 text-center text-muted-foreground">
        <p>当前模块组件未开放</p>
    </div>
)

const ErrorFallback: FC = () => (
    <div className="p-4 bg-destructive/10 text-destructive rounded-lg">内容编辑面板加载失败，请尝试刷新页面</div>
)

const SkeletonLayout: FC = () => (
    <Card className="w-full shadow-sm">
        <CardHeader className="pb-3">
            <div className="space-y-2">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-4 w-48" />
            </div>
        </CardHeader>
        <CardContent className="space-y-6">
            {[1, 2, 3].map((i) => (
                <Card key={i} className="shadow-sm">
                    <CardContent className="p-4 pt-5 space-y-4">
                        <Skeleton className="h-6 w-1/4" />
                        <Skeleton className="h-20 w-full" />
                        <Skeleton className="h-8 w-1/3" />
                    </CardContent>
                </Card>
            ))}
        </CardContent>
    </Card>
)
