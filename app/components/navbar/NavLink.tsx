import Link from "next/link";

export default function NavLink({ href, label }: { href: string; label: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group relative text-[14px] text-[#EDEDED] font-regular tracking-wide transition duration-300 hover:text-white"
    >
      {label}

      <span className="absolute -bottom-2 left-0 h-[1px] w-0 bg-[#0000FF] transition-all duration-300 group-hover:w-full" />
    </Link>
  );
}