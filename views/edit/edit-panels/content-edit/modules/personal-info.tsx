import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export const PersonalInfoPanel = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">个人信息</h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">姓名</Label>
          <Input id="name" placeholder="请输入姓名" />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="title">职位</Label>
          <Input id="title" placeholder="请输入职位" />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">邮箱</Label>
          <Input id="email" placeholder="请输入邮箱" type="email" />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phone">电话</Label>
          <Input id="phone" placeholder="请输入电话" />
        </div>
        
        <div className="space-y-2 col-span-2">
          <Label htmlFor="location">地址</Label>
          <Input id="location" placeholder="请输入地址" />
        </div>
        
        <div className="space-y-2 col-span-2">
          <Label htmlFor="summary">个人简介</Label>
          <Textarea id="summary" placeholder="请简要介绍自己" rows={4} />
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button>保存</Button>
      </div>
    </div>
  );
}; 