import type { FC } from 'react'

import ExperienceItem from './experience-item'
import SectionHeading from './section-heading'

const experiences = [
    {
        title: 'SENIOR SOFTWARE ENGINEER',
        company: 'Tech Innovations Inc.',
        location: 'San Francisco, CA',
        period: '2021 - Present',
        achievements: [
            'Led development of a microservices architecture that improved system reliability by 35% and reduced deployment time by 50%',
            'Implemented CI/CD pipelines that decreased integration issues by 40% and accelerated release cycles',
            'Mentored junior developers, conducted code reviews, and established best practices for a team of 8 engineers',
            'Optimized database queries and API endpoints, resulting in a 60% reduction in response times',
        ],
    },
    {
        title: 'SOFTWARE ENGINEER',
        company: 'Digital Solutions LLC',
        location: 'Seattle, WA',
        period: '2018 - 2021',
        achievements: [
            'Developed and maintained RESTful APIs serving over 10,000 daily active users',
            'Collaborated with UX designers to implement responsive interfaces that increased user engagement by 25%',
            'Refactored legacy codebase, reducing technical debt and improving maintainability',
            'Participated in agile development processes, consistently delivering features on schedule',
        ],
    },
]

const ExperienceSection: FC = () => {
    return (
        <section className="mb-8">
            <SectionHeading>EXPERIENCE</SectionHeading>
            <div className="space-y-6">
                {experiences.map((exp, index) => (
                    <ExperienceItem key={index} {...exp} />
                ))}
            </div>
        </section>
    )
}

export default ExperienceSection
