"use client";

import Image from "next/image";
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

const RECTANGLE_DURATION = 0.8;
const CIRCLE_DURATION = 0.8;
const LOGO_HOLD_DURATION = 1.35;
const CIRCLE_EXPAND_DURATION = 1.3;
const OVERLAY_FADE_DURATION = 0.3;
const CIRCLE_ENTRY_OVERLAP = "-=0.22";
const CIRCLE_SCALE_BUFFER = 1.35;
const MIN_EXPANDED_CIRCLE_SCALE = 60;
const MAX_EXPANDED_CIRCLE_SCALE = 80;
const RECTANGLE_INITIAL_Y = -20;
const RECTANGLE_INITIAL_ROTATION = -8;
const RECTANGLE_INITIAL_SCALE = 0.85;
const CIRCLE_INITIAL_ROTATION = 180;

function getCircleCoverScale(circleElement: HTMLImageElement) {
  const bounds = circleElement.getBoundingClientRect();
  const circleSize = Math.max(bounds.width, bounds.height, 1);
  const viewportDiagonal = Math.hypot(window.innerWidth, window.innerHeight);
  const coverScale = (viewportDiagonal / circleSize) * CIRCLE_SCALE_BUFFER;

  return Math.min(
    Math.max(coverScale, MIN_EXPANDED_CIRCLE_SCALE),
    MAX_EXPANDED_CIRCLE_SCALE,
  );
}

function markPreloaderComplete() {
  window.__advertoPreloaderComplete = true;
  window.dispatchEvent(new Event("adverto:preloader-complete"));
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const rectangleRef = useRef<HTMLImageElement | null>(null);
  const circleRef = useRef<HTMLImageElement | null>(null);
  const onCompleteRef = useRef(onComplete);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const rectangle = rectangleRef.current;
    const circle = circleRef.current;

    if (!root || !rectangle || !circle) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const context = gsap.context(() => {
      gsap.set(root, { autoAlpha: 1 });
      gsap.set(rectangle, {
        autoAlpha: 0,
        scale: RECTANGLE_INITIAL_SCALE,
        y: RECTANGLE_INITIAL_Y,
        rotate: RECTANGLE_INITIAL_ROTATION,
        xPercent: -50,
        yPercent: -50,
        transformOrigin: "center center",
      });
      gsap.set(circle, {
        autoAlpha: 0,
        scale: 0,
        rotate: CIRCLE_INITIAL_ROTATION,
        xPercent: -50,
        yPercent: -50,
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
          .set(rectangle, { autoAlpha: 1, scale: 1, y: 0, rotate: 0 })
          .set(circle, { autoAlpha: 1, scale: 1, rotate: 0 })
          .set(root, { autoAlpha: 0 });
        return;
      }

      timeline
        .to(rectangle, {
          autoAlpha: 1,
          scale: 1,
          y: 0,
          rotate: 0,
          duration: RECTANGLE_DURATION,
          ease: "power3.out",
        })
        .to(
          circle,
          {
            autoAlpha: 1,
            scale: 1,
            rotate: 0,
            duration: CIRCLE_DURATION,
            ease: "back.out(2)",
          },
          CIRCLE_ENTRY_OVERLAP,
        )
        .to({}, { duration: LOGO_HOLD_DURATION })
        .to(circle, {
          scale: () => getCircleCoverScale(circle),
          duration: CIRCLE_EXPAND_DURATION,
          ease: "power4.inOut",
          transformOrigin: "center center",
        })
        .to(root, {
          autoAlpha: 0,
          duration: OVERLAY_FADE_DURATION,
          ease: "power2.out",
        });
    }, root);

    return () => {
      timelineRef.current?.kill();
      timelineRef.current = null;
      context.revert();
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
      <div className={styles.logo} aria-hidden="true">
        <Image
          ref={rectangleRef}
          src="/rectangle.svg"
          alt=""
          width={363}
          height={500}
          priority
          className={styles.rectangle}
        />
        <Image
          ref={circleRef}
          src="/circle.svg"
          alt=""
          width={500}
          height={500}
          priority
          className={styles.circle}
        />
      </div>
    </div>
  );
}
