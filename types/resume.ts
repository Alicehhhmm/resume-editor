/**
 * 简历数据类型定义
 * @description 用于填充简历模板的数据类型
 */

/**
 * 联系方式类型
 * @interface ContactInfo
 * @property {string} phone - 电话号码
 * @property {string} email - 电子邮箱
 * @property {string} location - 居住地
 * @property {string} [website] - 个人网站
 * @property {string} [linkedin] - LinkedIn 链接
 * @property {string} [github] - GitHub 链接
 * @property {string} [twitter] - Twitter 链接
 * @property {string} [wechat] - 微信
 * @property {string} [blog] - 博客链接
 */
export interface ContactInfo {
  phone: string
  email: string
  location: string
  website?: string
  linkedin?: string
  github?: string
  twitter?: string
  wechat?: string
  blog?: string
}

/**
 * 个人信息类型
 * @interface PersonalInfo
 * @property {string} name - 姓名
 * @property {string} title - 职位/头衔
 * @property {string} [avatar] - 头像URL
 * @property {ContactInfo} contact - 联系方式
 * @property {string} profile - 个人简介
 * @property {string} [birthDate] - 出生日期
 * @property {string} [nationality] - 国籍
 * @property {'Single' | 'Married' | 'Divorced'} [maritalStatus] - 婚姻状况
 * @property {string[]} [languages] - 语言能力
 * @property {string[]} [interests] - 兴趣爱好
 */
export interface PersonalInfo {
  name: string
  title: string
  avatar?: string
  contact: ContactInfo
  profile: string
  birthDate?: string
  nationality?: string
  maritalStatus?: 'Single' | 'Married' | 'Divorced'
  languages?: string[]
  interests?: string[]
}

/**
 * 工作成就类型
 * @interface Achievement
 * @property {string} description - 成就描述
 * @property {string} [metrics] - 可量化的成果
 * @property {string[]} [technologies] - 使用的技术栈
 * @property {string} [impact] - 项目影响
 * @property {string} [role] - 在项目中的角色
 * @property {string} [duration] - 项目持续时间
 */
export interface Achievement {
  description: string
  metrics?: string
  technologies?: string[]
  impact?: string
  role?: string
  duration?: string
}

/**
 * 工作经验类型
 * @interface WorkExperience
 * @property {string} title - 职位名称
 * @property {string} company - 公司名称
 * @property {string} location - 工作地点
 * @property {string} period - 工作时间段
 * @property {string} [department] - 部门
 * @property {'Full-time' | 'Part-time' | 'Contract' | 'Internship'} [employmentType] - 雇佣类型
 * @property {Achievement[]} achievements - 工作成就
 * @property {string[]} [technologies] - 整体使用的技术栈
 * @property {string[]} [responsibilities] - 主要职责
 * @property {string} [supervisor] - 直属上级
 * @property {string} [reasonForLeaving] - 离职原因
 */
export interface WorkExperience {
  title: string
  company: string
  location: string
  period: string
  department?: string
  employmentType?: 'Full-time' | 'Part-time' | 'Contract' | 'Internship'
  achievements: Achievement[]
  technologies?: string[]
  responsibilities?: string[]
  supervisor?: string
  reasonForLeaving?: string
}

/**
 * 教育经历类型
 * @interface Education
 * @property {string} degree - 学位
 * @property {string} institution - 学校名称
 * @property {string} period - 学习时间段
 * @property {string} description - 教育经历描述
 * @property {string} [major] - 主修专业
 * @property {string} [minor] - 辅修专业
 * @property {number} [gpa] - GPA成绩
 * @property {string[]} [courses] - 相关课程
 * @property {string[]} [honors] - 荣誉奖项
 * @property {string} [thesis] - 毕业论文
 * @property {string} [advisor] - 导师
 * @property {string[]} [activities] - 校园活动
 */
export interface Education {
  degree: string
  institution: string
  period: string
  description: string
  major?: string
  minor?: string
  gpa?: number
  courses?: string[]
  honors?: string[]
  thesis?: string
  advisor?: string
  activities?: string[]
}

/**
 * 技能类型
 * @interface Skill
 * @property {string} name - 技能名称
 * @property {number} level - 熟练度 (0-100)
 * @property {'Technical' | 'Soft' | 'Language' | 'Other'} [category] - 技能分类
 * @property {number} [yearsOfExperience] - 使用年限
 * @property {string} [lastUsed] - 最后使用时间
 * @property {string} [description] - 技能描述
 */
export interface Skill {
  name: string
  level: number
  category?: 'Technical' | 'Soft' | 'Language' | 'Other'
  yearsOfExperience?: number
  lastUsed?: string
  description?: string
}

/**
 * 语言类型
 * @interface Language
 * @property {string} name - 语言名称
 * @property {'Elementary' | 'Limited Working' | 'Professional' | 'Full Professional' | 'Native' | 'Bilingual'} proficiency - 熟练程度
 * @property {number} [reading] - 阅读能力 (0-100)
 * @property {number} [writing] - 写作能力 (0-100)
 * @property {number} [speaking] - 口语能力 (0-100)
 * @property {number} [listening] - 听力能力 (0-100)
 * @property {string} [certification] - 语言证书
 */
