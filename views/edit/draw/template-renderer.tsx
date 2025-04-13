'use client'

import { useModuleTemplate } from '@/hooks'

import WithTemplate from '@/components/template/WithTemplate'

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

    // TODO: 工具函数更新模板中模块的最新排序
    // const sortedModules = updateTemplateModuleSort(currentTemplate.modules, selectedModules)

    return (
        <div
            id="resume-wrapper"
            className="relative bg-white shadow-lg mx-auto"
            style={{
                width: `${A4_WIDTH_PX}px`,
                height: `${A4_HEIGHT_PX}px`,
            }}
        >
            <div className="rounded-sm overflow-hidden print:shadow-none">
                <WithTemplate templateId={currentTemplate.id} data={currentTemplate} />
            </div>
        </div>
    )
}
