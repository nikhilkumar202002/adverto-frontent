"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";

import Container from "../common/Container";
import Button from "../common/Button";
import NavLink from "./NavLink";
import MobileMenu from "./MobileMenu";

const navItems = [
  { label: "Work", href: "/portfolio" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Team", href: "/team" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isTransparent, setIsTransparent] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    lastScrollYRef.current = window.scrollY;

    const onScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollingUp = currentScrollY < lastScrollYRef.current;
      const nearTop = currentScrollY < 12;
      const stickyActive = currentScrollY > 12;
      const navProbeY = currentScrollY + 96;
      const transparentSection = Array.from(
        document.querySelectorAll<HTMLElement>("[data-navbar-transparent]")
      ).some((section) => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;

        return navProbeY >= sectionTop && navProbeY <= sectionBottom;
      });

      setHasScrolled(stickyActive);
      setIsTransparent(nearTop || (transparentSection && !stickyActive));
      setIsVisible(nearTop || scrollingUp || transparentSection);
      lastScrollYRef.current = currentScrollY;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <>
      <header
        className={`fixed left-0 top-0 z-50 w-full rounded-none border-b transition-[background-color,backdrop-filter,border-color,box-shadow,transform] duration-500 ease-out ${
          isTransparent
            ? "border-transparent bg-transparent shadow-none backdrop-blur-0"
            : "border-white/10 bg-black/72 shadow-[0_18px_60px_rgba(0,0,0,0.28)] backdrop-blur-xl"
        } ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <Container
          className={`flex items-center justify-between transition-[padding] duration-500 ease-out ${
            hasScrolled ? "py-4" : "py-6"
          }`}
        >
          
          <Link
            href="/"
            aria-label="Adverto home"
            className="inline-block transition hover:opacity-90"
          >
            <img
              src="/main-logo.svg"
              alt="Adverto"
              width={128}
              height={32}
              decoding="async"
              className="h-8 w-auto"
            />
          </Link>

          <div className="flex items-center gap-6 ml-auto">
            {/* Desktop Nav */}
            <nav className="hidden items-center gap-[20px] md:flex">
              {navItems.map((item) => (
                <NavLink
                  key={item.label}
                  href={item.href}
                  label={item.label}
                />
              ))}
            </nav>

            {/* Right */}
            <div className="hidden md:block">
              <Button href="/contact">Start a Project</Button>
            </div>

            {/* Mobile Button */}
            <button className="text-white md:hidden" onClick={() => setIsOpen(true)}>
              <Menu size={30} />
            </button>
          </div>
        </Container>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        navItems={navItems}
      />
    </>
  );
}
