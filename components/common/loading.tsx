import React from 'react'

import { cn } from '@/lib/utils'

type LoadingSize = 'sm' | 'md' | 'lg' | 'xl' | number
type LoadingColor = 'primary' | 'secondary' | 'white' | string

interface LoadingProps {
    /**
     * 加载指示器尺寸
     * @default 'md'
     */
    size?: LoadingSize
    /**
     * 加载器颜色（支持 Tailwind 颜色类或 HEX 值）
     * @default 'primary'
     */
    color?: LoadingColor
    /**
     * 是否显示加载文本
     * @default false
     */
    withText?: boolean
    /**
     * 自定义加载提示文本
     * @default 'Loading...'
     */
    text?: string
    /**
     * 外层容器自定义类名
     */
    className?: string
    /**
     * 背景层透明度（0-100）
     * @default 70
     */
    backdropOpacity?: number
}

const sizeMap: Record<LoadingSize, number> = {
    sm: 24,
    md: 32,
    lg: 48,
    xl: 64,
}

const colorMap: Record<LoadingColor, string> = {
    primary: 'text-blue-500',
    secondary: 'text-gray-500/60',
    white: 'text-white',
}

export const Loading: React.FC<LoadingProps> = ({
    size = 'md',
    color = 'secondary',
    withText = false,
    text = 'Loading...',
    className,
    backdropOpacity = 70,
}) => {
    // 计算实际尺寸
    const calculatedSize = typeof size === 'string' ? sizeMap[size] : size

    // 处理颜色类名
    const colorClass = colorMap[color] || color

    // 创建动态背景透明度
    const backdropClass = `bg-gray-900/${backdropOpacity}`

    return (
        <div
            className={cn(
                'fixed inset-0 flex flex-col items-center justify-center z-50',
                backdropClass,
                className
            )}
            role="status"
            aria-live="polite"
            aria-label={withText ? undefined : text}
        >
            <svg
                className={cn('animate-spin', colorClass)}
                width={calculatedSize}
                height={calculatedSize}
                viewBox="0 0 38 38"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <linearGradient
                        x1="8.042%"
                        y1="0%"
                        x2="65.682%"
                        y2="23.865%"
                        id="a"
                    >
                        <stop
                            stopColor="currentColor"
                            stopOpacity="0"
                            offset="0%"
                        />
                        <stop
                            stopColor="currentColor"
                            stopOpacity=".631"
                            offset="63.146%"
                        />
                        <stop stopColor="currentColor" offset="100%" />
                    </linearGradient>
                </defs>
                <g fill="none" fillRule="evenodd">
                    <g transform="translate(1 1)">
                        <path
                            d="M36 18c0-9.94-8.06-18-18-18"
                            stroke="url(#a)"
                            strokeWidth="4"
                            strokeLinecap="round"
                        />
                        <circle cx="36" cy="18" r="1" fill="currentColor" />
                    </g>
                </g>
            </svg>

            {withText && (
                <p
                    className={cn('mt-4 text-sm font-medium', colorClass)}
                    aria-hidden="true"
                >
                    {text}
                </p>
            )}
        </div>
    )
}
