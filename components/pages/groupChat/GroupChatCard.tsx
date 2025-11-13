import React from "react";

const TotalChatGroupCard = () => {
  return (
    <div className="grid lg:grid-cols-3 space-x-5 xl:space-x-20 gap-2">
      <div className=" border border-gray-200 rounded-md shadow-sm flex flex-col items-center justify-center py-4 bg-white">
        <h2 className="text-gray-600 text-lg font-medium">Total Chat Group</h2>
        <p className="text-4xl font-semibold text-gray-800 mt-1">15</p>
      </div>
      <div className=" border border-gray-200 rounded-md shadow-sm flex flex-col items-center justify-center py-4 bg-white">
        <h2 className="text-gray-600 text-lg font-medium">Active Chat Group</h2>
        <p className="text-4xl font-semibold text-gray-800 mt-1">10</p>
      </div>
      <div className=" border border-gray-200 rounded-md shadow-sm flex flex-col items-center justify-center py-4 bg-white">
        <h2 className="text-gray-600 text-lg font-medium">Block Chat Group</h2>
        <p className="text-4xl font-semibold text-gray-800 mt-1">5</p>
      </div>
    </div>
  );
};

export default TotalChatGroupCard;
