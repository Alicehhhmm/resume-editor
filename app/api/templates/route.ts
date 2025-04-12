import { NextResponse } from 'next/server'
import {
    getAllTemplates,
    getTemplatesByCategory,
    getTemplateById
} from '@/config/resume-template'
import type { Category } from '@/types/resume-template'
import { resumeData } from '@/data/resume-data'

/**
 * 获取所有模板或按分类获取
 */
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const category = searchParams.get('category')
        const templateId = searchParams.get('templateId')



        const templates = getAllTemplates()
        return NextResponse.json({ data: templates })
    } catch (error) {
        console.error('[TEMPLATES_GET]', error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}