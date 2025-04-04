'use client'

import { TemplateGrid } from './template-grid'
import { useRouter } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

import {
    useSuspenseInfiniteQuery,
    useSuspenseQuery,
} from '@tanstack/react-query'

import type { Category, Template } from '@/types/resume-template'

import { InfiniteScroll } from '@/components/common'
import { FilterCarousel } from '@/components/filter-carousel'
import { Skeleton } from '@/components/ui/skeleton'

import { fetchTemplates } from '@/services/templateService'

const categories = [
    { value: 'all', label: '全部' },
    { value: 'simple', label: '简约' },
    { value: 'canon', label: '经典' },
    { value: 'creativity', label: '创意' },
    { value: 'specialty', label: '专业' },
] as const

interface TemplateViewProps {
    templateId: string
}

export const TemplateView = ({ templateId }: TemplateViewProps) => {
    return (
        <>
            <ErrorBoundary fallback={<div>Error loading templates!</div>}>
                <Suspense fallback={<TemplateViewSkeleton />}>
                    <TemplateViewSuspense />
                </Suspense>
            </ErrorBoundary>
        </>
    )
}

const TemplateViewSuspense = () => {
    const router = useRouter()
    const [categoryId, setCategoryId] = useState<Category>('all')
    const [selectedId, setSelectedId] = useState<string>()

    // 使用 useSuspenseInfiniteQuery 获取数据
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
        useSuspenseInfiniteQuery({
            queryKey: ['templates'],
            queryFn: fetchTemplates,
            initialPageParam: 1,
            getNextPageParam: (lastPage) => lastPage.nextPage,
        })

    // 将分页数据合并为一个数组
    const templates = data?.pages.flatMap((page) => page.data) || []

    // 将 Template[] 转换为 Record<Category, Template[]>
    const templatesByCategory = templates?.reduce(
        (acc, template) => {
            if (!acc[template.category]) {
                acc[template.category] = []
            }
            acc[template.category].push(template)
            return acc
        },
        {} as Record<Category, Template[]>
    )

    // 同步URL状态
    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        setCategoryId((params.get('category') as Category) || 'all')
        setSelectedId(params.get('templateId') || undefined)
    }, [])

    // 处理分类选择
    const handleCategorySelect = (value: string | null) => {
        const newCategory = (value || 'all') as Category
        setCategoryId(newCategory)

        const params = new URLSearchParams(window.location.search)
        newCategory === 'all'
            ? params.delete('category')
            : params.set('category', newCategory)

        router.push(`?${params.toString()}`, { scroll: false })
    }

    // 处理模板选择
    const handleTemplateSelect = (template: Template) => {
        setSelectedId(template.id)
        const params = new URLSearchParams(window.location.search)
        params.set('templateId', template.id)
        router.push(`?${params.toString()}`, { scroll: false })
    }

    return (
        <div className="h-full flex flex-col space-y-6">
            <div className="px-4 pt-4 space-y-1">
                <h1 className="text-xl font-semibold">推荐模板</h1>
                <p className="text-sm text-muted-foreground">
                    选择一个适合你的简历模板开始创建
                </p>
            </div>

            <div className="px-2">
                <FilterCarousel
                    value={categoryId}
                    onSelect={handleCategorySelect}
                    data={[...categories]}
                />
            </div>

            <div className="flex-1">
                <TemplateGrid
                    category={categoryId}
                    selectedId={selectedId}
                    onSelect={handleTemplateSelect}
                    templates={templatesByCategory || {}}
                >
                    <InfiniteScroll
                        isManual={false}
                        hasNextPage={hasNextPage}
                        isFetchingNextPage={isFetchingNextPage}
                        fetchNextPage={fetchNextPage}
                    />
                </TemplateGrid>
            </div>
        </div>
    )
}
const TemplateViewSkeleton = () => {
    return (
        <div className="h-full flex flex-col space-y-6">
            <div className="px-4 pt-4 space-y-1">
                <h1 className="text-xl font-semibold">推荐模板</h1>
                <p className="text-sm text-muted-foreground">
                    选择一个适合你的简历模板开始创建
                </p>
            </div>

            <div className="px-2">
                <div className="flex space-x-2">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <Skeleton key={index} className="h-10 w-20" />
                    ))}
                </div>
            </div>

            <div className="flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <Skeleton
                            key={index}
                            className="aspect-[3/4] rounded-lg"
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default TemplateView
