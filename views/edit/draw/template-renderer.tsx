'use client'

import type { ModuleID } from '@/types/module'
import type { ResumeModule } from '@/types/resume-template'

import { WithResumeTemplate } from '@/components/template'

import { useCanvas } from '@/hooks/use-canvas'
import { useResumeTemplate } from '@/hooks/use-resume-template'

// 纸张尺寸（A4：210mm × 297mm，按1px = 0.264583mm换算）
const A4_WIDTH_PX = 794
const A4_HEIGHT_PX = 1123

/**
 * 简历模板渲染器
 * 根据选择的模板来渲染不同样式的简历
 */
export function TemplateRenderer() {
    const canvas = useCanvas()
    const { currentTemplate } = useResumeTemplate()
    // const { currentTemplate } = canvas
    console.log('简历模板渲染器', currentTemplate)

    let templateId = currentTemplate?.templateId ?? 'simple-default'
    const templateData: ResumeModule = {
        id: 'skills' as ModuleID,
        name: 'Default Name',
        isSelected: false,
        isVisible: true,
        isFixed: false,
        group: 'selected' as 'selected' | 'available' | 'custom',
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
            {/* 模板默认背景: 受编辑器右侧属性栏目的属性控制 */}
            <div className="absolute inset-0" />

            {/* 模板内容区域：用于渲染当前选择的模板 */}
            <div className="rounded-sm overflow-hidden print:shadow-none">
                <WithResumeTemplate templateId={templateId} data={templateData} />
            </div>
        </div>
    )
}
