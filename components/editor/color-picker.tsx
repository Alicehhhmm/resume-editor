'use client'

import { useCallback, useEffect, useState } from 'react'
import { HexColorInput, HexColorPicker } from 'react-colorful'

import { Check } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'

const DEFAULT_PRESET = [
    '#FFFFFF', // 白色
    '#1D1D1D', // 黑色
    '#3b82f6', // 蓝色
    '#22c55e', // 绿色
    '#FBBC05', // 黄色
    '#f43f5e', // 红色
    '#a855f7', // 紫色
    '#14b8a6', // 青色
    '#6b7280', // 灰色
    '#FF9800', // 橙色
]

interface ColorPickerProps {
    value: string
    onChange: (color: string) => void
    presetColors?: string[]
    label?: string
    showInput?: boolean
}

export const ColorPicker = ({
    value,
    onChange,
    presetColors = DEFAULT_PRESET,
    showInput = true,
}: ColorPickerProps) => {
    const [color, setColor] = useState(value || '#000000')
    const [isOpen, setIsOpen] = useState(false)

    // 同步外部值变化
    useEffect(() => {
        if (value !== color) {
            setColor(value)
        }
    }, [value])

    // 处理颜色变化
    const handleColorChange = useCallback((newColor: string) => {
        setColor(newColor)
    }, [])

    // 选择预设颜色
    const selectPresetColor = useCallback(
        (presetColor: string) => {
            setColor(presetColor)
            onChange(presetColor)
        },
        [onChange]
    )

    return (
        <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-2">
                <Popover open={isOpen} onOpenChange={setIsOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            className="size-8 p-0 border"
                            style={{ backgroundColor: color }}
                        />
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-3">
                        <HexColorPicker
                            color={color}
                            onChange={handleColorChange}
                        />

                        {showInput && (
                            <div className="flex items-center mt-2">
                                {/* TODO: Copy btn */}
                                <HexColorInput
                                    color={color}
                                    onChange={handleColorChange}
                                    prefixed
                                    className="w-full h-8 px-2 border border-input rounded-md text-sm"
                                />
                            </div>
                        )}

                        <div className="grid grid-cols-5 gap-1 mt-3">
                            {presetColors.map((presetColor) => (
                                <button
                                    key={presetColor}
                                    className="w-full h-8 rounded-sm border border-input relative"
                                    style={{ backgroundColor: presetColor }}
                                    onClick={() =>
                                        selectPresetColor(presetColor)
                                    }
                                >
                                    {presetColor === color && (
                                        <Check className="absolute inset-0 m-auto text-white font-semibold size-4 drop-shadow-md" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </PopoverContent>
                </Popover>

                {showInput && (
                    <HexColorInput
                        color={color}
                        onChange={handleColorChange}
                        prefixed
                        className="h-8 px-2 border border-input rounded-md text-sm w-24"
                    />
                )}
            </div>
        </div>
    )
}
