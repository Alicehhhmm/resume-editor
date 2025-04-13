import type { FC } from 'react'
import type { Skill } from '@/types/resume'

import SectionHeading from './section-heading'

interface SkillsSectionProps {
    skills: Skill[]
}

const SkillsSection: FC<SkillsSectionProps> = ({ skills }) => {
    return (
        <section className="mb-8">
            <SectionHeading>SKILLS</SectionHeading>
            
            {skills && skills.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {skills.map((skill, index) => (
                        <div key={index} className="flex items-center justify-between">
                            <span className="font-medium">{skill.name}</span>
                            <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                                <div 
                                    className="h-full bg-primary" 
                                    style={{ width: `${skill.level}%` }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-muted-foreground italic">
                    <p>暂无技能数据</p>
                </div>
            )}
        </section>
    )
}

export default SkillsSection
