'use client'

import { type FC, useEffect, useRef } from 'react'

interface SkillBarProps {
    name: string
    level: number
}

const SkillBar: FC<SkillBarProps> = ({ name, level }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // Draw background bar
        ctx.fillStyle = '#e5e7eb' // Light gray
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        // Draw skill level
        ctx.fillStyle = 'hsl(var(--primary))' // Primary color
        ctx.fillRect(0, 0, (level / 100) * canvas.width, canvas.height)
    }, [level])

    return (
        <div className="mb-2">
            <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">{name}</span>
                <span className="text-sm text-muted-foreground">{level}%</span>
            </div>
            <canvas
                ref={canvasRef}
                width={200}
                height={8}
                className="w-full h-2 rounded-full"
            />
        </div>
    )
}

export default SkillBar
