import { NextResponse } from 'next/server'

// 模板数据
const templates = {
    simple: [
        {
            id: 'simple-1',
            title: '简约简历模板',
            description: '清新简约风格',
            category: 'simple',
            thumbnail: '',

        },
        {
            id: 'simple-2',
            title: '极简风格',
            description: '黑白配色',
            category: 'simple',
            thumbnail: '',
        },
        {
            id: 'simple-21',
            title: '极简风格',
            description: '黑白配色',
            category: 'simple',
            thumbnail: '',
        },
        {
            id: 'simple-22',
            title: '极简风格',
            description: '黑白配色',
            category: 'simple',
            thumbnail: '',
        },
        {
            id: 'simple-23',
            title: '极简风格',
            description: '黑白配色',
            category: 'simple',
            thumbnail: '',
        },
        // ... 更多简约模板
    ],
    canon: [
        {
            id: 'canon-1',
            title: '经典商务',
            description: '传统专业风格',
            category: 'canon',
            thumbnail: '',

        },
        {
            id: 'canon-2',
            title: '标准简历',
            category: 'canon',
            description: '规范布局',
            thumbnail: '',

        },
        // ... 更多经典模板
    ],
    creativity: [
        {
            id: 'creative-1',
            title: '创意设计',
            category: 'creativity',
            description: '独特视觉效果',
            thumbnail: '',

        },
        {
            id: 'creative-2',
            title: '艺术简历',
            category: 'creativity',
            description: '个性化展示',
            thumbnail: '',

        },
        // ... 更多创意模板
    ],
    specialty: [
        {
            id: 'specialty-1',
            title: '技术简历',
            category: 'specialty',
            description: '突出专业技能',
            thumbnail: '',

        },
        {
            id: 'specialty-2',
            title: '学术简历',
            category: 'specialty',
            description: '研究成果展示',
            thumbnail: '',

        },
        // ... 更多专业模板
    ],
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get('page')) || 1;

    const allTemplates = Object.values(templates).flat();
    const pageSize = 10; // 每页数量
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedData = allTemplates.slice(startIndex, endIndex);

    // 确保返回的数据中没有 null 或 undefined
    const validData = paginatedData.filter(
        (template) => template !== null && template !== undefined
    );

    return NextResponse.json({
        data: validData,
        nextPage: endIndex < allTemplates.length ? page + 1 : null,
    });
}