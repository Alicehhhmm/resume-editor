'use client'

import { useCallback, useState } from 'react'

import { Hand, Maximize, Minus, Plus, RotateCcw } from 'lucide-react'

import { ToolButton,TooltipProvider } from '@/components/common/tooltip-button'

import { useCanvas } from '@/hooks/use-canvas'

type ToolType = 'select' | 'hand' | 'text' | 'shape' | 'image'

export function CanvasToolbar() {
    const canvas = useCanvas()
    const [activeTool, setActiveTool] = useState<ToolType>('select')

    // 缩放控制
    const handleZoomIn = useCallback(() => {
        canvas.setZoom(Math.min(canvas.zoom + 0.1, 4))
    }, [canvas])

    const handleZoomOut = useCallback(() => {
        canvas.setZoom(Math.max(canvas.zoom - 0.1, 0.1))
    }, [canvas])

    const handleFitToScreen = useCallback(() => {
        canvas.setZoom(1)
        canvas.setPan({ x: 0, y: 0 })
    }, [canvas])

    const handleResetView = useCallback(() => {
        canvas.resetView()
    }, [canvas])

    return (
        <>
            {/* 底部工具栏 - 缩放控制 */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-0.5 bg-white rounded-md shadow-md border p-1 z-10 text-sm">
                <TooltipProvider>
                    <ToolButton tooltip="缩小 (Ctrl+-)" onClick={handleZoomOut}>
                        <Minus className="size-3.5" />
                    </ToolButton>

                    <div className="px-2 text-xs font-medium tabular-nums select-none">
                        {Math.round(canvas.zoom * 100)}%
                    </div>

                    <ToolButton tooltip="放大 (Ctrl++)" onClick={handleZoomIn}>
                        <Plus className="size-3.5" />
                    </ToolButton>

                    <span className="mx-2 h-full min-h-3 w-[0.5px] bg-neutral-200" />

                    <ToolButton
                        tooltip="适应屏幕 (Shift+1)"
                        onClick={handleFitToScreen}
                    >
                        <Maximize className="size-3.5" />
                    </ToolButton>

                    <ToolButton
                        tooltip="重置视图 (Shift+0)"
                        onClick={handleResetView}
                    >
                        <RotateCcw className="size-3.5" />
                    </ToolButton>

                    <ToolButton
                        tooltip="抓手工具 (H)"
                        active={activeTool === 'hand'}
                        onClick={() => setActiveTool('hand')}
                    >
                        <Hand className="size-3.5" />
                    </ToolButton>
                </TooltipProvider>
            </div>
        </>
    )
}
