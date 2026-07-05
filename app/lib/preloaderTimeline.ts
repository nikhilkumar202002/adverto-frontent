import gsap from "gsap";

export const BG_FADE_IN = 0.3;
export const RECT_GROW = 0.72;
export const RECT_FALL = 0.78;
export const CIRCLE_GROW = 1.02;
export const LOGO_SETTLE_OVERLAP = 0.34;
export const HOLD = 0.72;
export const TRANSITION_DURATION = 1.18;
export const LOADER_FADE_OUT = 0.25;

const RECT_INITIAL_Y = 14;
const RECT_FALL_X = -54;
const RECT_FALL_Y = 48;
const RECT_FALL_ROTATION = -66;
const RECT_INITIAL_SCALE_X = 0.9;
const RECT_INITIAL_SCALE_Y = 0.06;
const CIRCLE_INITIAL_Y = 10;
const COVER_SAFETY_MARGIN = 48;

export type PreloaderRefs = {
  container: HTMLDivElement;
  background: HTMLDivElement;
  logoGroup: HTMLDivElement;
  rectangle: HTMLDivElement;
  circle: HTMLDivElement;
};

type CreateTimelineOptions = {
  refs: PreloaderRefs;
  onComplete: () => void;
  timeScale?: number;
};

export function computeCoverScale(circleElement: HTMLElement) {
  const viewportDiagonal = Math.hypot(window.innerWidth, window.innerHeight);
  const requiredDiameter = viewportDiagonal + COVER_SAFETY_MARGIN * 2;
  const currentDiameter = circleElement.getBoundingClientRect().width || 1;

  return (requiredDiameter / currentDiameter) * 1.16;
}

export function createPreloaderTimeline({
  refs,
  onComplete,
  timeScale = 1,
}: CreateTimelineOptions) {
  const { background, logoGroup, rectangle, circle, container } = refs;

  const timeline = gsap.timeline({
    paused: true,
    onComplete,
  });

  timeline.timeScale(timeScale);

  gsap.set([rectangle, circle], {
    xPercent: -50,
    yPercent: -50,
    transformOrigin: "50% 50%",
  });
  gsap.set(logoGroup, {
    transformOrigin: "50% 50%",
  });
  gsap.set(rectangle, {
    opacity: 0,
    x: 0,
    y: RECT_INITIAL_Y,
    rotation: 0,
    scaleX: RECT_INITIAL_SCALE_X,
    scaleY: RECT_INITIAL_SCALE_Y,
    transformOrigin: "50% 100%",
  });
  gsap.set(circle, {
    opacity: 0,
    y: CIRCLE_INITIAL_Y,
    scale: 0,
  });

  timeline
    .fromTo(
      background,
      { opacity: 0 },
      { opacity: 1, duration: BG_FADE_IN, ease: "power1.out" },
    )
    .to(rectangle, {
      opacity: 1,
      y: 0,
      scaleX: 1,
      scaleY: 1,
      duration: RECT_GROW,
      ease: "expo.out",
    })
    .to(rectangle, {
      x: RECT_FALL_X,
      y: RECT_FALL_Y,
      rotation: RECT_FALL_ROTATION,
      duration: RECT_FALL,
      ease: "power3.in",
    })
    .to(circle, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: CIRCLE_GROW,
      ease: "power3.out",
    })
    .to(
      rectangle,
      {
        x: 0,
        y: 0,
        rotation: 0,
        duration: CIRCLE_GROW - LOGO_SETTLE_OVERLAP,
        ease: "power3.out",
      },
      `<+=${LOGO_SETTLE_OVERLAP}`,
    )
    .to({}, { duration: HOLD })
    .set(circle, {
      zIndex: 3,
    })
    .to(circle, {
      scale: () => computeCoverScale(circle),
      duration: TRANSITION_DURATION,
      ease: "power4.inOut",
    })
    .to(container, {
      opacity: 0,
      duration: LOADER_FADE_OUT,
      ease: "power1.in",
    });

  return timeline;
}
