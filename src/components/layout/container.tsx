export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto lg:w-[85%] w-[90%] sm:w[90%] md:w-[95%] mt-3">
      {children}
    </div>
  );
}
