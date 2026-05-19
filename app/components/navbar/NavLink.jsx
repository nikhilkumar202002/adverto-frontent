import Link from "next/link";

export default function NavLink({ href, label }) {
  return (
    <Link
      href={href}
      className="group relative text-sm uppercase tracking-widest text-white/70 transition duration-300 hover:text-white"
    >
      {label}

      <span className="absolute -bottom-2 left-0 h-[1px] w-0 bg-[#0000FF] transition-all duration-300 group-hover:w-full" />
    </Link>
  );
}