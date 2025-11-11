export default function Title({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-center font-semibold text-3xl mb-4 text-[#333333]">
      {children}
    </h3>
  );
}
