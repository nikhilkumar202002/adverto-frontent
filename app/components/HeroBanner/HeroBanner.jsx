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
          arrowRef.current,
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: 0.5 },
          1.6
        );

    }, bannerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={bannerRef} className={styles.banner} data-navbar-transparent>
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
