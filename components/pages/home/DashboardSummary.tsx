// DashboardSummary.jsx
import { MoveUp, Users } from "lucide-react";
import Image from "next/image";

const stats = [
  {
    title: "Total User",
    total: "20,555",
    daily: "+29",
    icon: "/home/person.png",
  },
  {
    title: "Total Business User",
    total: "4,000",
    daily: "+18",
    icon: "/home/person.png",
  },
  {
    title: "Total Earning",
    total: "802,500",
    daily: "+$10,253",
    icon: "/home/network.png",
  },
];

export default function DashboardSummary() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-6 ">
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className="bg-white  rounded-lg p-5 flex flex-col justify-between shadow-sm"
        >
          <div className="flex items-center gap-3">
            <Image
              src={stat.icon}
              alt={stat.title}
              width={60}
              height={60}
              priority
              sizes="100vh"
            />
            <h3 className="font-medium text-xl mb-2 text-gray-800">
              {stat.title}
            </h3>
          </div>
          <p className="text-sm  text-gray-400 my-3">13 Dec, 2024</p>
          <div className="flex items-center justify-between">
            <p className="text-xl text-gray-800">Total : ${stat.total}</p>
            <div className="flex">
              <p className={`mt-1 text-sm  `}>
                Daily :{" "}
                <span className="font-semibold text-green-600">
                  {stat.daily}
                </span>
              </p>
              <p className="text-green-600">
                <MoveUp />
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
