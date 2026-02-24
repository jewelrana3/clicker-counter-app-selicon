import { Loader2 } from "lucide-react";
import React from "react";

const TotalChatGroupCard = ({
  data,
  loading,
}: {
  data: any;
  loading: boolean;
}) => {
  return (
    <div className="grid lg:grid-cols-3 gap-6 mb-8">
      <div className="border border-gray-200 rounded-3xl shadow-sm flex flex-col items-center justify-center py-6 bg-white hover:shadow-md transition-shadow">
        <h2 className="text-gray-500 text-lg font-medium">Total Chat Group</h2>
        {loading ? (
          <Loader2 className="h-8 w-8 animate-spin text-gray-300 mt-2" />
        ) : (
          <p className="text-4xl font-bold text-gray-800 mt-1">
            {data?.totalChats || 0}
          </p>
        )}
      </div>
      <div className="border border-gray-200 rounded-3xl shadow-sm flex flex-col items-center justify-center py-6 bg-white hover:shadow-md transition-shadow">
        <h2 className="text-gray-500 text-lg font-medium">Active Chat Group</h2>
        {loading ? (
          <Loader2 className="h-8 w-8 animate-spin text-gray-300 mt-2" />
        ) : (
          <p className="text-4xl font-bold text-green-600 mt-1">
            {data?.activeChats || 0}
          </p>
        )}
      </div>
      <div className="border border-gray-200 rounded-3xl shadow-sm flex flex-col items-center justify-center py-6 bg-white hover:shadow-md transition-shadow">
        <h2 className="text-gray-500 text-lg font-medium">
          Blocked Chat Group
        </h2>
        {loading ? (
          <Loader2 className="h-8 w-8 animate-spin text-gray-300 mt-2" />
        ) : (
          <p className="text-4xl font-bold text-red-500 mt-1">
            {data?.inactiveChats || 0}
          </p>
        )}
      </div>
    </div>
  );
};

export default TotalChatGroupCard;
