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

// 处理 GET 请求
export async function GET() {
  return NextResponse.json(templates);
}

// 处理 POST 请求
export const POST = async (request: Request) => {
  const { category } = await request.json();
  return NextResponse.json(templates);
};