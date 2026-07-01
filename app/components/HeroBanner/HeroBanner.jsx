"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./HeroBanner.module.css";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const BANNER_IMAGES = [
  "/Banners/Squad-01.webp",
  "/Banners/Squad-02.webp",
  "/Banners/Squad-03.webp",
  "/Banners/Squad-04.webp",
  "/Banners/Squad-05.webp",
  "/Banners/Squad-07.webp",
  "/Banners/Squad-08.webp",
];

export default function HeroBanner() {
  const bannerRef    = useRef(null);
  const photoRef     = useRef(null);
  const arrowRef     = useRef(null);
  const imageRefs    = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const imageLayers = imageRefs.current.filter(Boolean);

      gsap.set(imageLayers, { opacity: 0, scale: 1, visibility: "visible" });
      gsap.set(imageLayers[0], { opacity: 1 });

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
          arrowRef.current,
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: 0.5 },
          1.6
        );

      const dissolveTl = gsap.timeline({
        scrollTrigger: {
          id: "hero-banner-dissolve",
          trigger: bannerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.4,
          invalidateOnRefresh: true,
        },
      });

      imageLayers.slice(1).forEach((layer, index) => {
        const previousLayer = imageLayers[index];
        const transitionAt = index * 1.6;

        dissolveTl
          .to(
            previousLayer,
            {
              opacity: 0,
              scale: 0.985,
              duration: 0.7,
              ease: "none",
            },
            transitionAt
          )
          .fromTo(
            layer,
            {
              opacity: 0,
              scale: 1.015,
            },
            {
              opacity: 1,
              scale: 1,
              duration: 0.8,
              ease: "none",
            },
            transitionAt + 0.78
          );
      });

    }, bannerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={bannerRef}
      className={styles.banner}
      style={{ "--banner-steps": BANNER_IMAGES.length - 1 }}
    >
      <div className={styles.bannerFrame}>
        {/* Background photo */}
        <div ref={photoRef} className={styles.photo}>
          {BANNER_IMAGES.map((src, index) => (
            <div
              key={src}
              ref={(el) => (imageRefs.current[index] = el)}
              className={styles.photoLayer}
            >
              <Image
                src={src}
                alt={`Adverto team banner ${index + 1}`}
                fill
                sizes="100vw"
                priority={index === 0}
                className={styles.photoImg}
                draggable={false}
              />
            </div>
          ))}
        </div>

        {/* Grain */}
        <div className={styles.grain} aria-hidden="true" />

        {/* Scroll arrow */}
        <div ref={arrowRef} className={styles.scrollArrow} aria-hidden="true">
          <div className={styles.arrowTrack}>
            <div className={styles.arrowDot} />
          </div>
          <span className={styles.arrowLabel}>Scroll</span>
        </div>
      </div>
    </section>
  );
}
