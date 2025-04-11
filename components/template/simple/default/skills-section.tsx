import type { FC } from 'react'

import SectionHeading from './section-heading'
import SkillBar from './skill-bar'

const skills = [
    { name: 'JavaScript/TypeScript', level: 95 },
    { name: 'React/Next.js', level: 90 },
    { name: 'Node.js', level: 85 },
    { name: 'Python', level: 80 },
    { name: 'AWS/Cloud Services', level: 75 },
    { name: 'Docker/Kubernetes', level: 70 },
    { name: 'SQL/NoSQL Databases', level: 85 },
    { name: 'CI/CD', level: 80 },
]

const SkillsSection: FC = () => {
    return (
        <section>
            <SectionHeading>SKILLS</SectionHeading>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {skills.map((skill, index) => (
                    <SkillBar
                        key={index}
                        name={skill.name}
                        level={skill.level}
                    />
                ))}
            </div>
        </section>
    )
}

export default SkillsSection
