import type { FC } from 'react'
import type { Education } from '@/types/resume'

import SectionHeading from './section-heading'

interface EducationSectionProps {
    educations: Education[]
}

const EducationSection: FC<EducationSectionProps> = ({ educations }) => {
    return (
        <section className="mb-8">
            <SectionHeading>EDUCATION</SectionHeading>
            
            {educations && educations.length > 0 ? (
                <div className="space-y-4">
                    {educations.map((edu, index) => (
                        <div key={index} className="mb-3">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-semibold text-primary">{edu.degree}</h3>
                                    <p className="text-muted-foreground">{edu.institution}</p>
                                </div>
                                <span className="text-sm text-muted-foreground">{edu.period}</span>
                            </div>
                            <p className="text-sm mt-1">{edu.description}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-muted-foreground italic">
                    <p>暂无教育经历</p>
                </div>
            )}
        </section>
    )
}

export default EducationSection
