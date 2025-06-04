import type { FC } from 'react'

import type { WorkExperience } from '@/types/resume'

interface ExperienceItemProps {
    data: WorkExperience[]
}

const ExperienceItem: FC<ExperienceItemProps> = ({ data }) => {
    const { title, company, location, period, achievements } = data[0]
    return (
        <div>
            <div className="mb-2">
                <h3 className="font-bold text-primary">{title}</h3>
                <div className="flex flex-wrap justify-between text-sm text-muted-foreground">
                    <span>
                        {company} | {location}
                    </span>
                    <span>{period}</span>
                </div>
            </div>
            <ul className="list-disc pl-5 space-y-1">
                {achievements.map((achievement, index) => (
                    <li key={index} className="text-sm">
                        {achievement.description}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ExperienceItem
