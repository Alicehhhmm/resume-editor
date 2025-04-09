import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2 } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

type WorkExperience = {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string | null;
  isCurrentJob: boolean;
  description: string;
};

export const WorkExperiencePanel = () => {
  // 模拟数据
  const experiences: WorkExperience[] = [
    {
      id: "1",
      company: "示例公司",
      position: "前端开发工程师",
      startDate: "2021-01-01",
      endDate: "2023-06-30",
      isCurrentJob: false,
      description: "负责公司产品的前端开发，使用React、TypeScript等技术栈。参与了多个项目的开发和维护。"
    },
    {
      id: "2",
      company: "当前公司",
      position: "高级前端开发工程师",
      startDate: "2023-07-01",
      endDate: null,
      isCurrentJob: true,
      description: "负责团队的技术架构设计和开发工作，带领团队完成多个重要项目。"
    }
  ];

  // 占位函数
  const addExperience = () => {
    console.log("添加工作经历");
  };

  const removeExperience = (id: string) => {
    console.log("删除工作经历", id);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">工作经历</h3>
      
      <Accordion type="multiple" className="space-y-4">
        {experiences.map((exp) => (
          <AccordionItem key={exp.id} value={exp.id} className="border p-2 rounded-md">
            <div className="flex justify-between items-center">
              <AccordionTrigger className="text-left">
                <div>
                  <div className="font-medium">{exp.position}</div>
                  <div className="text-sm text-gray-500">{exp.company}</div>
                </div>
              </AccordionTrigger>
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  removeExperience(exp.id);
                }}
                className="text-red-500"
              >
                <Trash2 size={18} />
              </Button>
            </div>
            
            <AccordionContent className="pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`company-${exp.id}`}>公司名称</Label>
                  <Input id={`company-${exp.id}`} defaultValue={exp.company} />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor={`position-${exp.id}`}>职位</Label>
                  <Input id={`position-${exp.id}`} defaultValue={exp.position} />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor={`start-date-${exp.id}`}>开始日期</Label>
                  <Input 
                    id={`start-date-${exp.id}`} 
                    type="date" 
                    defaultValue={exp.startDate} 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor={`end-date-${exp.id}`}>结束日期</Label>
                  <Input 
                    id={`end-date-${exp.id}`} 
                    type="date" 
                    defaultValue={exp.endDate || ""} 
                    disabled={exp.isCurrentJob}
                  />
                </div>
                
                <div className="col-span-2 space-y-2">
                  <Label htmlFor={`description-${exp.id}`}>工作描述</Label>
                  <Textarea 
                    id={`description-${exp.id}`} 
                    defaultValue={exp.description}
                    rows={4}
                  />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      
      <Button
        variant="outline"
        className="w-full mt-4 flex items-center justify-center"
        onClick={addExperience}
      >
        <Plus size={16} className="mr-2" />
        添加工作经历
      </Button>
      
      <div className="flex justify-end mt-4">
        <Button>保存</Button>
      </div>
    </div>
  );
}; 