'use client'

import { useState } from 'react'

import { FilterCarousel } from '@/components/filter-carousel'

const categories = [
    { value: 'all', label: '全部' },
    { value: 'simple', label: '简约' },
    { value: 'canon', label: '经典' },
    { value: 'creativity', label: '创意' },
    { value: 'specialty', label: '专业' },
]

type Props = {}

export const TemplateView = ({}: Props) => {
    const [categoryId, setCategoryId] = useState<string>('all')

    const onSelect = (value: string) => {
        setCategoryId(value)
        console.log('Selected value:', value)
    }

    return (
        <div>
            <div className="flex flex-col my-2 space-y-1">
                <h1 className="text-base font-medium">Recommended</h1>
            </div>
            <FilterCarousel
                onSelect={onSelect}
                value={categoryId}
                data={categories}
            />
            {/* TODO: cateory content preview */}
            {/* TODO: content list touch */}
            {/* <InfiniteScroll
                    isManual={false}
                    hasNextPage={list.hasNextPage}
                    isFetchingNextPage={list.isFetchingNextPage}
                    fetchNextPage={list.fetchNextPage}
                /> */}
        </div>
    )
}
