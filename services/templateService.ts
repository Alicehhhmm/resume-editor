import type { Template } from '@/types/resume-template';

export const fetchTemplates = async ({ pageParam = 1 }): Promise<{
  data: Template[];
  nextPage: number | null;
}> => {
  const response = await fetch(`/api/templates?page=${pageParam}`, {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch templates');
  }

  const data = await response.json() as Record<string, Template[]>;
  const result: Template[] = Object.values(data).flat();

  // 过滤无效数据
  const validData = result.filter(
    (template) => template !== null && template !== undefined
  );

  // 模拟分页逻辑
  const pageSize = 10; // 每页数量
  const startIndex = (pageParam - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = validData.slice(startIndex, endIndex);

  return {
    data: paginatedData,
    nextPage: endIndex < validData.length ? pageParam + 1 : null,
  };
};