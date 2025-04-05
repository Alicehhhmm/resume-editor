import type { Template } from '@/types/resume-template';
import { getStorageItem, setStorageItem, removeStorageItem } from '@/lib/storage';

// 从API获取模板列表
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

// 存储相关常量
const STORAGE_KEYS = {
  RESUME_TEMPLATE: 'resumeTemplate',
};

/**
 * 保存模板到存储
 * @param template 要保存的模板
 */
export const saveTemplateToStorage = (template: Template): void => {
  setStorageItem(STORAGE_KEYS.RESUME_TEMPLATE, template);
};

/**
 * 从存储获取模板
 * @returns 保存的模板或 null
 */
export const getTemplateFromStorage = (): Template | null => {
  return getStorageItem<Template>(STORAGE_KEYS.RESUME_TEMPLATE);
};

/**
 * 从存储删除模板
 */
export const removeTemplateFromStorage = (): void => {
  removeStorageItem(STORAGE_KEYS.RESUME_TEMPLATE);
};