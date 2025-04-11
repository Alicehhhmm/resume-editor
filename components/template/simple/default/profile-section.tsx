import type { FC } from 'react'

import SectionHeading from './section-heading'

const ProfileSection: FC = () => {
    return (
        <section className="mb-8">
            <SectionHeading>PROFILE</SectionHeading>
            <p className="text-foreground leading-relaxed">
                Results-driven Software Engineer with 5+ years of experience
                developing robust applications and services. Specialized in
                full-stack development with expertise in React, Node.js, and
                cloud technologies. Passionate about creating efficient,
                scalable solutions that solve real-world problems. Strong
                collaborator who thrives in cross-functional teams and adapts
                quickly to new technologies.
            </p>
        </section>
    )
}

export default ProfileSection
