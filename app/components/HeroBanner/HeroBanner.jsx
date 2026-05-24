"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./HeroBanner.module.css";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function HeroBanner() {
  const bannerRef  = useRef(null);
  const photoRef   = useRef(null);
  const overlayRef = useRef(null);
  const contentRef = useRef(null);
  const titleRef   = useRef(null);
  const subRef     = useRef(null);
  const lineRef    = useRef(null);
  const arrowRef   = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ── Entrance animation ───────────────────── */
      const entranceTl = gsap.timeline({ defaults: { ease: "expo.out" } });

      entranceTl
        .fromTo(
          photoRef.current,
          { scale: 1.12, filter: "blur(14px)" },
          { scale: 1, filter: "blur(0px)", duration: 1.6 },
          0
        )
        .fromTo(
          overlayRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 1.0 },
          0
        )
        .fromTo(
          lineRef.current,
          { scaleX: 0 },
          { scaleX: 1, duration: 0.7, ease: "power3.inOut" },
          0.6
        )
        .fromTo(
          subRef.current,
          { opacity: 0, y: 18, filter: "blur(6px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.7 },
          0.75
        )
        .fromTo(
          titleRef.current.querySelectorAll("." + styles.titleWord),
          { opacity: 0, y: 60, rotateX: -20 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.9,
            stagger: 0.09,
            ease: "expo.out",
          },
          0.9
        )
        .fromTo(
          arrowRef.current,
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: 0.5 },
          1.6
        );

      /* ── Parallax on scroll ───────────────────── */
      gsap.to(photoRef.current, {
        yPercent: 18,
        ease: "none",
        scrollTrigger: {
          trigger: bannerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(contentRef.current, {
        yPercent: 28,
        opacity: 0,
        filter: "blur(8px)",
        ease: "none",
        scrollTrigger: {
          trigger: bannerRef.current,
          start: "20% top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, bannerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={bannerRef} className={styles.banner}>
      {/* Background photo */}
      <div ref={photoRef} className={styles.photo}>
        <Image
          src="/Banners/Team-banner.jpg"
          alt="Our team"
          fill
          sizes="100vw"
          className={styles.photoImg}
          draggable={false}
        />
      </div>

      {/* Dark overlay + gradient */}
      <div ref={overlayRef} className={styles.overlay} />

      {/* Grain */}
      <div className={styles.grain} aria-hidden="true" />

      {/* Content */}
      <div ref={contentRef} className={styles.content}>
        {/* Top meta row */}
        <div className={styles.metaRow}>
          <span className={styles.metaLabel}>Creative Studio</span>
          <div ref={lineRef} className={styles.metaLine} />
          <span ref={subRef} className={styles.metaYear}>Est. 2019</span>
        </div>

        {/* Main title */}
        <h1 ref={titleRef} className={styles.title}>
          {["The", "People", "Behind", "The", "Work"].map((w, i) => (
            <span key={i} className={styles.titleWord}>
              {w}
              {(i === 1 || i === 3) && <br />}
            </span>
          ))}
        </h1>

        {/* Descriptor */}
        <p className={styles.descriptor}>
          Five creative minds. One shared obsession with craft.
        </p>

        {/* Bottom row */}
        <div className={styles.bottomRow}>
          <div className={styles.teamCount}>
            <span className={styles.countNumber}>05</span>
            <span className={styles.countLabel}>Team Members</span>
          </div>
        </div>
      </div>

      {/* Scroll arrow */}
      <div ref={arrowRef} className={styles.scrollArrow} aria-hidden="true">
        <div className={styles.arrowTrack}>
          <div className={styles.arrowDot} />
        </div>
        <span className={styles.arrowLabel}>Scroll</span>
      </div>
    </section>
  );
}
