"use client";

import { useState, useEffect } from "react";
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
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollDirection, setScrollDirection] = useState('up');
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY) {
        // Scrolling down
        setScrollDirection('down');
      } else {
        // Scrolling up
        setScrollDirection('up');
      }
      
      setLastScrollY(currentScrollY);
      setIsScrolled(currentScrollY > 20);
    };

    // initial check
    if (typeof window !== "undefined") onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastScrollY]);

  return (
    <>
      <header 
        style={{ position: scrollDirection === 'down' && isScrolled ? 'absolute' : 'fixed' }}
        className={`top-0 left-0 z-40 w-full transition-all duration-300 ${scrollDirection === 'down' && isScrolled ? 'bg-transparent -translate-y-full' : 'backdrop-blur-md bg-black/70 translate-y-0'}`}>
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