export interface Language {
  name: string
  proficiency: 'Elementary' | 'Limited Working' | 'Professional' | 'Full Professional' | 'Native' | 'Bilingual'
  reading?: number
  writing?: number
  speaking?: number
  listening?: number
  certification?: string
}

/**
 * 证书类型
 * @interface Certificate
 * @property {string} name - 证书名称
 * @property {string} issuer - 颁发机构
 * @property {string} date - 获得日期
 * @property {string} [url] - 证书链接
 * @property {string} [credentialId] - 证书编号
 * @property {string} [expirationDate] - 过期日期
 * @property {string} [description] - 证书描述
 * @property {string[]} [skills] - 相关技能
 */
export interface Certificate {
  name: string
  issuer: string
  date: string
  url?: string
  credentialId?: string
  expirationDate?: string
  description?: string
  skills?: string[]
}

/**
 * 项目类型
 * @interface Project
 * @property {string} name - 项目名称
 * @property {string} description - 项目描述
 * @property {string[]} technologies - 使用的技术
 * @property {string} [url] - 项目链接
 * @property {string} [github] - GitHub链接
 * @property {string} [period] - 项目周期
 * @property {string} [role] - 项目角色
 * @property {number} [teamSize] - 团队规模
 * @property {string[]} [responsibilities] - 项目职责
 * @property {string[]} [achievements] - 项目成果
 * @property {string[]} [challenges] - 项目挑战
 * @property {string} [client] - 客户/公司
 * @property {'Completed' | 'In Progress' | 'On Hold'} [status] - 项目状态
 */
export interface Project {
  name: string
  description: string
  technologies: string[]
  url?: string
  github?: string
  period?: string
  role?: string
  teamSize?: number
  responsibilities?: string[]
  achievements?: string[]
  challenges?: string[]
  client?: string
  status?: 'Completed' | 'In Progress' | 'On Hold'
}

/**
 * 奖项类型
 * @interface Award
 * @property {string} name - 奖项名称
 * @property {string} issuer - 颁发机构
 * @property {string} date - 获得日期
 * @property {string} [description] - 奖项描述
 * @property {string} [category] - 奖项类别
 * @property {'International' | 'National' | 'Regional' | 'Company'} [level] - 奖项级别
 * @property {string} [prize] - 奖项等级
 */
export interface Award {
  name: string
  issuer: string
  date: string
  description?: string
  category?: string
  level?: 'International' | 'National' | 'Regional' | 'Company'
  prize?: string
}

/**
 * 出版物类型
 * @interface Publication
 * @property {string} title - 出版物标题
 * @property {'Article' | 'Book' | 'Conference Paper' | 'Patent'} type - 出版物类型
 * @property {string} publisher - 出版商
 * @property {string} date - 出版日期
 * @property {string} [url] - 出版物链接
 * @property {string[]} [authors] - 作者列表
 * @property {string} [description] - 出版物描述
 * @property {string} [impact] - 影响力描述
 */
export interface Publication {
  title: string
  type: 'Article' | 'Book' | 'Conference Paper' | 'Patent'
  publisher: string
  date: string
  url?: string
  authors?: string[]
  description?: string
  impact?: string
}

/**
 * 志愿者经历类型
 * @interface VolunteerExperience
 * @property {string} organization - 组织名称
 * @property {string} role - 志愿者角色
 * @property {string} period - 服务时间
 * @property {string} [location] - 服务地点
 * @property {string} description - 经历描述
 * @property {string[]} [achievements] - 成就列表
 * @property {number} [hours] - 服务时长
 * @property {string[]} [skills] - 相关技能
 */
export interface VolunteerExperience {
  organization: string
  role: string
  period: string
  location?: string
  description: string
  achievements?: string[]
  hours?: number
  skills?: string[]
}

/**
 * 简历完整数据类型
 * @interface ResumeData
 * @property {PersonalInfo} personal - 个人信息
 * @property {WorkExperience[]} experience - 工作经验
 * @property {Education[]} education - 教育经历
 * @property {Skill[]} skills - 技能列表
 * @property {Language[]} languages - 语言能力
 * @property {Certificate[]} certificates - 证书列表
 * @property {Project[]} projects - 项目经历
 * @property {Award[]} [awards] - 获奖情况
 * @property {Publication[]} [publications] - 出版物
 * @property {VolunteerExperience[]} [volunteer] - 志愿者经历
 * @property {Array<{name: string, title: string, company: string, contact: string, relationship: string}>} [references] - 推荐人
 * @property {Array<{title: string, items: Array<{title: string, description: string, period?: string, [key: string]: any}>}>} [customSections] - 自定义部分
 */
export interface ResumeData {
  personal: PersonalInfo
  experience: WorkExperience[]
  education: Education[]
  skills: Skill[]
  languages: Language[]
  certificates: Certificate[]
  projects: Project[]
  awards?: Award[]
  publications?: Publication[]
  volunteer?: VolunteerExperience[]
  references?: {
    name: string
    title: string
    company: string
    contact: string
    relationship: string
  }[]
  customSections?: {
    title: string
    items: {
      title: string
      description: string
      period?: string
      [key: string]: any
    }[]
  }[]
}
