'use client'

import type { CSSProperties, ReactNode } from 'react'
import { memo, useCallback, useEffect, useRef, useState } from 'react'

import { ChevronLeft, ChevronRight, GripVertical } from 'lucide-react'

import { cn } from '@/lib/utils'

import { Button } from '@/components/ui/button'

// 预设常量
const DEFAULT_COLLAPSED_WIDTH = 64
const DEFAULT_EXPANDED_WIDTH = 320
const MIN_WIDTH = 160
const MAX_WIDTH = 440
const ANIMATION_DURATION = 300
const THROTTLE_INTERVAL = 16 // 约60fps
const ANIMATION_EASING = 'cubic-bezier(0.4, 0, 0.2, 1)'

interface CollapsedWrapperProps {
    /**
     * 受控模式下的折叠状态
     */
    collapsed?: boolean
    /**
     * 受控模式下的当前宽度
     */
    width?: number
    /**
     * 默认折叠状态（非受控模式）
     * @default false
     */
    defaultCollapsed?: boolean
    /**
     * 侧边栏位置
     * @default 'left'
     */
    position?: 'left' | 'right'
    /**
     * 启用拖拽调整宽度
     * @default false
     */
    resizable?: boolean
    /**
     * 折叠后的宽度
     * @default 64
     */
    collapsedWidth?: number
    /**
     * 展开后的初始宽度
     * @default 320
     */
    expandedWidth?: number
    /**
     * 自定义样式类名
     */
    className?: string
    /**
     * 自定义内联样式
     */
    style?: CSSProperties
    /**
     * 折叠状态变化回调
     */
    onCollapsedChange?: (collapsed: boolean) => void
    /**
     * 宽度变化回调
     */
    onWidthChange?: (width: number) => void
    /**
     * 动画完成回调
     */
    onAnimationComplete?: () => void
    /**
     * 被包裹的内容
     */
    children: ReactNode
}

