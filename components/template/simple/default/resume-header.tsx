import type { FC } from 'react'

interface ResumeHeaderProps {
    name: string
    title: string
}

const ResumeHeader: FC<ResumeHeaderProps> = ({ name, title }) => {
    return (
        <div className="p-8 pb-4 border-b border-border">
            <h1 className="text-4xl font-bold tracking-wider text-center text-primary">
                {name}
            </h1>
            <p className="text-center text-muted-foreground mt-2 tracking-widest">
                {title}
            </p>
        </div>
    )
}

export default ResumeHeader
