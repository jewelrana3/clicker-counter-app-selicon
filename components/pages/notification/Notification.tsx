export default function Notification() {
  return (
    <div>
      {Array.from({ length: 6 }).map((_, index) => (
        <div className="border rounded-lg p-4 my-3">
          <h1 className="text-lg text-[#000000]">Email Notification</h1>
          <p className="text-[#606060]">
            Receive email updates about your account
          </p>
        </div>
      ))}
    </div>
  );
}
