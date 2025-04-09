import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2 } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

type Education = {
  id: string;
  school: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string | null;
  isCurrentSchool: boolean;
  description: string;
};

export const EducationPanel = () => {
  // 模拟数据
  const educations: Education[] = [
    {
      id: "1",
      school: "示例大学",
      degree: "学士",
      field: "计算机科学",
      startDate: "2017-09-01",
      endDate: "2021-06-30",
      isCurrentSchool: false,
      description: "主修计算机科学与技术，辅修数学。GPA 3.8/4.0，获得校级奖学金。"
    },
    {
      id: "2",
      school: "示范学院",
      degree: "硕士",
      field: "软件工程",
      startDate: "2021-09-01",
      endDate: null,
      isCurrentSchool: true,
      description: "研究方向为人工智能与数据挖掘，参与多个研究项目。"
    }
  ];

  // 占位函数
  const addEducation = () => {
    console.log("添加教育经历");
  };

  const removeEducation = (id: string) => {
    console.log("删除教育经历", id);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">教育经历</h3>
      
      <Accordion type="multiple" className="space-y-4">
        {educations.map((edu) => (
          <AccordionItem key={edu.id} value={edu.id} className="border p-2 rounded-md">
            <div className="flex justify-between items-center">
              <AccordionTrigger className="text-left">
                <div>
                  <div className="font-medium">{edu.school}</div>
                  <div className="text-sm text-gray-500">{edu.degree} · {edu.field}</div>
                </div>
              </AccordionTrigger>
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  removeEducation(edu.id);
                }}
                className="text-red-500"
              >
                <Trash2 size={18} />
              </Button>
            </div>
            
            <AccordionContent className="pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`school-${edu.id}`}>学校名称</Label>
                  <Input id={`school-${edu.id}`} defaultValue={edu.school} />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor={`degree-${edu.id}`}>学位</Label>
                  <Input id={`degree-${edu.id}`} defaultValue={edu.degree} />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor={`field-${edu.id}`}>专业</Label>
                  <Input id={`field-${edu.id}`} defaultValue={edu.field} />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor={`gpa-${edu.id}`}>GPA</Label>
                  <Input id={`gpa-${edu.id}`} placeholder="选填，例如：3.8/4.0" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor={`start-date-${edu.id}`}>开始日期</Label>
                  <Input 
                    id={`start-date-${edu.id}`} 
                    type="date" 
                    defaultValue={edu.startDate} 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor={`end-date-${edu.id}`}>结束日期</Label>
                  <Input 
                    id={`end-date-${edu.id}`} 
                    type="date" 
                    defaultValue={edu.endDate || ""} 
                    disabled={edu.isCurrentSchool}
                  />
                </div>
                
                <div className="col-span-2 space-y-2">
                  <Label htmlFor={`description-${edu.id}`}>教育描述</Label>
                  <Textarea 
                    id={`description-${edu.id}`} 
                    defaultValue={edu.description}
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
        onClick={addEducation}
      >
        <Plus size={16} className="mr-2" />
        添加教育经历
      </Button>
      
      <div className="flex justify-end mt-4">
        <Button>保存</Button>
      </div>
    </div>
  );
}; 