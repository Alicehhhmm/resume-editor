import type { Template } from "@/types/resume-template";

export const fetchTemplates = async (): Promise<Template[]> => {
    const response = await fetch('/api/templates', {
        method: 'GET',
    });

    if (!response.ok) {
        throw new Error('Failed to fetch templates');
    }

    const data = await response.json() as Record<string, Template[]>;
    const reslut: Template[] = Object.values(data).flat();

    return reslut;
}; 