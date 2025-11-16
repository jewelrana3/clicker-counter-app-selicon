import TinyBarChart from "@/components/pages/home/ChartBar";
import DashboardSummary from "@/components/pages/home/DashboardSummary";
import LineChartPage from "@/components/pages/home/LineChart";
import ActivityMap from "@/components/pages/home/map";
import UsersHomePage from "@/components/pages/home/NewUsers";

export default function Home() {
  return (
    <div className=" overflow-y-scroll h-[calc(100vh-115px)] scroll-hidden">
      <DashboardSummary />
      <div className="grid grid-cols-1 md:grid-cols-[auto_35%] gap-6">
        <LineChartPage />
        <UsersHomePage />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[auto_45%] gap-6 mt-20">
        <ActivityMap />
        <TinyBarChart />
      </div>
    </div>
  );
}
