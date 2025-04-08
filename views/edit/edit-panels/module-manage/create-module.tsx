import { useState } from 'react'
import { Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'

interface CreateModuleDialogProps {
    isOpen: boolean
    onOpenChange: (open: boolean) => void
    onAddModule: (name: string) => boolean
}

export const CreateModuleDialog = ({
    isOpen,
    onOpenChange,
    onAddModule,
}: CreateModuleDialogProps) => {
    const [moduleName, setModuleName] = useState('')

    const handleAddModule = () => {
        if (onAddModule(moduleName)) {
            setModuleName('')
            onOpenChange(false)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>添加自定义模块</DialogTitle>
                    <DialogDescription>
                        输入模块名称创建一个新的自定义模块。创建后可通过拖拽调整位置。
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                    <Input
                        placeholder="输入模块名称"
                        value={moduleName}
                        onChange={(e) => setModuleName(e.target.value)}
                        onKeyDown={(e) =>
                            e.key === 'Enter' && handleAddModule()
                        }
                        className="mb-2"
                    />
                </div>
                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={() => {
                            setModuleName('')
                            onOpenChange(false)
                        }}
                    >
                        取消
                    </Button>
                    <Button
                        onClick={handleAddModule}
                        disabled={!moduleName.trim()}
                    >
                        添加模块
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}