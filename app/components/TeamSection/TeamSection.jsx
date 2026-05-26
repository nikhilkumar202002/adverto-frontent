"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./TeamSection.module.css";

gsap.registerPlugin(ScrollTrigger);

/* ── Team Data ──────────────────────────────────────────────────────────────── */
const TEAM_MEMBERS = [
  {
    id: 1,
    name: "Arielle Voss",
    role: "Creative Director",
    image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&q=90&fit=crop&crop=top",
    accent: "#c8a96e",
    tagline: "Vision Architect",
    // Direction the card FLIES OUT when dismissed
    exitX:    "-115vw",
    exitY:    "-22vh",
    exitRot:  -14,
  },
  {
    id: 2,
    name: "Marcus Osei",
    role: "Lead Developer",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=90&fit=crop&crop=top",
    accent: "#6e8ec8",
    tagline: "Code Alchemist",
    exitX:    "120vw",
    exitY:    "-18vh",
    exitRot:  16,
  },
  {
    id: 3,
    name: "Sena Mirabel",
    role: "Motion Designer",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=90&fit=crop&crop=top",
    accent: "#c86e9a",
    tagline: "Frame Sculptor",
    exitX:    "-108vw",
    exitY:    "20vh",
    exitRot:  -12,
  },
  {
    id: 4,
    name: "Theo Andersson",
    role: "Brand Strategist",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=90&fit=crop&crop=top",
    accent: "#6ec8b4",
    tagline: "Identity Weaver",
    exitX:    "118vw",
    exitY:    "16vh",
    exitRot:  18,
  },
  {
    id: 5,
    name: "Yuki Tanaka",
    role: "UX Researcher",
    image: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=800&q=90&fit=crop&crop=top",
    accent: "#a06ec8",
    tagline: "Empathy Engineer",
    exitX:    "-112vw",
    exitY:    "-14vh",
    exitRot:  -10,
  },
  {
    id: 6,
    name: "Nora Bell",
    role: "Content Lead",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=90&fit=crop&crop=top",
    accent: "#c87d6e",
    tagline: "Story Maker",
    exitX:    "116vw",
    exitY:    "-10vh",
    exitRot:  14,
  },
  {
    id: 7,
    name: "Elias Rowan",
    role: "Growth Strategist",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=90&fit=crop&crop=top",
    accent: "#8fc86e",
    tagline: "Scale Builder",
    exitX:    "-118vw",
    exitY:    "18vh",
    exitRot:  -16,
  },
];

const ZOOM_POSITIONS = [
  { top: 20, side: "left",  sideValue: 1 },
  { top: 20, side: "right", sideValue: 1 },
  { top: 11, side: "left",  sideValue: 18 },
  { top: 38, side: "right", sideValue: 12 },
  { top: 55, side: "left",  sideValue: 7 },
  { top: 12, side: "right", sideValue: 26 },
  { top: 63, side: "right", sideValue: 30 },
];

/* ── Mouse parallax inner layer ─────────────────────────────────────────────── */
function useMouseParallax(sectionRef, innerClass) {
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    let rafId, mx = 0, my = 0, cx = 0, cy = 0;

    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      mx = ((e.clientX - r.left) / r.width  - 0.5) * 2;
      my = ((e.clientY - r.top)  / r.height - 0.5) * 2;
    };

    const tick = () => {
      cx += (mx - cx) * 0.055;
      cy += (my - cy) * 0.055;
      const inners = el.querySelectorAll("." + innerClass);
      inners.forEach((inner) => {
        gsap.set(inner, {
          x: cx * 10,
          y: cy *  7,
        });
      });
      rafId = requestAnimationFrame(tick);
    };

    el.addEventListener("mousemove", onMove);
    rafId = requestAnimationFrame(tick);
    return () => {
      el.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, [sectionRef, innerClass]);
}

