import type { FC, ReactNode } from 'react'

interface SectionHeadingProps {
    children: ReactNode
}

const SectionHeading: FC<SectionHeadingProps> = ({ children }) => {
    return (
        <div className="mb-4 relative">
            <h2 className="text-sm font-bold tracking-widest text-primary">
                {children}
            </h2>
            <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-primary"></div>
        </div>
    )
}

export default SectionHeading
