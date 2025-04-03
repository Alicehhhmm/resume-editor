import { useEffect } from 'react'

import { Button } from '@/components/ui/button'

import { useIntersectionObserver } from '@/hooks'

/**
 * 无限滚动加载组件，支持自动触发与手动加载两种模式
 *
 * @param {Object} props - 组件配置项
 * @param {boolean} [props.isManual=false] - 是否禁用自动加载，启用手动点击加载模式
 * @param {boolean} props.hasNextPage - 是否存在后续分页数据
 * @param {boolean} props.isFetchingNextPage - 是否正在加载下一页数据
 * @param {() => void} props.fetchNextPage - 加载下一页数据的回调函数
 *
 * @example
 * // 自动加载模式
 * <InfiniteScroll
 *   hasNextPage={hasNextPage}
 *   isFetchingNextPage={isLoading}
 *   fetchNextPage={fetchNext}
 * />
 */
interface InfiniteScrollProps {
    isManual?: boolean
    hasNextPage?: boolean
    isFetchingNextPage: boolean
    fetchNextPage: () => void
}

export const InfiniteScroll = ({
    isManual = false,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
}: InfiniteScrollProps) => {
    const { targetRef, isIntersecting } = useIntersectionObserver({
        threshold: 0.5,
        rootMargin: '100px',
    })

    useEffect(() => {
        if (hasNextPage && isIntersecting && !isManual && !isFetchingNextPage) {
            fetchNextPage()
        }
    }, [
        isIntersecting,
        hasNextPage,
        isFetchingNextPage,
        fetchNextPage,
        isManual,
    ])

    return (
        <div className="flex flex-col items-center gap-4 p-4">
            <div ref={targetRef} className="h-1"></div>
            {hasNextPage ? (
                <Button
                    variant="secondary"
                    onClick={fetchNextPage}
                    disabled={!hasNextPage || isFetchingNextPage}
                >
                    {isFetchingNextPage ? 'Loading...' : 'Load more'}
                </Button>
            ) : (
                <p className="text-xs text-muted-foreground">No more data</p>
            )}
        </div>
    )
}