/* ── Individual Card ─────────────────────────────────────────────────────────── */
function TeamCard({ member, deckIndex, cardRef }) {
  const [hovered, setHovered] = useState(false);
  const position = ZOOM_POSITIONS[deckIndex] || ZOOM_POSITIONS[0];

  return (
    <article
      ref={cardRef}
      className={`${styles.card} ${hovered ? styles.cardHovered : ""}`}
      style={{
        "--accent":     member.accent,
        "--deck-index": deckIndex,
        top:            `${position.top}%`,
        [position.side]: `${position.sideValue}%`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={`${member.name}, ${member.role}`}
    >
      {/* Noise texture */}
      <div className={styles.cardNoise} aria-hidden="true" />

      {/* Accent glow bloom */}
      <div
        className={styles.cardBloom}
        style={{ "--bloom-color": member.accent }}
        aria-hidden="true"
      />

      {/* Image */}
      <div className={styles.imageWrap}>
        {/* Inner wrapper — receives mouse parallax via gsap.set */}
        <div className={styles.imageParallaxInner}>
          <img
            src={member.image}
            alt={member.name}
            className={styles.image}
            draggable={false}
          />
        </div>
        <div className={styles.imageVignette} aria-hidden="true" />
      </div>

      {/* Content overlay */}
      <div className={styles.cardBody}>
        {/* Number */}
        <span className={styles.cardIndex}>0{deckIndex + 1}</span>

        {/* Bottom info */}
        <div className={styles.cardFooter}>
          <span className={styles.cardTagline}>{member.tagline}</span>

          <div className={styles.cardNameWrap}>
            <h3 className={styles.cardName}>{member.name}</h3>
            <span
              className={styles.cardNameUnderline}
              style={{ background: member.accent }}
            />
          </div>

          <div className={styles.cardRoleRow}>
            <div
              className={styles.cardRoleDot}
              style={{ background: member.accent }}
            />
            <p className={styles.cardRole}>{member.role}</p>
          </div>
        </div>
      </div>

      {/* Border rim */}
      <div className={styles.cardRim} aria-hidden="true" />
    </article>
  );
}

/* ── Main Component ───────────────────────────────────────────────────────────── */
export default function TeamSection() {
  const sectionRef  = useRef(null);
  const stickyRef   = useRef(null);
  const deckRef     = useRef(null);
  const cardRefs    = useRef([]);
  const projectsRef = useRef(null);

  /* Mouse parallax on image inner layer */
  useMouseParallax(sectionRef, styles.imageParallaxInner);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardRefs.current.filter(Boolean);
      const total = cards.length;
      let timeline;
      let resizeTimer;
      let viewportWidth = window.innerWidth;

      ScrollTrigger.config({
        ignoreMobileResize: true,
        autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
      });

      const setupAnimation = () => {
        const isMobile = window.innerWidth < 768;
        const firstCardDepth = isMobile ? 140 : 110;
        const nextCardDepth = isMobile ? 120 : 100;
        const scrollLength = isMobile ? total * 50 : total * 25;
        const scrub = isMobile ? 0.08 : 0.05;
        const pairStep = isMobile ? 1 : 0.82;

        timeline?.scrollTrigger?.kill();
        timeline?.kill();
        gsap.killTweensOf([cards, projectsRef.current]);

        /* ── Set initial 3D zoom positions ──────────────────────────── */
        cards.forEach((card, i) => {
          const initialZ = i < 2 ? -20 : -4 - i * 20;

          gsap.set(card, {
            position:   "absolute",
            zIndex:     total - i,
            opacity:    i < 2 ? 1 : 0,
            filter:     i < 2 ? "blur(0px)" : "blur(10px)",
            transform:  `translate3D(0, 0, ${initialZ}vh)`,
            transformOrigin: "center center",
            force3D: true,
          });
        });

        gsap.set(projectsRef.current, {
          autoAlpha: 0,
          y: 34,
          filter: "blur(10px)",
        });

        /* ── Master scroll timeline ─────────────────────────────────── */
        timeline = gsap.timeline({
          scrollTrigger: {
            id: "team-zoom-scroll",
            trigger: sectionRef.current,
            start:   "top top",
            end:     `+=${scrollLength}%`,
            scrub,
            pin:     stickyRef.current,
            pinSpacing: true,
            pinType: "fixed",
            anticipatePin: 1,
            normalizeScroll: true,
            fastScrollEnd: true,
            invalidateOnRefresh: true,
          },
        });

        timeline.to(
          cards.slice(0, 2),
          {
            transform: `translate3D(0, 0, ${firstCardDepth}vh)`,
            duration: 4,
            ease: "none",
          },
          0
        );

        cards.slice(2).forEach((card, index) => {
          const cardTl = gsap.timeline();

          cardTl
            .to(card, {
              transform: `translate3D(0, 0, ${nextCardDepth}vh)`,
              duration: 4,
              ease: "none",
            })
            .to(
              card,
              {
                opacity: 1,
                filter: "blur(0px)",
                duration: 1,
                ease: "none",
              },
              0.4
            );

          timeline.add(cardTl, Math.floor(index / 2) * pairStep);
        });

        timeline.to(
          projectsRef.current,
          {
            autoAlpha: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.4,
            ease: "power2.out",
          },
          ">"
        );

        ScrollTrigger.refresh();
      };

      const onResize = () => {
        if (window.innerWidth === viewportWidth) return;

        viewportWidth = window.innerWidth;
        clearTimeout(resizeTimer);
        resizeTimer = window.setTimeout(setupAnimation, 200);
      };

      setupAnimation();
      window.addEventListener("resize", onResize);

      return () => {
        clearTimeout(resizeTimer);
        window.removeEventListener("resize", onResize);
        timeline?.scrollTrigger?.kill();
        timeline?.kill();
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      {/* Ambient noise */}
      <div className={styles.sectionNoise} aria-hidden="true" />

      {/* Background orbs */}
      <div className={styles.orb} data-orb="1" aria-hidden="true" />
      <div className={styles.orb} data-orb="2" aria-hidden="true" />

      {/* Sticky viewport */}
      <div ref={stickyRef} className={styles.sticky}>

        {/* Card deck */}
        <div ref={deckRef} className={styles.deck}>
          {TEAM_MEMBERS.map((member, index) => (
            <TeamCard
              key={member.id}
              member={member}
              deckIndex={index}
              cardRef={(el) => (cardRefs.current[index] = el)}
            />
          ))}
        </div>

        {/* Projects Text Fade Up */}
        <div
          ref={projectsRef}
          className={styles.projectsText}
          style={{ opacity: 0 }}
        >
          <h3 className={styles.projectsHeading}>Branding Built on <em>Teamwork</em></h3>
   
        </div>
      </div>
    </section>
  );
}
