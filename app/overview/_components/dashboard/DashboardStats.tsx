import React from "react";
import { Card } from "@/components/ui/card";
import { BotIcon, LinkIcon, ListCollapseIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const DashboardStats: React.FC = () => {
  const stats = [
    { value: 20, label: "Bots", percentage: "54%" },
    { value: "55%", label: "Link", percentage: "Temp" },
  ];

  return (
    <div className="grid grid-cols-4 gap-2">
      {stats.map((item, index) => (
        <Card
          key={index}
          className={`p-3 bg-blue-500 text-white h-full flex justify-between items-center `}>
          <div className="flex flex-col justify-between h-full">
            <div className="icon bg-black shadow text-center rounded-full p-2">
              {item.label === "Bots" && <BotIcon className="text-dark text-gradient" />}
              {item.label === "Link" && <LinkIcon className="text-dark text-gradient" />}
            </div>
          </div>
          <div>
            <h5 className="font-bold mb-0">{item.value}</h5>
            <span className="text-sm">{item.label}</span>
          </div>
        </Card>
      ))}
      <Card
        className={`p-3 bg-blue-500 text-white h-full flex justify-between items-center col-span-2`}>
        <div className="flex items-start flex-col justify-between h-full">
          <div className="icon bg-black shadow text-center rounded-full p-2">
            <BotIcon className="text-dark text-gradient" />
          </div>
          <div>
            <h5 className="font-bold mb-0">{ }</h5>
            <span className="text-sm">Create New Bot</span>
          </div>
        </div>
        <Button>Create New Bot</Button>
      </Card>
    </div>
  );
};

export default DashboardStats;