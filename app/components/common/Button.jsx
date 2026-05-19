"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import clsx from "clsx";

export default function Button({
  children,
  href = "#",
  className,
}) {
  return (
    <Link
      href={href}
      className={clsx(
        "group relative inline-flex items-center justify-center overflow-hidden bg-[#0000FF] px-[22px] py-[12px] text-[14px] font-normal text-[#EDEDED] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(0,0,255,0.45)] tracking-wide",
        className
      )}
      style={{
        // Updated to match the screenshot's chamfered corners (top-right and bottom-left)
        clipPath:
          "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))",
      }}
    >
      {/* Glow Overlay */}
      <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Content */}
      <span className="relative z-10 flex items-center gap-3">
        {children}

        <ArrowRight
          size={20}
          strokeWidth={2}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      </span>
    </Link>
  );
}