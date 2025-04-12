'use client'

import { useResumeTemplate } from '@/hooks'

import { ColorPicker } from '@/components/editor/color-picker'

import { useCanvas } from '@/hooks/use-canvas'

export const RightPanel = () => {
    const canvas = useCanvas()
    // const { elements } = canvas
    const { currentTemplate: elements } = useResumeTemplate()

    return (
        <div>
            <h1>RightPanel</h1>

            {/* base info */}
            <div className="">{elements?.title}</div>

            {/* color row */}
            <ColorPicker value="" onChange={() => {}} />

            {/* font row */}
            <div className="">字体配置</div>

            {/* layout row*/}
            <div className="">布局间隙</div>
        </div>
    )
}
