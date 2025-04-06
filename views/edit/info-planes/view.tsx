import { ColorPicker } from '@/components/editor/color-picker'

export const RightPanel = () => {
    return (
        <div>
            RightPanel
            <div className="flex flex-col space-y-2">
                <div className="text-xs text-muted-foreground">Right Panel</div>
                <div className="text-xs text-muted-foreground">Right Panel</div>
                <div className="text-xs text-muted-foreground">Right Panel</div>
            </div>
            {/* color row */}
            <ColorPicker />
        </div>
    )
}
