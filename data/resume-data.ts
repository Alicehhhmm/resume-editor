import type { ResumeData } from "../types"

/**
 * 示例简历数据 - 英文
 * @description 用于填充简历模板的示例数据
 */
export const resumeDataEn: ResumeData = {
    personal: {
        name: "JOHN DOE",
        title: "SOFTWARE ENGINEER",
        contact: {
            phone: "+1 (555) 123-4567",
            email: "john.doe@example.com",
            location: "San Francisco, CA",
            website: "johndoe.dev",
            linkedin: "linkedin.com/in/johndoe",
            github: "github.com/johndoe"
        },
        profile:
            "Results-driven Software Engineer with 5+ years of experience developing robust applications and services. Specialized in full-stack development with expertise in React, Node.js, and cloud technologies. Passionate about creating efficient, scalable solutions that solve real-world problems. Strong collaborator who thrives in cross-functional teams and adapts quickly to new technologies.",
    },
    experience: [
        {
            title: "SENIOR SOFTWARE ENGINEER",
            company: "Tech Innovations Inc.",
            location: "San Francisco, CA",
            period: "2021 - Present",
            achievements: [
                {
                    description: "Led development of a microservices architecture that improved system reliability by 35% and reduced deployment time by 50%",
                    metrics: "35% reliability improvement, 50% deployment time reduction",
                    technologies: ["Docker", "Kubernetes", "AWS"]
                },
                {
                    description: "Implemented CI/CD pipelines that decreased integration issues by 40% and accelerated release cycles",
                    metrics: "40% reduction in integration issues",
                    technologies: ["Jenkins", "GitHub Actions", "AWS CodePipeline"]
                },
                {
                    description: "Mentored junior developers, conducted code reviews, and established best practices for a team of 8 engineers",
                    technologies: ["TypeScript", "React", "Node.js"]
                },
                {
                    description: "Optimized database queries and API endpoints, resulting in a 60% reduction in response times",
                    metrics: "60% response time reduction",
                    technologies: ["PostgreSQL", "Redis", "GraphQL"]
                },
            ],
        },
        {
            title: "SOFTWARE ENGINEER",
            company: "Digital Solutions LLC",
            location: "Seattle, WA",
            period: "2018 - 2021",
            achievements: [
                {
                    description: "Developed and maintained RESTful APIs serving over 10,000 daily active users",
                    metrics: "10,000+ daily active users",
                    technologies: ["Node.js", "Express", "MongoDB"]
                },
                {
                    description: "Collaborated with UX designers to implement responsive interfaces that increased user engagement by 25%",
                    metrics: "25% increase in user engagement",
                    technologies: ["React", "Material-UI", "Tailwind CSS"]
                },
                {
                    description: "Refactored legacy codebase, reducing technical debt and improving maintainability",
                    technologies: ["TypeScript", "Jest", "ESLint"]
                },
                {
                    description: "Participated in agile development processes, consistently delivering features on schedule",
                    technologies: ["Scrum", "Jira", "Git"]
                },
            ],
        },
    ],
    education: [
        {
            degree: "MASTER OF SCIENCE IN COMPUTER SCIENCE",
            institution: "Stanford University",
            period: "2016 - 2018",
            description: "Specialized in Artificial Intelligence and Machine Learning. Graduated with honors. GPA: 3.9/4.0",
            major: "Computer Science",
            gpa: 3.9,
            courses: ["Advanced Machine Learning", "Computer Vision", "Natural Language Processing", "Distributed Systems"]
        },
        {
            degree: "BACHELOR OF SCIENCE IN SOFTWARE ENGINEERING",
            institution: "University of California, Berkeley",
            period: "2012 - 2016",
            description: "Dean's List for all semesters. Participated in ACM programming competitions. GPA: 3.8/4.0",
            major: "Software Engineering",
            gpa: 3.8,
            courses: ["Data Structures", "Algorithms", "Database Systems", "Web Development"]
        },
    ],
    skills: [
        { name: "JavaScript/TypeScript", level: 95 },
        { name: "React/Next.js", level: 90 },
        { name: "Node.js", level: 85 },
        { name: "Python", level: 80 },
        { name: "AWS/Cloud Services", level: 75 },
        { name: "Docker/Kubernetes", level: 70 },
        { name: "SQL/NoSQL Databases", level: 85 },
        { name: "CI/CD", level: 80 },
    ],
    languages: [
        { name: "English", proficiency: "Native" },
        { name: "Spanish", proficiency: "Professional" },
        { name: "Mandarin", proficiency: "Elementary" },
    ],
    certificates: [
        {
            name: "AWS Certified Solutions Architect",
            issuer: "Amazon Web Services",
            date: "2022",
            url: "https://aws.amazon.com/certification/",
        },
        {
            name: "Google Professional Cloud Developer",
            issuer: "Google Cloud",
            date: "2021",
            url: "https://cloud.google.com/certification/cloud-developer",
        },
    ],
    projects: [
        {
            name: "E-commerce Platform",
            description: "Scalable e-commerce platform with real-time inventory and payment processing",
            technologies: ["React", "Node.js", "MongoDB", "Stripe API"],
            url: "https://example-store.com",
            github: "github.com/johndoe/ecommerce",
            period: "2020 - 2021",
            role: "Lead Developer"
        },
        {
            name: "Task Management System",
            description: "Team collaboration tool with task assignments, progress tracking, and notifications",
            technologies: ["Vue.js", "Express", "PostgreSQL", "Socket.IO"],
            url: "https://taskmaster.io",
            github: "github.com/johndoe/taskmaster",
            period: "2019 - 2020",
            role: "Full Stack Developer"
        },
    ],
    awards: [
        {
            name: "Innovation Award",
            issuer: "Tech Innovations Inc.",
            date: "2022",
            description: "Recognized for developing an AI-powered feature that increased customer retention by 40%"
        },
        {
            name: "Hackathon Winner",
            issuer: "TechCrunch Disrupt",
            date: "2019",
            description: "First place for developing a real-time accessibility solution for visually impaired users"
        }
    ]
}

