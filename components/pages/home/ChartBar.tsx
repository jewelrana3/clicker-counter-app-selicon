"use client";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { getEarningGrowthAction } from "@/app/actions/getEarningGrowthAction";
import { Loader2 } from "lucide-react";

const EarningStatisticsChart = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear().toString(),
  );

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await getEarningGrowthAction(selectedYear);
        if (res.success && res.data) {
          // Map API data to chart data format
          const formattedData = res.data.map((item: any) => ({
            name: item.month,
            uv: item.totalEarnings,
          }));
          setData(formattedData);
        }
      } catch (error) {
        console.error("Fetch earning statistics error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedYear]);

  return (
    <div className="w-full bg-white p-6 rounded-xl shadow-sm border border-gray-100/50">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold text-gray-800">
          Earning Statistics
        </h1>
        <Select value={selectedYear} onValueChange={setSelectedYear}>
          <SelectTrigger className="w-[140px] bg-gray-50/50 border-gray-200 rounded-lg">
            <SelectValue placeholder="Year" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {Array.from({ length: 5 }, (_, i) => {
                const year = (new Date().getFullYear() - i).toString();
                return (
                  <SelectItem key={year} value={year}>
                    {year}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="w-full h-[480px] relative">
        {loading && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/50 backdrop-blur-[1px]">
            <Loader2 className="h-8 w-8 animate-spin text-[#E40004]" />
            <p className="mt-2 text-sm text-gray-500 font-medium tracking-wide">
              Loading earnings...
            </p>
          </div>
        )}

        {data.length === 0 && !loading ? (
          <div className="flex items-center justify-center h-full text-gray-500 font-medium">
            No earning data found for {selectedYear}
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              barSize={32}
              margin={{ top: 10, right: 10, left: -20, bottom: 20 }}
            >
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#9ca3af", fontSize: 12 }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#9ca3af", fontSize: 12 }}
                width={40}
              />
              <Tooltip
                cursor={{ fill: "#f3f4f6" }}
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #f3f4f6",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
                labelStyle={{ color: "#374151", fontWeight: "bold" }}
              />
              <Bar dataKey="uv" fill="#E40004" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default EarningStatisticsChart;
