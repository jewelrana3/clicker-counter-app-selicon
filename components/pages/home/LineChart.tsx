"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  ResponsiveContainer,
} from "recharts";

// Monthly user data for 2025
const data = [
  { name: "Jan", user: 2000, business: 1900 },
  { name: "Feb", user: 3000, business: 2500 },
  { name: "Mar", user: 5000, business: 4000 },
  { name: "Apr", user: 8000, business: 7000 },
  { name: "May", user: 10000, business: 8000 },
  { name: "Jun", user: 7000, business: 5000 },
  { name: "Jul", user: 6000, business: 5000 },
  { name: "Aug", user: 9000, business: 7000 },
  { name: "Sept", user: 15000, business: 13000 },
  { name: "Oct", user: 12000, business: 10000 },
  { name: "Nov", user: 5000, business: 4000 },
  { name: "Dec", user: 4000, business: 3000 },
];

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function UserStatisticsChart() {
  return (
    <div className="w-full h-[40vh] bg-white p-6 rounded-md shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-medium text-gray-800">User Statistics</h2>
        <div>
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
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{ fill: "#6B7280" }} />

          <Tooltip
            contentStyle={{ backgroundColor: "#333", color: "#fff" }}
            labelStyle={{ color: "#fff" }}
          />

          <Line
            type="monotone"
            dataKey="user"
            stroke="#EF4444"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
            name="User"
          />
          <Line
            type="monotone"
            dataKey="business"
            stroke="#F97316" // Tailwind orange-500
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
            name="Business User"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
