import { useRef, useState } from 'react'

import { Save, X } from 'lucide-react'

import { ActionTooltip } from '@/components/ui/action-tooltip'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface ModuleNameEditorProps {
    name: string
    onSave: (name: string) => void
    onCancel: () => void
}

export const ModuleNameEditor = ({
    name,
    onSave,
    onCancel,
}: ModuleNameEditorProps) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const [editName, setEditName] = useState(name)

    const handleSave = () => {
        if (editName.trim()) {
            onSave(editName.trim())
        } else {
            onCancel()
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSave()
        } else if (e.key === 'Escape') {
            onCancel()
        }
    }

    return (
        <div className="flex items-center gap-1 flex-1 min-w-0">
            <Input
                ref={inputRef}
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                onKeyDown={handleKeyDown}
                className="h-8 text-sm py-1"
            />
            <ActionTooltip label="保存" side="bottom">
                <Button
                    size="icon"
                    variant="ghost"
                    onClick={handleSave}
                    className="h-7 w-7 flex-shrink-0"
                >
                    <Save size={14} />
                </Button>
            </ActionTooltip>
            <ActionTooltip label="取消" side="bottom">
                <Button
                    size="icon"
                    variant="ghost"
                    onClick={onCancel}
                    className="h-7 w-7 flex-shrink-0"
                >
                    <X size={14} />
                </Button>
            </ActionTooltip>
        </div>
    )
}
