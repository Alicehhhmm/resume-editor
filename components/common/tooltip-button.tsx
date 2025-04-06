import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'


interface ToolButtonProps {
  children: React.ReactNode
  tooltip: string
  onClick?: () => void
  disabled?: boolean
  active?: boolean
}

export const ToolButton = ({ children, tooltip, onClick, disabled = false, active = false }: ToolButtonProps) =>{
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className={cn(
            "size-8 rounded-md hover:bg-neutral-100",
            active && "bg-neutral-100 text-black",
            disabled && "opacity-50 cursor-not-allowed"
          )}
          onClick={onClick}
          disabled={disabled}
        >
          {children}
        </Button>
      </TooltipTrigger>
      <TooltipContent side="bottom" className="text-xs py-1 px-2 bg-neutral-800 text-white border-none">
        <p>{tooltip}</p>
      </TooltipContent>
    </Tooltip>
  )
} 