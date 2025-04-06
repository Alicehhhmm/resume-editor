'use client'

import { useCanvas } from '@/hooks/use-canvas'
import { useCallback, useMemo } from 'react'
import type { Template } from '@/types/resume-template'
import { cn } from '@/lib/utils'

// 纸张尺寸（A4：210mm × 297mm，按1px = 0.264583mm换算）
const A4_WIDTH_PX = 794
const A4_HEIGHT_PX = 1123

/**
 * 简历模板渲染器
 * 根据选择的模板来渲染不同样式的简历
 */
export function TemplateRenderer() {
  const canvas = useCanvas()
  const { currentTemplate } = canvas
  
  // 根据模板获取对应的布局和样式
  const templateConfig = useMemo(() => {
    return getTemplateConfig(currentTemplate)
  }, [currentTemplate])
  
  return (
    <div 
      className="relative bg-white shadow-lg mx-auto"
      style={{ 
        width: `${A4_WIDTH_PX}px`, 
        height: `${A4_HEIGHT_PX}px`,
      }}
    >
      {/* 模板默认背景 */}
      <div 
        className="absolute inset-0" 
        style={templateConfig.background}
      />
      
      {/* 模板内容区域 */}
      <p>模板内容区域</p>
      <p>{currentTemplate.category}</p>
      <p>{currentTemplate.description}</p>
      <p>{currentTemplate.title}</p>
    </div>
  )
}

/**
 * 获取模板配置
 * 根据模板类型返回对应的样式和布局配置
 */
function getTemplateConfig(template: Template) {
  const category = template.category
  
  // 不同类型模板的样式配置
  switch(category) {
    case 'simple':
      return {
        background: {},
        containerClassName: "font-sans",
        headerClassName: "border-b border-gray-200",
        headerStyle: {},
        contentClassName: "",
        sectionTitleClassName: "text-gray-800 border-b pb-1",
      }
    
    case 'canon':
      return {
        background: {},
        containerClassName: "font-serif",
        headerClassName: "text-center",
        headerStyle: {},
        contentClassName: "",
        sectionTitleClassName: "text-gray-800 uppercase tracking-wider",
      }
    
    case 'creativity':
      return {
        background: { 
          backgroundImage: "linear-gradient(to right, #f0f0f0 0%, #f0f0f0 30%, white 30%, white 100%)"
        },
        containerClassName: "font-sans",
        headerClassName: "bg-gradient-to-r from-blue-50 to-white pl-12",
        headerStyle: { paddingLeft: "30%" },
        contentClassName: "",
        sectionTitleClassName: "text-blue-600",
      }
    
    case 'specialty':
      return {
        background: {},
        containerClassName: "font-mono border border-gray-300 m-2",
        headerClassName: "bg-gray-50",
        headerStyle: {},
        contentClassName: "divide-y divide-gray-100",
        sectionTitleClassName: "text-gray-700",
      }
    
    default:
      return {
        background: {},
        containerClassName: "font-sans",
        headerClassName: "",
        headerStyle: {},
        contentClassName: "",
        sectionTitleClassName: "",
      }
  }
} 