"use client";

import { useEffect, useRef, useState, useCallback } from "react";
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
];

/* ── Stagger offsets for the "deck peek" effect ─────────────────────────────
   Index 0 = TOP card (front of deck)
   Index 4 = BOTTOM card (deepest in stack)
*/
const DECK_OFFSETS = [
  { y:  0,  scale: 1.000, rot:  0.0, z: 50 },
  { y: 10,  scale: 0.964, rot: -1.6, z: 40 },
  { y: 20,  scale: 0.928, rot:  1.2, z: 30 },
  { y: 28,  scale: 0.892, rot: -0.9, z: 20 },
  { y: 36,  scale: 0.856, rot:  0.6, z: 10 },
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
  const offset = DECK_OFFSETS[deckIndex] || DECK_OFFSETS[0];

  return (
    <article
      ref={cardRef}
      className={`${styles.card} ${hovered ? styles.cardHovered : ""}`}
      style={{
        "--accent":     member.accent,
        "--deck-index": deckIndex,
        zIndex:         offset.z,
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

/* ── Progress Dots ────────────────────────────────────────────────────────────── */
function ProgressDots({ total, active }) {
  return (
    <div className={styles.dots} aria-hidden="true">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`${styles.dot} ${i === active ? styles.dotActive : ""}`}
        />
      ))}
    </div>
  );
}

/* ── Main Component ───────────────────────────────────────────────────────────── */
export default function TeamSection() {
  const sectionRef  = useRef(null);
  const stickyRef   = useRef(null);
  const deckRef     = useRef(null);
  const headingRef  = useRef(null);
  const cardRefs    = useRef([]);
  const [activeIdx, setActiveIdx] = useState(0);

  /* Mouse parallax on image inner layer */
  useMouseParallax(sectionRef, styles.imageParallaxInner);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardRefs.current;
      const total = cards.length;

      /* ── Set initial stacked positions ──────────────────────────── */
      cards.forEach((card, i) => {
        const off = DECK_OFFSETS[i];
        gsap.set(card, {
          position:   "absolute",
          top:        "50%",
          left:       "50%",
          xPercent:   -50,
          yPercent:   -50,
          y:          off.y,
          scale:      off.scale,
          rotateZ:    off.rot,
          opacity:    i === 0 ? 1 : 0.85 - i * 0.06,
          filter:     i === 0 ? "blur(0px)" : `blur(${i * 0.6}px)`,
          transformOrigin: "center center",
        });
      });

      /* ── Section heading entrance ───────────────────────────────── */
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 40, filter: "blur(10px)" },
        {
          opacity: 1, y: 0, filter: "blur(0px)",
          duration: 0.8, ease: "expo.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      /* ── Master scroll timeline ─────────────────────────────────── */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start:   "top top",
          end:     `+=${window.innerHeight * (total + 1)}`,
          scrub:   1.4,
          pin:     stickyRef.current,
          pinSpacing: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            // Update active dot
            const idx = Math.min(
              Math.floor(self.progress * total),
              total - 1
            );
            setActiveIdx(idx);
          },
        },
      });

      /* ── Per-card exit choreography ─────────────────────────────── */
      const segDur = 1 / total;

      cards.forEach((card, i) => {
        const member = TEAM_MEMBERS[i];
        const seg    = i * segDur;

        /* Exit: current top card flies away */
        tl.to(
          card,
          {
            x:       member.exitX,
            y:       member.exitY,
            rotateZ: member.exitRot,
            scale:   1.18,
            opacity: 0,
            filter:  "blur(12px)",
            ease:    "power4.in",
            duration: segDur * 0.55,
          },
          seg
        );

        /* Promote: every card behind steps forward one position */
        if (i < total - 1) {
          for (let j = i + 1; j < total; j++) {
            const nextOff = DECK_OFFSETS[j - i - 1];
            tl.to(
              cards[j],
              {
                y:       nextOff.y,
                scale:   nextOff.scale,
                rotateZ: nextOff.rot,
                opacity: j - i - 1 === 0 ? 1 : 0.85 - (j - i - 1) * 0.06,
                filter:  j - i - 1 === 0 ? "blur(0px)" : `blur(${(j - i - 1) * 0.6}px)`,
                ease:    "expo.out",
                duration: segDur * 0.6,
              },
              seg + segDur * 0.18
            );
          }
        }

        /* Reveal zoom: new top card pops forward */
        if (i < total - 1) {
          tl.fromTo(
            cards[i + 1],
            { scale: DECK_OFFSETS[1].scale * 0.96 },
            {
              scale:    DECK_OFFSETS[0].scale,
              ease:     "expo.out",
              duration: segDur * 0.45,
            },
            seg + segDur * 0.28
          );
        }
      });

      /* ── Deck fade-out after last card exits ────────────────────── */
      tl.to(
        deckRef.current,
        {
          opacity: 0,
          scale:   0.94,
          filter:  "blur(16px)",
          ease:    "power2.inOut",
          duration: segDur * 0.5,
        },
        ">"
      );
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

        {/* Section label */}
        <header ref={headingRef} className={styles.sectionHead}>
          <span className={styles.eyebrow}>Meet The Team</span>
          <h2 className={styles.sectionTitle}>
            Our&nbsp;<em>Crew</em>
          </h2>
        </header>

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

        {/* Progress indicator */}
        <ProgressDots total={TEAM_MEMBERS.length} active={activeIdx} />

        {/* Scroll cue */}
        <div className={styles.scrollCue} aria-hidden="true">
          <div className={styles.scrollCueLine} />
          <span className={styles.scrollCueText}>scroll</span>
        </div>
      </div>
    </section>
  );
}