export const CollapsedWrapper = memo(
    ({
        children,
        resizable = false,
        position = 'left',
        collapsed: controlledCollapsed,
        width: controlledWidth,
        defaultCollapsed = false,
        collapsedWidth = DEFAULT_COLLAPSED_WIDTH,
        expandedWidth = DEFAULT_EXPANDED_WIDTH,
        className,
        style,
        onCollapsedChange,
        onWidthChange,
        onAnimationComplete,
    }: CollapsedWrapperProps) => {
        // Refs
        const sidebarRef = useRef<HTMLDivElement>(null)
        const contentRef = useRef<HTMLDivElement>(null)
        const animationFrameId = useRef<number>(null)
        const lastUpdateTime = useRef<number>(0)
        const dragStartX = useRef<number>(0)
        const dragStartWidth = useRef<number>(0)
        const animationTimeoutId = useRef<NodeJS.Timeout | null>(null)

        // States
        const [internalCollapsed, setInternalCollapsed] =
            useState(defaultCollapsed)
        const [internalWidth, setInternalWidth] = useState(expandedWidth)
        const [isResizing, setIsResizing] = useState(false)
        const [isAnimating, setIsAnimating] = useState(false)

        // Derived states
        const isControlled = controlledCollapsed !== undefined
        const collapsed = isControlled ? controlledCollapsed : internalCollapsed
        const width = controlledWidth ?? internalWidth
        const currentWidth = collapsed
            ? collapsedWidth
            : Math.max(width, MIN_WIDTH)

        // 更新宽度的函数
        const updateWidth = useCallback(
            (newWidth: number) => {
                const clampedWidth = Math.min(
                    MAX_WIDTH,
                    Math.max(MIN_WIDTH, newWidth)
                )

                // 直接操作DOM实现即时更新
                const sidebarElement = sidebarRef.current
                if (sidebarElement) {
                    sidebarElement.style.width = `${clampedWidth}px`
                    sidebarElement.style.minWidth = `${clampedWidth}px`
                }

                // 异步更新状态
                if (animationFrameId.current) {
                    cancelAnimationFrame(animationFrameId.current)
                }

                animationFrameId.current = requestAnimationFrame(() => {
                    if (!isControlled) setInternalWidth(clampedWidth)
                    onWidthChange?.(clampedWidth)
                })
            },
            [isControlled, onWidthChange]
        )

        // 拖拽处理逻辑
        const handleDragStart = useCallback(
            (e: MouseEvent | TouchEvent) => {
                const clientX =
                    'touches' in e ? e.touches[0].clientX : e.clientX
                dragStartX.current = clientX
                dragStartWidth.current = width
                const sidebarElement = sidebarRef.current

                const handleDragging = (e: MouseEvent | TouchEvent) => {
                    const now = Date.now()
                    if (now - lastUpdateTime.current < THROTTLE_INTERVAL) return // 60fps节流
                    lastUpdateTime.current = now

                    const currentClientX =
                        'touches' in e ? e.touches[0].clientX : e.clientX
                    const delta =
                        position === 'left'
                            ? currentClientX - dragStartX.current
                            : dragStartX.current - currentClientX
                    const newWidth = dragStartWidth.current + delta

                    updateWidth(newWidth)
                }

                const handleDragEnd = () => {
                    window.removeEventListener(
                        'mousemove',
                        handleDragging as EventListener
                    )
                    window.removeEventListener('mouseup', handleDragEnd)
                    window.removeEventListener(
                        'touchmove',
                        handleDragging as EventListener
                    )
                    window.removeEventListener('touchend', handleDragEnd)
                    document.body.style.removeProperty('cursor')
                    document.body.style.removeProperty('user-select')
                    setIsResizing(false)

                    // 同步最终状态
                    if (sidebarElement) {
                        const finalWidth = parseFloat(
                            sidebarElement.style.width
                        )
                        setInternalWidth(finalWidth)
                        onWidthChange?.(finalWidth)
                    }
                }

                window.addEventListener(
                    'mousemove',
                    handleDragging as EventListener
                )
                window.addEventListener('mouseup', handleDragEnd)
                window.addEventListener(
                    'touchmove',
                    handleDragging as EventListener
                )
                window.addEventListener('touchend', handleDragEnd)
                document.body.style.cursor = 'ew-resize'
                document.body.style.userSelect = 'none'
                setIsResizing(true)
            },
            [width, position, updateWidth]
        )

        // 键盘处理
        const handleKeyDown = useCallback(
            (e: React.KeyboardEvent) => {
                if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                    e.preventDefault()
                    const direction = e.key === 'ArrowLeft' ? -1 : 1
                    const adjustment = e.shiftKey ? 20 : 5 // 按住Shift键时调整幅度更大
                    const newWidth = width + direction * adjustment
                    updateWidth(newWidth)
                } else if (e.key === 'Escape' && isResizing) {
                    // 取消拖拽
                    document.body.style.removeProperty('cursor')
                    document.body.style.removeProperty('user-select')
                    setIsResizing(false)
                }
            },
            [width, isResizing, updateWidth]
        )

        // 折叠/展开切换
        const toggleCollapse = useCallback(() => {
            const newCollapsed = !collapsed
            setIsAnimating(true)

            // 更新内部状态
            if (!isControlled) {
                setInternalCollapsed(newCollapsed)
                if (!newCollapsed && controlledWidth === undefined) {
                    setInternalWidth((prev) => Math.max(prev, MIN_WIDTH))
                }
            }

            // 触发回调
            onCollapsedChange?.(newCollapsed)

            // 设置动画完成回调
            if (animationTimeoutId.current) {
                clearTimeout(animationTimeoutId.current)
            }

            animationTimeoutId.current = setTimeout(() => {
                setIsAnimating(false)
                onAnimationComplete?.()
            }, ANIMATION_DURATION)
        }, [
            collapsed,
            isControlled,
            controlledWidth,
            onCollapsedChange,
            onAnimationComplete,
        ])

        // 过渡动画优化
        useEffect(() => {
            const sidebarElement = sidebarRef.current
            if (!sidebarElement) return

            // 拖拽时禁用过渡
            sidebarElement.style.transition = isResizing
                ? 'none'
                : `width ${ANIMATION_DURATION}ms ${ANIMATION_EASING}`
        }, [isResizing])

        // 内容区域动画优化
        useEffect(() => {
            const contentElement = contentRef.current
            if (!contentElement) return

            // 设置内容区域的过渡效果
            contentElement.style.transition = `opacity ${ANIMATION_DURATION}ms ${ANIMATION_EASING}, transform ${ANIMATION_DURATION}ms ${ANIMATION_EASING}`

            // 根据折叠状态设置变换
            if (collapsed) {
                contentElement.style.transform =
                    position === 'left'
                        ? 'translateX(-10px)'
                        : 'translateX(10px)'
            } else {
                contentElement.style.transform = 'translateX(0)'
            }
        }, [collapsed, position])

        // 清理动画帧和定时器
        useEffect(
            () => () => {
                if (animationFrameId.current) {
                    cancelAnimationFrame(animationFrameId.current)
                }
                if (animationTimeoutId.current) {
                    clearTimeout(animationTimeoutId.current)
                }
            },
            []
        )

        // 动态参数
        const borderClass = position === 'left' ? 'border-r' : 'border-l'
        const ChevronIcon = position === 'left' ? ChevronLeft : ChevronRight
        const rotationClass = collapsed
            ? position === 'left'
                ? 'rotate-180'
                : '-rotate-180'
            : 'rotate-0'

        return (
            <aside
                ref={sidebarRef}
                className={cn(
                    'relative h-full flex flex-col bg-background',
                    'will-change-[width]', // 启用硬件加速
                    borderClass,
                    collapsed && 'border-0',
                    isResizing && 'select-none',
                    className
                )}
                style={{
                    width: currentWidth,
                    minWidth: currentWidth,
                    ...style,
                }}
                aria-expanded={!collapsed}
                tabIndex={0}
                onKeyDown={handleKeyDown}
            >
                {/* 拖拽手柄 */}
                {resizable && !collapsed && (
                    <div
                        className={cn(
                            'absolute top-0 h-full z-20',
                            'hover:bg-primary/10 active:bg-primary/20',
                            'transition-colors cursor-col-resize',
                            'transform active:scale-x-125 origin-center',
                            position === 'left'
                                ? '-right-0.5 w-1 '
                                : '-left-0.5 w-1'
                        )}
                        onMouseDown={(e) => {
                            e.preventDefault()
                            handleDragStart(e.nativeEvent)
                        }}
                        onTouchStart={(e) => {
                            e.preventDefault()
                            handleDragStart(e.nativeEvent)
                        }}
                        style={{
                            transition:
                                'transform 150ms cubic-bezier(0.4, 0, 0.2, 1)',
                        }}
                        role="slider"
                        aria-label="调整侧边栏宽度"
                        aria-valuenow={width}
                        aria-valuemin={MIN_WIDTH}
                        aria-valuemax={MAX_WIDTH}
                    >
                        <GripVertical className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    </div>
                )}

                {/* 折叠按钮 */}
                <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                        'absolute top-6 size-8 rounded-full p-1.5 shadow-sm z-10',
                        'hover:bg-accent hover:text-accent-foreground',
                        'transition-transform duration-300',
                        position === 'left'
                            ? '-right-4 translate-x-1/2'
                            : '-left-4 -translate-x-1/2'
                    )}
                    onClick={toggleCollapse}
                    aria-label={collapsed ? '展开侧边栏' : '折叠侧边栏'}
                    disabled={isAnimating}
                >
                    <ChevronIcon
                        className={cn(
                            'size-5 transition-transform',
                            rotationClass
                        )}
                    />
                </Button>

                {/* 内容容器 */}
                <div className="flex-1 overflow-hidden relative">
                    <div
                        ref={contentRef}
                        className={cn(
                            'absolute inset-0',
                            collapsed
                                ? 'opacity-0 pointer-events-none'
                                : 'opacity-100'
                        )}
                        style={{
                            minWidth: expandedWidth,
                            willChange: 'opacity, transform',
                        }}
                    >
                        {children}
                    </div>
                </div>
            </aside>
        )
    }
)

CollapsedWrapper.displayName = 'CollapsedWrapper'

export default CollapsedWrapper
