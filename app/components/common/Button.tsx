"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import clsx from "clsx";
import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  className?: string;
  variant?: "primary" | "secondary";
}

export default function Button({ children, href = "#", className, variant = "primary" }: ButtonProps) {
  const base =
    "group relative inline-flex items-center justify-center overflow-hidden rounded-full px-[22px] py-[12px] text-[14px] font-normal transition-all duration-300 tracking-wide";

  const primary = "bg-[#0000FF] text-[#EDEDED] hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(0,0,255,0.45)]";

  const secondary = "bg-transparent text-white hover:bg-white/5 hover:scale-[1.01]";

  const classes = clsx(base, variant === "secondary" ? secondary : primary, className);

  return (
    <Link
      href={href}
      className={classes}
    >
      {variant !== "secondary" && (
        <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      )}

      {variant === "secondary" && (
        <span
          aria-hidden
          className="absolute inset-0 pointer-events-none rounded-full border-[1px] border-white/90 transition-colors duration-300 group-hover:border-[#0000FF] group-hover:bg-[#0000FF]/20 box-border"
        />
      )}

      <span className="relative z-10 flex items-center gap-3">
        {children}

        <ArrowRight size={20} strokeWidth={2} className="transition-transform duration-300 group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
