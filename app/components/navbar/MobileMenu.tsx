"use client";

import Link from "next/link";
import { X } from "lucide-react";

export default function MobileMenu({
  isOpen,
  setIsOpen,
  navItems,
}: {
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
  navItems: { label: string; href: string }[];
}) {
  return (
    <div
      className={`fixed inset-0 z-50 bg-black/95 backdrop-blur-xl transition-all duration-500 ${
        isOpen
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0"
      }`}
    >
      {/* Top */}
      <div className="flex items-center justify-between border-b border-white/10 px-[24px] py-6">
        <Link href="/" className="text-[14px] font-normal uppercase tracking-[0.2em] text-[#EDEDED]">
          Adverto
        </Link>

        <button onClick={() => setIsOpen(false)}>
          <X size={30} className="text-[#EDEDED]" />
        </button>
      </div>

      {/* Links */}
      <div className="flex h-[80vh] flex-col items-center justify-center gap-10">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            onClick={() => setIsOpen(false)}
            className="text-[14px] font-normal uppercase tracking-wider text-[#EDEDED] transition hover:text-[#0000FF]"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}