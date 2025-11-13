export default function Title({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h3
      className={`text-center font-semibold text-xl sm:text-3xl mb-4 text-[#333333] ${className}`}
    >
      {children}
    </h3>
  );
}
