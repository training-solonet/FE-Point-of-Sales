export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto lg:w-[80%] w-[90%] sm:w[90%] md:w-[85%] mt-3">
      {children}
    </div>
  );
}
