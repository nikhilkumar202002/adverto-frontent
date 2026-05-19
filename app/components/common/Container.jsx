export default function Container({ children, className = "" }) {
  return (
    <div
      className={`mx-auto w-full px-[80px] max-xl:px-[60px] max-lg:px-[40px] max-md:px-[24px] ${className}`}
    >
      {children}
    </div>
  );
}