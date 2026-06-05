"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    lastScrollYRef.current = window.scrollY;

    const onScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollingUp = currentScrollY < lastScrollYRef.current;
      const nearTop = currentScrollY < 12;
      const navProbeY = currentScrollY + 96;
      const transparentSection = Array.from(
        document.querySelectorAll<HTMLElement>("[data-navbar-transparent]")
      ).some((section) => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;

        return navProbeY >= sectionTop && navProbeY <= sectionBottom;
      });

      setIsTransparent(transparentSection);
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
        className={`fixed left-0 top-0 z-50 w-full transition-[background-color,backdrop-filter,transform] duration-300 ease-out ${
          isTransparent ? "bg-transparent backdrop-blur-0" : "bg-black/70 backdrop-blur-md"
        } ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <Container className="flex items-center justify-between py-6">
          
          <Link
            href="/"
            aria-label="Adverto home"
            className="inline-block transition hover:opacity-90"
          >
            <Image
              src="/main-logo.svg"
              alt="Adverto"
              width={128}
              height={32}
              className="h-8 w-auto"
              style={{ width: "auto" }}
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
