"use client";

import Link from "next/link";
import { ArrowUp } from "lucide-react";
import Button from "../common/Button";
import Container from "../common/Container";

type IconProps = {
  size?: number;
  className?: string;
};

const Behance = ({ size = 18, className = "" }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14h-8.027c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988h-6.466v-14.967h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zm-3.466-8.988h3.584c2.508 0 2.906-3-.312-3h-3.272v3zm3.391 3h-3.391v3.016h3.341c3.055 0 2.868-3.016.05-3.016z" />
  </svg>
);

const Instagram = ({ size = 18, className = "" }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    className={className}
    aria-hidden="true"
  >
    <rect x="3" y="3" width="18" height="18" rx="5" strokeWidth="1.5" />
    <circle cx="12" cy="12" r="3" strokeWidth="1.5" />
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
  </svg>
);

const Facebook = ({ size = 18, className = "" }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M22 12a10 10 0 10-11.5 9.9v-7h-2.2v-2.9h2.2V9.5c0-2.2 1.3-3.4 3.3-3.4.95 0 1.95.17 1.95.17v2.1h-1.07c-1.05 0-1.37.65-1.37 1.32v1.58h2.33l-.37 2.9h-1.96v7A10 10 0 0022 12z" />
  </svg>
);

const socials = [
  { label: "Facebook", content: <Facebook size={17} /> },
  { label: "Instagram", content: <Instagram size={17} /> },
  { label: "Behance", content: <Behance size={18} /> },
  { label: "LinkedIn", content: "in" },
  { label: "Pinterest", content: "p" },
  { label: "YouTube", content: "▶" },
  { label: "X", content: "X" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const moveToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative z-20 min-h-[100svh] overflow-hidden bg-black text-white">
      <Container className="relative z-10 flex min-h-[100svh] flex-col justify-between py-8 md:py-10">
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <h2 className="text-[clamp(72px,17vw,300px)] font-semibold leading-[0.78] tracking-normal text-[#f4f3ef]">
            Let&apos;s Talk
          </h2>

          <Button href="/contact" className="mt-20 max-md:mt-12">
            Contact Us
          </Button>
        </div>

        <button
          type="button"
          onClick={moveToTop}
          className="absolute bottom-[110px] right-[clamp(24px,4vw,80px)] hidden h-[74px] items-center gap-5 rounded-[22px] bg-white/15 pl-10 pr-2 text-[18px] font-semibold text-white/70 transition-colors duration-300 hover:bg-white/20 hover:text-white lg:inline-flex"
          aria-label="Move to top"
        >
          Move to top
          <span className="flex h-[62px] w-[62px] items-center justify-center rounded-[20px] bg-black/20 text-white">
            <ArrowUp size={24} strokeWidth={1.8} />
          </span>
        </button>

        <div className="grid items-center gap-6 pb-1 text-[15px] text-white/60 md:grid-cols-3">
          <p className="text-center md:text-left">
            Adverto © {currentYear} All rights reserved
          </p>

          <nav
            className="flex items-center justify-center gap-5 text-white/55"
            aria-label="Social links"
          >
            {socials.map((social) => (
              <a
                key={social.label}
                href="#"
                aria-label={social.label}
                className="flex h-6 min-w-4 items-center justify-center text-[18px] font-semibold leading-none transition-colors duration-300 hover:text-white"
              >
                {social.content}
              </a>
            ))}
          </nav>

          <div className="flex items-center justify-center gap-5 md:justify-end">
            <Link href="/privacy" className="transition-colors hover:text-white">
              Privacy Policy
            </Link>
            <span className="text-white/25">|</span>
            <Link href="/terms" className="transition-colors hover:text-white">
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
