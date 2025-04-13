import type { FC } from 'react'
import type { WorkExperience } from '@/types/resume'

import SectionHeading from './section-heading'

interface ExperienceSectionProps {
    experiences: WorkExperience[]
}

const ExperienceSection: FC<ExperienceSectionProps> = ({ experiences }) => {
    return (
        <section className="mb-8">
            <SectionHeading>WORK EXPERIENCE</SectionHeading>
            
            {experiences && experiences.length > 0 ? (
                <div className="space-y-6">
                    {experiences.map((job, index) => (
                        <div key={index} className="mb-4">
                            <div className="flex justify-between items-start mb-1">
                                <div>
                                    <h3 className="font-semibold text-primary">{job.title}</h3>
                                    <p className="text-muted-foreground">{job.company}, {job.location}</p>
                                </div>
                                <span className="text-sm text-muted-foreground">{job.period}</span>
                            </div>
                            
                            {job.achievements && job.achievements.length > 0 && (
                                <ul className="list-disc pl-5 mt-2">
                                    {job.achievements.map((achievement, idx) => (
                                        <li key={idx} className="text-sm mb-1">
                                            {achievement.description}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-muted-foreground italic">
                    <p>暂无工作经历</p>
                </div>
            )}
        </section>
    )
}

export default ExperienceSection
