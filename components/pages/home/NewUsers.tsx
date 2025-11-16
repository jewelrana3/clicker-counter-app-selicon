import Link from "next/link";

const users = [
  { type: "User", name: "Md Hassan", id: "2341651561", date: "4/12/2025" },
  {
    type: "Business user",
    name: "Md Jolil",
    id: "5614564154",
    date: "4/12/2025",
  },
  { type: "User", name: "Md Masum", id: "5724525544", date: "4/12/2025" },
  { type: "User", name: "Tuhin vai", id: "1256988452", date: "4/12/2025" },
  {
    type: "Business user",
    name: "Azizul Haq",
    id: "1236598632",
    date: "4/12/2025",
  },
  { type: "User", name: "Sabbir bro", id: "5724525544", date: "4/12/2025" },
];

export default function UsersHomePage() {
  return (
    <div className="bg-white p-6 rounded-md shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-medium text-gray-800">New Users</h2>
        <div className="flex items-center space-x-4">
          <span className="flex items-center text-sm">
            <span className="w-2 h-2 rounded-full bg-red-500 mr-1" /> 200
          </span>
          <span className="flex items-center text-sm">
            <span className="w-2 h-2 rounded-full bg-orange-400 mr-1" /> 50
          </span>
          <Link
            href="/users"
            className="text-green-600 text-sm font-medium cursor-pointer"
          >
            See More
          </Link>
        </div>
      </div>
      <table className="w-full text-sm text-left">
        <thead className="text-[#17307C] font-semibold border-b">
          <tr>
            <th className="py-2">User type</th>
            <th className="py-2">User Name</th>
            <th className="py-2">User ID.</th>
            <th className="py-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, idx) => (
            <tr key={idx} className="border-b">
              <td
                className={`py-2 ${
                  user.type === "User" ? "text-red-500" : "text-orange-400"
                }`}
              >
                {user.type}
              </td>
              <td className="py-2">{user.name}</td>
              <td className="py-2">{user.id}</td>
              <td className="py-2">{user.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
