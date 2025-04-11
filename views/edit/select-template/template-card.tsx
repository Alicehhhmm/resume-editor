import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface TemplateCardProps {
  id: string
  title: string
  description: string
  thumbnail: string
  isActive:boolean
  onClick: ()=> void
}

const TemplateCard = React.memo(({
  id,
  title,
  description,
  thumbnail,
  isActive,
  onClick,
}: TemplateCardProps) => {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onClick?.();
      }}
      className={cn(
        'group relative aspect-[3/4] rounded-lg border border-border bg-card',
        'overflow-hidden cursor-pointer transition-all duration-200',
        'hover:border-primary/50 hover:shadow-lg focus:outline-none',
        isActive && 'border-primary ring-2 ring-primary/30'
      )}
    >
      <div className="absolute inset-0 bg-muted">
        <div className="relative w-full h-full">
          <Image
            src={thumbnail || '/placeholder.svg'}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>

      <div
        className={cn(
          'absolute inset-0 bg-gradient-to-t from-background/80 to-transparent p-4',
          'flex flex-col justify-end opacity-0 group-hover:opacity-100',
          'transition-opacity duration-200'
        )}
      >
        <h3 className="font-medium text-sm">{title}</h3>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </div>
  );
});

TemplateCard.displayName = 'TemplateCard';

export default TemplateCard;