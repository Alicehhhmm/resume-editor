'use client'

import { DndContext } from '@dnd-kit/core'

import type { Module, Template, TemplateIdType } from '@/types'

import WithTemplate from '@/components/template/WithTemplate'

import { useModuleTemplate } from '@/hooks/use-module-template'
import { useResumeTemplate } from '@/hooks/use-resume-template'

// A4纸张尺寸常量 (210mm × 297mm，按1px = 0.264583mm换算)
const A4_WIDTH_PX = 794
const A4_HEIGHT_PX = 1123

/**
 * 简历模板渲染器
 * @description 负责将当前模板数据渲染为可视化简历
 */
export function TemplateRenderer() {
    const { currentTemplate } = useResumeTemplate()
    const { selectedModules } = useModuleTemplate()

    // 无模板数据时不渲染
    if (!currentTemplate) return null

    const templateId: TemplateIdType = currentTemplate.id
    const sort: Module[] = [...selectedModules]
    const data: Template = {
        ...currentTemplate,
    }

    return (
        <div
            id="resume-wrapper"
            className="relative bg-white shadow-lg mx-auto"
            style={{
                width: `${A4_WIDTH_PX}px`,
                height: `${A4_HEIGHT_PX}px`,
            }}
        >
            <div className="rounded-sm overflow-hidden print:shadow-none container mx-auto px-4 py-8 max-w-4xl">
                <DndContext>
                    <WithTemplate templateId={templateId} data={data} sort={sort} />
                </DndContext>
            </div>
        </div>
    )
}
