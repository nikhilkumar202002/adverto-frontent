// Lightweight inline icons to avoid dependency export mismatches with lucide-react
import React from "react";

function SvgIcon({ children, size = 28, className = "", ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {children}
    </svg>
  );
}

export const Aperture = (props) => (
  <SvgIcon {...props}>
    <path d="M12 2v5" />
    <path d="M12 17v5" />
    <path d="M4.2 6.6l3.5 2" />
    <path d="M16.3 15.4l3.5 2" />
    <path d="M4.2 17.4l3.5-2" />
    <path d="M16.3 8.6l3.5-2" />
  </SvgIcon>
);

export const Triangle = (props) => (
  <SvgIcon {...props}>
    <path d="M12 3l9 15H3L12 3z" />
  </SvgIcon>
);

export const Hexagon = (props) => (
  <SvgIcon {...props}>
    <path d="M21 12l-4 7H7l-4-7 4-7h10l4 7z" />
  </SvgIcon>
);

export const CircleDashed = (props) => (
  <SvgIcon {...props}>
    <circle cx="12" cy="12" r="8" strokeDasharray="2 2" />
  </SvgIcon>
);

export const Globe = (props) => (
  <SvgIcon {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="M2 12h20" />
    <path d="M12 2c2 4 2 8 0 12c-2-4-2-8 0-12z" />
  </SvgIcon>
);

export const Figma = (props) => (
  <SvgIcon {...props}>
    <circle cx="6" cy="7" r="2" />
    <circle cx="6" cy="11" r="2" />
    <circle cx="10" cy="9" r="2" />
    <rect x="10" y="5" width="4" height="8" rx="2" />
  </SvgIcon>
);

export const Framer = (props) => (
  <SvgIcon {...props}>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M7 7l10 10" />
    <path d="M17 7l-10 10" />
  </SvgIcon>
);

export const Gift = (props) => (
  <SvgIcon {...props}>
    <rect x="3" y="8" width="18" height="13" rx="2" />
    <path d="M12 8v13" />
    <path d="M3 11h18" />
  </SvgIcon>
);

export const clientLogos = [
  { id: 1, name: "Aperture", icon: Aperture },
  { id: 2, name: "Triangle", icon: Triangle },
  { id: 3, name: "Hexagon", icon: Hexagon },
  { id: 4, name: "Circle", icon: CircleDashed },
  { id: 5, name: "Globe", icon: Globe },
  { id: 6, name: "Figma", icon: Figma },
  { id: 7, name: "Framer", icon: Framer },
  { id: 8, name: "Gift", icon: Gift },
];