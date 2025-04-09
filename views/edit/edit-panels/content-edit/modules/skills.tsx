import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Plus, Trash2 } from "lucide-react";

type Skill = {
  id: string;
  name: string;
  level: number;
};

export const SkillsPanel = () => {
  // 模拟数据
  const skills: Skill[] = [
    { id: "1", name: "JavaScript", level: 85 },
    { id: "2", name: "React", level: 80 },
    { id: "3", name: "Node.js", level: 75 },
    { id: "4", name: "TypeScript", level: 70 },
  ];

  // 占位函数
  const addSkill = () => {
    console.log("添加技能");
  };

  const removeSkill = (id: string) => {
    console.log("删除技能", id);
  };

  const updateSkillName = (id: string, name: string) => {
    console.log("更新技能名称", id, name);
  };

  const updateSkillLevel = (id: string, level: number) => {
    console.log("更新技能水平", id, level);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">专业技能</h3>
      
      <div className="space-y-4">
        {skills.map((skill) => (
          <div key={skill.id} className="flex items-center space-x-4 border p-3 rounded-md">
            <div className="flex-1">
              <Label htmlFor={`skill-${skill.id}`} className="text-sm text-gray-500">
                技能名称
              </Label>
              <Input
                id={`skill-${skill.id}`}
                value={skill.name}
                onChange={(e) => updateSkillName(skill.id, e.target.value)}
                className="mt-1"
              />
            </div>
            
            <div className="flex-1">
              <div className="flex justify-between">
                <Label htmlFor={`level-${skill.id}`} className="text-sm text-gray-500">
                  熟练度
                </Label>
                <span className="text-sm">{skill.level}%</span>
              </div>
              <Slider
                id={`level-${skill.id}`}
                value={[skill.level]}
                min={0}
                max={100}
                step={5}
                onValueChange={(values) => updateSkillLevel(skill.id, values[0])}
                className="mt-2"
              />
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeSkill(skill.id)}
              className="text-red-500"
            >
              <Trash2 size={18} />
            </Button>
          </div>
        ))}
      </div>
      
      <Button
        variant="outline"
        className="w-full mt-4 flex items-center justify-center"
        onClick={addSkill}
      >
        <Plus size={16} className="mr-2" />
        添加技能
      </Button>
      
      <div className="flex justify-end mt-4">
        <Button>保存</Button>
      </div>
    </div>
  );
}; 