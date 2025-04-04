// 确保该文件仅在服务端使用
import 'server-only'

import { cache } from 'react'

import { dehydrate, HydrationBoundary } from '@tanstack/react-query'

import { makeQueryClient } from '@/lib/tanstack/query-client'

/**
 * 获取查询客户端的缓存化单例
 *
 * NOTE:
 * 1. 使用React cache机制确保同一请求周期内返回相同实例
 * 2. 服务端渲染时避免重复创建QueryClient
 * 3. 支持流式渲染（Suspense）场景
 */
export const getQueryClient = cache(makeQueryClient)

/**
 * 客户端hydrate边界组件
 *
 * NOTE:
 * 1. 将服务端解析（dehydrate）的查询状态注入客户端
 * 2. 保持服务端与客户端的查询状态一致性
 * 3. 支持React 18的流式渲染特性
 */
export function HydrateClient(props: { children: React.ReactNode }) {
    const queryClient = getQueryClient()
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            {props.children}
        </HydrationBoundary>
    )
}

/**
 * 通用数据预取器
 *
 * NOTE:
 * 1. 统一处理普通查询与无限滚动查询的预取逻辑
 * 2. 自动集成到服务端渲染流程
 * 3. 支持TypeScript类型推断
 */
export function prefetch<T extends ReturnType<any>>(queryOptions: T) {
    const queryClient = getQueryClient()
    // if (queryOptions.queryKey[1]?.type === 'infinite') {
    //     void queryClient.prefetchInfiniteQuery(queryOptions as any)
    // } else {
    //     void queryClient.prefetchQuery(queryOptions)
    // }
}
