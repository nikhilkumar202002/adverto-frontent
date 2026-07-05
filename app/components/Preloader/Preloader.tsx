"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./Preloader.module.css";

type PreloaderProps = {
  onComplete?: () => void;
};

declare global {
  interface Window {
    __advertoPreloaderComplete?: boolean;
  }
}

const BAR_GROW = 0.72;
const BAR_FALL = 0.56;
const CIRCLE_GROW = 0.92;
const LOGO_SETTLE = 0.48;
const HOLD = 0.72;
const BREATH = 0.34;
const REVEAL = 1.18;
const LOADER_FADE = 0.3;
const CIRCLE_ENTRY_OVERLAP = "-=0.24";
const BAR_INITIAL_ROTATION = -6;
const BAR_FALL_ROTATION = -16;
const BAR_FINAL_ROTATION = 0;
const BAR_INITIAL_Y = 12;
const BAR_FALL_Y = 16;
const BAR_SETTLE_Y = 0;
const BAR_FALL_X = -8;
const BAR_SETTLE_X = 0;
const BAR_INITIAL_SCALE_X = 0.88;
const BAR_INITIAL_SCALE_Y = 0.08;
const LOGO_BREATH_SCALE = 1.025;
const BREATH_REPEAT_COUNT = 3;
const CIRCLE_INITIAL_Y = 8;
const CIRCLE_REVEAL_SCALE = 80;

function markPreloaderComplete() {
  window.__advertoPreloaderComplete = true;
  window.dispatchEvent(new Event("adverto:preloader-complete"));
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const logoRef = useRef<HTMLDivElement | null>(null);
  const barRef = useRef<HTMLDivElement | null>(null);
  const circleRef = useRef<HTMLDivElement | null>(null);
  const onCompleteRef = useRef(onComplete);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const logo = logoRef.current;
    const bar = barRef.current;
    const circle = circleRef.current;

    if (!root || !logo || !bar || !circle) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    const context = gsap.context(() => {
      gsap.set(root, { autoAlpha: 1, yPercent: 0 });
      gsap.set(logo, {
        scale: 1,
        transformOrigin: "center center",
      });
      gsap.set(bar, {
        autoAlpha: 0,
        scaleX: BAR_INITIAL_SCALE_X,
        scaleY: BAR_INITIAL_SCALE_Y,
        x: 0,
        y: BAR_INITIAL_Y,
        rotate: BAR_INITIAL_ROTATION,
        transformOrigin: "center bottom",
      });
      gsap.set(circle, {
        autoAlpha: 0,
        scale: 0,
        y: CIRCLE_INITIAL_Y,
        transformOrigin: "center center",
      });

      const timeline = gsap.timeline({
        defaults: { force3D: true },
        onComplete: () => {
          markPreloaderComplete();
          onCompleteRef.current?.();
        },
      });

      timelineRef.current = timeline;

      if (reduceMotion) {
        timeline
          .set(bar, {
            autoAlpha: 1,
            scaleX: 1,
            scaleY: 1,
            x: BAR_SETTLE_X,
            y: BAR_SETTLE_Y,
            rotate: BAR_FINAL_ROTATION,
          })
          .set(circle, { autoAlpha: 1, scale: 1, y: 0 })
          .set(circle, { scale: CIRCLE_REVEAL_SCALE })
          .set(root, { autoAlpha: 0 });
        return;
      }

      timeline
        .to(bar, {
          autoAlpha: 1,
          scaleX: 1,
          scaleY: 1,
          y: 0,
          rotate: 0,
          duration: BAR_GROW,
          ease: "expo.out",
        })
        .to(bar, {
          x: BAR_FALL_X,
          y: BAR_FALL_Y,
          rotate: BAR_FALL_ROTATION,
          duration: BAR_FALL,
          ease: "power3.inOut",
        })
        .to(
          circle,
          {
            autoAlpha: 1,
            scale: 1,
            y: 0,
            duration: CIRCLE_GROW,
            ease: "back.out(1.85)",
          },
          CIRCLE_ENTRY_OVERLAP,
        )
        .to(
          bar,
          {
            x: BAR_SETTLE_X,
            y: BAR_SETTLE_Y,
            rotate: BAR_FINAL_ROTATION,
            duration: LOGO_SETTLE,
            ease: "power3.out",
          },
          "<+=0.2",
        )
        .to({}, { duration: HOLD })
        .to(logo, {
          scale: LOGO_BREATH_SCALE,
          duration: BREATH,
          yoyo: true,
          repeat: BREATH_REPEAT_COUNT,
          ease: "sine.inOut",
        })
        .set(logo, { overflow: "visible" })
        .set(circle, { zIndex: 3 })
        .to(circle, {
          scale: CIRCLE_REVEAL_SCALE,
          duration: REVEAL,
          ease: "power4.inOut",
          transformOrigin: "center center",
        })
        .to(
          root,
          {
            autoAlpha: 0,
            duration: LOADER_FADE,
            ease: "power2.out",
          },
          "-=0.08",
        );
    }, root);

    return () => {
      timelineRef.current?.kill();
      timelineRef.current = null;
      context.revert();
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className={styles.overlay}
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      <div ref={logoRef} className={styles.logo} aria-hidden="true">
        <div ref={barRef} className={styles.bar} />
        <div ref={circleRef} className={styles.circle} />
      </div>
    </div>
  );
}
