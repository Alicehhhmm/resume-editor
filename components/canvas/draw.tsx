'use client'

import { type ReactNode, useCallback, useEffect, useRef, useState } from 'react'

import { PAPER_SIZES } from '@/types/canvas'

import { useCanvas } from '@/hooks/use-canvas'

type DrawProps = {
    children?: ReactNode
}

export function Draw({ children }: DrawProps) {
    const canvas = useCanvas()
    const canvasRef = useRef<HTMLDivElement>(null)
    const viewportRef = useRef<HTMLDivElement>(null)
    const [isDragging, setIsDragging] = useState(false)
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
    const [spaceKeyDown, setSpaceKeyDown] = useState(false)

    // 监听空格键按下/松开事件，实现临时切换到拖动模式的功能
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.code === 'Space' && !e.repeat) {
                setSpaceKeyDown(true)
                if (canvasRef.current) {
                    canvasRef.current.style.cursor = 'grab'
                }
            }
        }

        const handleKeyUp = (e: KeyboardEvent) => {
            if (e.code === 'Space') {
                setSpaceKeyDown(false)
                if (canvasRef.current && !isDragging) {
                    canvasRef.current.style.cursor = 'default'
                }
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        window.addEventListener('keyup', handleKeyUp)

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
            window.removeEventListener('keyup', handleKeyUp)
        }
    }, [isDragging, canvas])

    // 处理画布拖拽开始
    const handleMouseDown = useCallback(
        (e: React.MouseEvent) => {
            // 获取鼠标相对于画布的坐标
            const rect = canvasRef.current?.getBoundingClientRect()
            if (!rect) return

            // 如果按下了空格键，或者是画布背景被点击
            if (
                spaceKeyDown ||
                e.target === e.currentTarget ||
                e.target === viewportRef.current
            ) {
                e.preventDefault() // 防止选择文本
                setIsDragging(true)
                setDragStart({ x: e.clientX, y: e.clientY })

                // 修改鼠标样式为抓取状态
                if (canvasRef.current) {
                    canvasRef.current.style.cursor = 'grabbing'
                }

                // 点击空白区域时清除选择
                if (!spaceKeyDown) {
                    canvas.clearSelection()
                }
            }
        },
        [spaceKeyDown, canvas]
    )

    // 处理画布拖拽
    const handleMouseMove = useCallback(
        (e: React.MouseEvent) => {
            if (!isDragging) return

            const dx = e.clientX - dragStart.x
            const dy = e.clientY - dragStart.y

            canvas.setPan({
                x: canvas.pan.x + dx / canvas.zoom,
                y: canvas.pan.y + dy / canvas.zoom,
            })

            setDragStart({ x: e.clientX, y: e.clientY })
        },
        [isDragging, dragStart, canvas]
    )

    // 处理画布拖拽结束
    const handleMouseUp = useCallback(() => {
        if (isDragging) {
            setIsDragging(false)

            // 根据空格键是否按下决定鼠标样式
            if (canvasRef.current) {
                canvasRef.current.style.cursor = spaceKeyDown
                    ? 'grab'
                    : 'default'
            }
        }
    }, [isDragging, spaceKeyDown])

    // 处理滚轮缩放，实现Figma类似的平滑缩放体验
    const handleWheel = useCallback(
        (e: React.WheelEvent) => {
            // 阻止默认滚动行为
            e.preventDefault()

            // 计算缩放因子
            const delta = e.deltaY * -0.002
            const newZoom = Math.max(
                0.1,
                Math.min(4, canvas.zoom * (1 + delta))
            )

            // 获取鼠标在画布中的位置
            const rect = canvasRef.current?.getBoundingClientRect()
            if (!rect) return

            // 鼠标相对于画布中心的位置
            const mouseX = e.clientX - rect.left - rect.width / 2
            const mouseY = e.clientY - rect.top - rect.height / 2

            // 旧的世界坐标下鼠标位置
            const oldWorldX = mouseX / canvas.zoom - canvas.pan.x
            const oldWorldY = mouseY / canvas.zoom - canvas.pan.y

            // 新的世界坐标下鼠标位置
            const newWorldX = mouseX / newZoom - canvas.pan.x
            const newWorldY = mouseY / newZoom - canvas.pan.y

            // 更新缩放和平移，使鼠标位置保持不变
            canvas.setZoom(newZoom)
            canvas.setPan({
                x: canvas.pan.x + (newWorldX - oldWorldX),
                y: canvas.pan.y + (newWorldY - oldWorldY),
            })
        },
        [canvas]
    )

    return (
        <div
            id="canvas-html"
            ref={canvasRef}
            className="size-full relative overflow-hidden bg-[#f8f9fa] select-none"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onWheel={handleWheel}
        >
            {/* 背景网格 */}
            <div className="absolute inset-0 bg-[#f8f9fa] bg-grid-pattern pointer-events-none" />

            {/* 画布固定模板元素 */}
            <div
                id="template-viewport-container"
                ref={viewportRef}
                className="absolute inset-0 flex items-center justify-center"
                style={{
                    transform: `scale(${canvas.zoom}) translate(${canvas.pan.x}px, ${canvas.pan.y}px)`,
                    transformOrigin: 'center',
                    willChange: 'transform',
                    width: `${PAPER_SIZES.A4.width}px`,
                    height: `${PAPER_SIZES.A4.height}px`,
                }}
                onClick={(e) => {
                    e.stopPropagation()
                }}
                onDoubleClick={() => {}}
            >
                <div className="relative">{children}</div>
            </div>
        </div>
    )
}
