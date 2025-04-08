import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { ContentEditPanel } from '@/views/edit/edit-panels/content-edit'
import { ModuleManagePanel } from '@/views/edit/edit-panels/module-manage'

export const EditPanels = () => {
    return (
        <div className="size-full flex flex-col">
            <Tabs defaultValue="content-edit" className="flex-1 flex flex-col">
                <div className="border-b px-4 py-2 bg-background sticky top-0 z-10">
                    <TabsList className="w-full">
                        <TabsTrigger value="content-edit" className="flex-1">
                            内容编辑
                        </TabsTrigger>
                        <TabsTrigger value="module-manage" className="flex-1">
                            模块管理
                        </TabsTrigger>
                    </TabsList>
                </div>

                {/* 内容编辑面板 */}
                <TabsContent value="content-edit" className="flex-1">
                    <ScrollArea className="h-[calc(100vh-110px)]">
                        <ContentEditPanel />
                    </ScrollArea>
                </TabsContent>

                {/* 模块管理面板 */}
                <TabsContent value="module-manage" className="flex-1">
                    <ScrollArea className="h-[calc(100vh-110px)]">
                        <ModuleManagePanel />
                    </ScrollArea>
                </TabsContent>
            </Tabs>
        </div>
    )
}
