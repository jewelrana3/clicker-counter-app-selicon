"use client";
import { Bar, BarChart, ResponsiveContainer, XAxis } from "recharts";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const data = [
  { name: "Jan", uv: 4000 },
  { name: "Feb", uv: 3000 },
  { name: "Mar", uv: 2000 },
  { name: "Apr", uv: 2780 },
  { name: "May", uv: 1890 },
  { name: "Jun", uv: 2390 },
  { name: "Jul", uv: 3490 },
  { name: "Aug", uv: 4000 },
  { name: "Sep", uv: 3000 },
  { name: "Oct", uv: 2000 },
  { name: "Nov", uv: 2780 },
  { name: "Dec", uv: 1890 },
];

const TinyBarChart = () => {
  return (
    <div className="w-full rounded-2xl bg-white p-4 border">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl text-gray-800 font-medium">
          Earning Statistics
        </h1>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a Year" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="2025">2025</SelectItem>
              <SelectItem value="2026">2026</SelectItem>
              <SelectItem value="2027">2027</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* 👇 MUST have height to render */}
      <div className="w-full h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="name" />

            <Bar dataKey="uv" width={200} fill="#E40004" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TinyBarChart;
