'use client'

import { Suspense, useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

import { useResumeTemplate } from '@/hooks'
import { fetchTemplates, saveTemplateToStorage } from '@/services/templateService'
import { useSuspenseInfiniteQuery } from '@tanstack/react-query'
import { ErrorBoundary } from 'react-error-boundary'

import type { Category, Template } from '@/types/resume-template'

import { InfiniteScroll } from '@/components/common'
import { FilterCarousel } from '@/components/filter-carousel'

import { useCanvas } from '@/hooks/use-canvas'

import { TemplateGrid } from './template-grid'
import { TemplateViewSkeleton } from './template-skeleton'

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

/**
 * 模板选择视图组件
 * @description 提供模板分类筛选、选择和加载功能
 */
export const TemplateView = ({ templateId }: TemplateViewProps) => {
    return (
        <ErrorBoundary fallback={<div>Error loading templates!</div>}>
            <Suspense fallback={<TemplateViewSkeleton />}>
                <TemplateViewSuspense />
            </Suspense>
        </ErrorBoundary>
    )
}

/**
 * 模板选择视图的 Suspense 组件
 * @description 处理模板数据的加载和状态管理
 */
const TemplateViewSuspense = () => {
    const router = useRouter()
    const [categoryId, setCategoryId] = useState<Category>('all')
    const [selectedId, setSelectedId] = useState<string>()
    const canvas = useCanvas()
    const { selectTemplate } = useResumeTemplate()

    // 获取模板数据
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useSuspenseInfiniteQuery({
        queryKey: ['templates'],
        queryFn: fetchTemplates,
        initialPageParam: 1,
        getNextPageParam: (lastPage) => lastPage.nextPage,
    })

    // 处理分类选择
    const handleCategorySelect = (value: string | null) => {
        const newCategory = (value || 'all') as Category
        setCategoryId(newCategory)

        const params = new URLSearchParams(window.location.search)
        newCategory === 'all' ? params.delete('category') : params.set('category', newCategory)

        router.push(`?${params.toString()}`, { scroll: false })
    }

    // 处理模板选择
    const handleTemplateSelect = (template: Template) => {
        setSelectedId(template.id)
        const params = new URLSearchParams(window.location.search)
        params.set('templateId', template.id)
        router.push(`?${params.toString()}`, { scroll: false })

        // 更新Canvas状态
        canvas.updateTemplate(template)

        // 将模板保存到本地
        saveTemplateToStorage(template)

        // 更新到模板整体管理
        selectTemplate(template.id)
    }

    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        setCategoryId((params.get('category') as Category) || 'all')
        setSelectedId(params.get('templateId') || undefined)
    }, [])

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

    return (
        <div className="h-full flex flex-col space-y-6">
            <div className="px-4 pt-4 space-y-1">
                <h1 className="text-xl font-semibold">推荐模板</h1>
                <p className="text-sm text-muted-foreground">选择一个适合你的简历模板开始创建</p>
            </div>

            <div className="px-2">
                <FilterCarousel value={categoryId} onSelect={handleCategorySelect} data={[...categories]} />
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

export default TemplateView
