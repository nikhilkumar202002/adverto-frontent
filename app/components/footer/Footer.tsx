"use client";

import Link from "next/link";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import Container from "../common/Container";
import { footerData } from "../../data/footer";
import React from "react";
import Image from "next/image";

// Custom Behance Icon to match your team section
const Behance = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14h-8.027c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988h-6.466v-14.967h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zm-3.466-8.988h3.584c2.508 0 2.906-3-.312-3h-3.272v3zm3.391 3h-3.391v3.016h3.341c3.055 0 2.868-3.016.05-3.016z"/>
  </svg>
);

const Instagram = ({ size = 18, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className}>
    <rect x="3" y="3" width="18" height="18" rx="5" strokeWidth="1.5" />
    <circle cx="12" cy="12" r="3" strokeWidth="1.5" />
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
  </svg>
);

const Facebook = ({ size = 18, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M22 12a10 10 0 10-11.5 9.9v-7h-2.2v-2.9h2.2V9.5c0-2.2 1.3-3.4 3.3-3.4.95 0 1.95.17 1.95.17v2.1h-1.07c-1.05 0-1.37.65-1.37 1.32v1.58h2.33l-.37 2.9h-1.96v7A10 10 0 0022 12z" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-[#050505] relative z-20 border-t border-white/5">
      {/* --- MARQUEE HEADER --- */}
      <div className="relative flex overflow-hidden py-8 md:py-12">
        <style>{`
          @keyframes footer-marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          .animate-footer-marquee {
            animation: footer-marquee 20s linear infinite;
          }
        `}</style>

        <div className="animate-footer-marquee flex whitespace-nowrap items-center">
          {[...Array(4)].map((_, i) => (
            <React.Fragment key={i}>
              <span className="text-[60px] md:text-[90px] lg:text-[120px] font-medium text-white px-8 md:px-12 leading-none tracking-tight">
                Get In Touch
              </span>
              {/* Adverto Blue icon from public */}
              <Image src="/main_icon-02.svg" alt="Adverto Icon" width={80} height={80} className="text-[#0000FF] shrink-0 md:w-[60px] md:h-[60px]" />
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* --- FOOTER MAIN CONTENT --- */}
      <Container className="pb-[30px] pt-[40px]">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-12 lg:gap-8">
          
          {/* Col 1: Logo */}
          <div className="col-span-2 lg:col-span-2 flex items-start">
             {/* Replace with your giant blue graphic/logo */}
             <div className="text-[#0000FF] font-bold text-[120px] leading-[0.8] tracking-tighter">
                <Image src={"/main-logo.svg"} alt="Adverto Logo" width={200} height={200} className="w-auto h-[80px] md:h-[60px]" />
             </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="flex flex-col gap-6">
            <h4 className="text-white font-medium text-[15px]">Quick Links</h4>
            <ul className="flex flex-col gap-4">
              {footerData.quickLinks.map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="text-white/60 text-[14px] hover:text-[#0000FF] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Services */}
          <div className="flex flex-col gap-6">
            <h4 className="text-white font-medium text-[15px]">Services</h4>
            <ul className="flex flex-col gap-4">
              {footerData.services.map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="text-white/60 text-[14px] hover:text-[#0000FF] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Company */}
          <div className="flex flex-col gap-6">
            <h4 className="text-white font-medium text-[15px]">Company</h4>
            <ul className="flex flex-col gap-4">
              {footerData.company.map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="text-white/60 text-[14px] hover:text-[#0000FF] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 5: Contact Info */}
          <div className="flex flex-col gap-6 col-span-2 md:col-span-1 lg:col-span-1">
            <h4 className="text-white font-medium text-[15px]">Contact Info</h4>
            <ul className="flex flex-col gap-5">
              <li>
                <a href="mailto:info@adverto.com" className="group flex items-center gap-3 text-white/60 text-[14px] hover:text-white transition-colors">
                  <Mail size={16} className="text-[#0000FF] group-hover:text-white transition-colors" /> info@adverto.com
                </a>
              </li>
              <li>
                <a href="tel:+918956231475" className="group flex items-center gap-3 text-white/60 text-[14px] hover:text-white transition-colors">
                  <Phone size={16} className="text-[#0000FF] group-hover:text-white transition-colors" /> +91 89562 31475
                </a>
              </li>
              <li className="flex items-start gap-3 text-white/60 text-[14px]">
                <MapPin size={16} className="text-[#0000FF] mt-1 shrink-0" /> Ernakulam, Kerala
              </li>
              <li className="flex items-center gap-3 text-white/60 text-[14px]">
                <Clock size={16} className="text-[#0000FF] shrink-0" /> 9 am - 6 pm
              </li>
            </ul>
            
            <div className="mt-4 flex flex-col gap-3">
              <Link href="/quote" className="text-white/60 text-[14px] hover:text-white">Get a Quote</Link>
              <Link href="/support" className="text-white/60 text-[14px] hover:text-white">Support Center</Link>
            </div>
          </div>

        </div>

        {/* --- BOTTOM BAR --- */}
        <div className="flex flex-col md:flex-row items-center justify-between mt-24 pt-8 border-t border-white/10 gap-6">
          <p className="text-white/40 text-[12px] tracking-wide">
            ©Copyright Adverto {new Date().getFullYear()}
          </p>
          
          <div className="flex items-center gap-6 text-white/60">
            <a href="#" className="hover:text-white transition-colors"><Instagram size={18} /></a>
            <a href="#" className="hover:text-white transition-colors"><Facebook size={18} /></a>
            <a href="#" className="hover:text-white transition-colors"><Behance /></a>
          </div>
        </div>
      </Container>
    </footer>
  );
}