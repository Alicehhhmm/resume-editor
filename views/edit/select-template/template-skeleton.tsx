import { Skeleton } from '@/components/ui/skeleton'

/**
 * 模板选择视图的骨架屏组件
 * @description 在模板数据加载时显示占位内容
 */
export const TemplateViewSkeleton = () => {
    return (
        <div className="h-full flex flex-col space-y-6">
            <div className="px-4 pt-4 space-y-1">
                <h1 className="text-xl font-semibold">推荐模板</h1>
                <p className="text-sm text-muted-foreground">
                    选择一个适合你的简历模板开始创建
                </p>
            </div>

            <div className="px-2">
                <div className="flex space-x-2">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <Skeleton key={index} className="h-10 w-20" />
                    ))}
                </div>
            </div>

            <div className="flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <Skeleton
                            key={index}
                            className="aspect-[3/4] rounded-lg"
                        />
                    ))}
                </div>
            </div>
        </div>
    )
} 