/**
 * 示例简历数据 - 中文
 * @description 用于填充简历模板的中文示例数据
 */
export const resumeDataZh: ResumeData = {
    personal: {
        name: "张三",
        title: "前端开发工程师",
        contact: {
            phone: "138-8888-8888",
            email: "xiaoming.zhang@example.com",
            location: "北京市朝阳区",
            website: "xiaoming.dev",
            linkedin: "linkedin.com/in/xiaoming",
            github: "github.com/xiaoming"
        },
        profile: "富有创造力和责任感的前端开发工程师，拥有5年以上的Web应用开发经验。专注于React生态系统和现代前端技术，熟悉设计系统和组件库开发。热衷于用户体验优化和性能提升，善于与设计师和后端工程师协作，打造高品质的产品。",
    },
    experience: [
        {
            title: "高级前端开发工程师",
            company: "科技创新有限公司",
            location: "北京市",
            period: "2021年 - 至今",
            achievements: [
                {
                    description: "主导开发了公司核心产品的前端架构，采用Next.js和TypeScript，提升了应用性能和开发效率",
                    metrics: "性能提升40%，开发效率提升30%",
                    technologies: ["Next.js", "TypeScript", "Tailwind CSS"]
                },
                {
                    description: "建立了组件库和设计系统，统一了产品的UI风格，减少了50%的样式维护成本",
                    metrics: "50%样式维护成本降低",
                    technologies: ["Storybook", "Styled Components", "Figma"]
                },
                {
                    description: "优化了前端CI/CD流程，将部署时间从30分钟缩短到5分钟",
                    metrics: "部署时间减少83%",
                    technologies: ["GitHub Actions", "Docker", "AWS"]
                },
                {
                    description: "指导初级开发人员，进行代码审查，提高团队整体技术水平",
                    technologies: ["React", "TypeScript", "Jest"]
                },
            ],
        },
        {
            title: "前端开发工程师",
            company: "互联网科技有限公司",
            location: "上海市",
            period: "2018年 - 2021年",
            achievements: [
                {
                    description: "参与开发了企业级SaaS平台，服务于超过5000家企业客户",
                    metrics: "5000+企业客户",
                    technologies: ["React", "Redux", "Ant Design"]
                },
                {
                    description: "实现了复杂的数据可视化功能，提升了用户数据分析效率",
                    metrics: "数据分析效率提升60%",
                    technologies: ["ECharts", "D3.js", "WebGL"]
                },
                {
                    description: "重构了遗留前端代码，减少了30%的代码量，提高了代码可维护性",
                    metrics: "代码量减少30%",
                    technologies: ["TypeScript", "ESLint", "Prettier"]
                },
                {
                    description: "参与敏捷开发流程，保证功能按时交付，获得团队最佳协作奖",
                    technologies: ["Scrum", "Jira", "Git"]
                },
            ],
        },
    ],
    education: [
        {
            degree: "计算机科学与技术硕士",
            institution: "北京大学",
            period: "2016年 - 2018年",
            description: "专注于人工智能和Web技术研究。获得优秀毕业生称号。GPA: 3.8/4.0",
            major: "计算机科学",
            gpa: 3.8,
            courses: ["高级Web技术", "机器学习", "数据挖掘", "计算机视觉"]
        },
        {
            degree: "软件工程学士",
            institution: "上海交通大学",
            period: "2012年 - 2016年",
            description: "连续四年获得学院奖学金。参与ACM程序设计竞赛。GPA: 3.7/4.0",
            major: "软件工程",
            gpa: 3.7,
            courses: ["数据结构", "算法分析", "数据库系统", "Web开发基础"]
        },
    ],
    skills: [
        { name: "JavaScript/TypeScript", level: 95 },
        { name: "React/Next.js", level: 90 },
        { name: "Vue.js", level: 85 },
        { name: "HTML5/CSS3", level: 90 },
        { name: "Webpack/Vite", level: 80 },
        { name: "Node.js", level: 75 },
        { name: "UI/UX设计", level: 70 },
        { name: "性能优化", level: 85 },
    ],
    languages: [
        { name: "中文", proficiency: "Native" },
        { name: "英语", proficiency: "Professional" },
        { name: "日语", proficiency: "Elementary" },
    ],
    certificates: [
        {
            name: "阿里巴巴前端开发认证",
            issuer: "阿里巴巴",
            date: "2022年",
            url: "https://developer.aliyun.com/",
        },
        {
            name: "Google Associate Android Developer",
            issuer: "Google",
            date: "2020年",
            url: "https://developers.google.com/certification/",
        },
    ],
    projects: [
        {
            name: "企业数据分析平台",
            description: "为企业提供实时数据分析和可视化的平台，支持多维度数据展示和报表导出",
            technologies: ["React", "ECharts", "AntD", "Node.js", "MongoDB"],
            url: "https://data-platform.example.com",
            github: "github.com/xiaoming/data-platform",
            period: "2020年 - 2021年",
            role: "前端负责人"
        },
        {
            name: "移动端电商应用",
            description: "基于React Native开发的跨平台电商应用，支持商品浏览、搜索、购物车和支付功能",
            technologies: ["React Native", "Redux", "Firebase", "支付宝API"],
            url: "https://shop.example.com",
            github: "github.com/xiaoming/mobile-shop",
            period: "2019年 - 2020年",
            role: "移动端开发工程师"
        },
    ],
    awards: [
        {
            name: "年度最佳员工",
            issuer: "科技创新有限公司",
            date: "2022年",
            description: "因在产品重构中的突出贡献而获得公司年度最佳员工奖"
        },
        {
            name: "前端创新大赛一等奖",
            issuer: "中国软件开发者大会",
            date: "2019年",
            description: "开发了一款创新的无障碍Web组件库，获得行业评委一致好评"
        }
    ]
}

/**
 * 默认导出的简历数据
 * @description 默认使用英文版本的简历数据
 * @type {ResumeData}
 */
export const resumeData = resumeDataEn
