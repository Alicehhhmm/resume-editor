import { useCallback } from 'react'
import type { FC } from 'react'

import { useResumeTemplate } from '@/hooks'

import type { ContactInfo, PersonalInfo } from '@/types/resume'
import type { ModuleKey } from '@/types/resume'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

/**
 * 个人信息模块组件
 * @description 编辑个人基本信息
 */
export const PersonalInfoPanel: FC = () => {
    const { currentTemplate, updateModuleContent } = useResumeTemplate()
    const personalInfo = currentTemplate?.modules?.personal as PersonalInfo

    // 处理基础字段变更
    const handleChange = useCallback(
        (field: keyof PersonalInfo, value: string | ContactInfo) => {
            if (!personalInfo) return
            
            updateModuleContent('personal', {
                ...personalInfo,
                [field]: value
            })
        },
        [personalInfo, updateModuleContent]
    )

    // 处理联系方式字段变更
    const handleContactChange = useCallback(
        (field: keyof ContactInfo, value: string) => {
            if (!personalInfo?.contact) return
            
            updateModuleContent('personal', {
                ...personalInfo,
                contact: {
                    ...personalInfo.contact,
                    [field]: value
                }
            })
        },
        [personalInfo, updateModuleContent]
    )

    // 如果没有数据，显示加载状态或空状态
    if (!personalInfo) {
        return (
            <div className="space-y-4">
                <h3 className="text-lg font-medium">个人信息</h3>
                <p className="text-muted-foreground">请先添加个人信息</p>
            </div>
        )
    }

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-medium">个人信息</h3>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="name">姓名</Label>
                    <Input
                        id="name"
                        placeholder="请输入姓名"
                        value={personalInfo.name || ''}
                        onChange={(e) => handleChange('name', e.target.value)}
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="title">职位</Label>
                    <Input
                        id="title"
                        placeholder="请输入职位"
                        value={personalInfo.title || ''}
                        onChange={(e) => handleChange('title', e.target.value)}
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="email">邮箱</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="请输入邮箱"
                        value={personalInfo.contact?.email || ''}
                        onChange={(e) => handleContactChange('email', e.target.value)}
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="phone">电话</Label>
                    <Input
                        id="phone"
                        placeholder="请输入电话"
                        value={personalInfo.contact?.phone || ''}
                        onChange={(e) => handleContactChange('phone', e.target.value)}
                    />
                </div>

                <div className="space-y-2 col-span-2">
                    <Label htmlFor="location">地址</Label>
                    <Input
                        id="location"
                        placeholder="请输入地址"
                        value={personalInfo.contact?.location || ''}
                        onChange={(e) => handleContactChange('location', e.target.value)}
                    />
                </div>

                <div className="space-y-2 col-span-2">
                    <Label htmlFor="profile">个人简介</Label>
                    <Textarea
                        id="profile"
                        placeholder="请简要介绍自己"
                        rows={4}
                        value={personalInfo.profile || ''}
                        onChange={(e) => handleChange('profile', e.target.value)}
                    />
                </div>
            </div>
        </div>
    )
}
