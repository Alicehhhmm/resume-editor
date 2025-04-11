import type { FC } from 'react'

import SectionHeading from './section-heading'

const EducationSection: FC = () => {
    return (
        <section className="mb-8">
            <SectionHeading>EDUCATION</SectionHeading>
            <div>
                <h3 className="font-bold text-primary">
                    MASTER OF SCIENCE IN COMPUTER SCIENCE
                </h3>
                <div className="flex flex-wrap justify-between text-sm text-muted-foreground">
                    <span>Stanford University</span>
                    <span>2016 - 2018</span>
                </div>
                <p className="text-sm mt-1">
                    Specialized in Artificial Intelligence and Machine Learning.
                    Graduated with honors. GPA: 3.9/4.0
                </p>
            </div>

            <div className="mt-4">
                <h3 className="font-bold text-primary">
                    BACHELOR OF SCIENCE IN SOFTWARE ENGINEERING
                </h3>
                <div className="flex flex-wrap justify-between text-sm text-muted-foreground">
                    <span>University of California, Berkeley</span>
                    <span>2012 - 2016</span>
                </div>
                <p className="text-sm mt-1">
                    Dean's List for all semesters. Participated in ACM
                    programming competitions. GPA: 3.8/4.0
                </p>
            </div>
        </section>
    )
}

export default EducationSection
