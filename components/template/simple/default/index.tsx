import ContactBar from './contact-bar'
import EducationSection from './education-section'
import ExperienceSection from './experience-section'
import ProfileSection from './profile-section'
import ResumeHeader from './resume-header'
import SkillsSection from './skills-section'

export default function SimpleDefault() {
    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                <div className="bg-card shadow-lg rounded-lg overflow-hidden print:shadow-none">
                    <ResumeHeader name="JOHN DOE" title="SOFTWARE ENGINEER" />

                    <ContactBar
                        phone="+1 (555) 123-4567"
                        email="john.doe@example.com"
                        location="San Francisco, CA"
                        linkedin="linkedin.com/in/johndoe"
                    />

                    <div className="p-8">
                        <ProfileSection />
                        <ExperienceSection />
                        <EducationSection />
                        <SkillsSection />
                    </div>
                </div>
            </div>
        </div>
    )
}
