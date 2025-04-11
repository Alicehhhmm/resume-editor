'use client'

import { Suspense } from 'react'

import { ErrorBoundary } from 'react-error-boundary'

import { Draw as CanvasEditor } from '@/components/canvas/draw'
import { CanvasToolbar } from '@/components/canvas/tools'
import { Loading } from '@/components/common'

import { DrawViewError } from './draw-error'
import { TemplateRenderer } from './template-renderer'

export const DrawView = () => {
    return (
        <ErrorBoundary fallback={<DrawViewError />}>
            <Suspense fallback={<Loading />}>
                <DrawViewContent />
            </Suspense>
        </ErrorBoundary>
    )
}

const DrawViewContent = () => {
    return (
        <div className="size-full relative bg-white overflow-hidden">
            {/* 工具栏组件 */}
            <CanvasToolbar />

            {/* 主画布编辑器 */}
            <CanvasEditor>
                {/* 渲染简历模板 */}
                <TemplateRenderer />
                {/* TODO: 渲染自由添加的元素,暂时不实现 */}
            </CanvasEditor>
        </div>
    )
}
