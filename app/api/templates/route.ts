import { NextResponse } from 'next/server'
import {
  getAllTemplates,
  getTemplatesByCategory,
  getTemplateById
} from '@/config/resume-template'
import type { Category } from '@/types/resume-template'

/**
 * 获取所有模板或按分类获取
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category') as Category | null
    const id = searchParams.get('id')

    // 如果指定了 ID，则返回特定模板
    if (id) {
      const template = getTemplateById(id)

      if (!template) {
        return NextResponse.json(
          { error: 'Template not found' },
          { status: 404 }
        )
      }

      return NextResponse.json({ data: template })
    }

    // 如果指定了分类，则返回特定分类的模板
    if (category) {
      const templates = getTemplatesByCategory(category)
      return NextResponse.json({ data: templates })
    }

    // 否则返回所有模板
    const templates = getAllTemplates()
    return NextResponse.json({ data: templates })
  } catch (error) {
    console.error('Error fetching templates:', error)
    return NextResponse.json(
      { error: 'Failed to fetch templates' },
      { status: 500 }
    )
  }
}

/**
 * 静态生成的数据
 */
export function generateStaticParams() {
  // 为每个分类生成静态路径
  const categories = ['all', 'simple', 'canon', 'creativity', 'specialty']
  return categories.map(category => ({ category }))
}