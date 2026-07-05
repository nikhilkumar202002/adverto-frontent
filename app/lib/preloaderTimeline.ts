import gsap from "gsap";

export const BG_FADE_IN = 0.45;
export const LINE_RAISE = 0.7;
export const BAR_FALL = 0.9;
export const GROUND_HOLD = 0.22;
export const CIRCLE_POP = 0.85;
export const HOLD = 1;
export const TRANSITION_DURATION = 1.35;
export const LOADER_FADE_OUT = 0.35;

const COVER_SAFETY_MARGIN = 48;
const BAR_GROUND_Y = 52;
const BAR_FINAL_Y = 0;
const BAR_GROUND_ROTATION = -90;
const BAR_FINAL_ROTATION = -42;
const CIRCLE_START_Y = 66;
const CIRCLE_FINAL_Y = 22;

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
  return (requiredDiameter / currentDiameter) * 1.15;
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

  // Set initial position: circle rests precisely at the bottom-left flank of the diagonal bar
  gsap.set(circle, {
    x: -34,
    y: CIRCLE_START_Y,
    scale: 0,
    opacity: 1,
    transformOrigin: "50% 50%",
  });

  // Set initial position: thin line rises perfectly straight before it falls.
  gsap.set(rectangle, {
    opacity: 0,
    rotation: 0,
    scaleX: 0.14, // Extremely thin line
    scaleY: 0,    // Starts at 0 height so it can raise upwards
    y: 20,
    transformOrigin: "50% 100%", // Anchored at the bottom tip to grow straight UP
  });

  gsap.set(logoGroup, {
    transformOrigin: "50% 50%",
  });
  gsap.set(background, {
    opacity: 1,
  });

  timeline
    // 1. RAISE UP: Thin line shoots upward into view
    .to(rectangle, {
      opacity: 1,
      rotation: 0,
      scaleY: 1,
      y: 0,
      duration: LINE_RAISE,
      ease: "power3.out",
    })
    // 3. FALL TO THE LEFT & THICKEN: Tilts diagonally to -42° while expanding to full width
    .to(rectangle, {
      rotation: BAR_GROUND_ROTATION,
      scaleX: 1,
      y: BAR_GROUND_Y,
      transformOrigin: "50% 50%", // Switch pivot to center for smooth diagonal landing
      duration: BAR_FALL,
      ease: "power3.in",
    })
    .to({}, { duration: GROUND_HOLD })
    // 4. CIRCLE ENLARGE: Pops out from the fallen base right as the bar lands
    .to(circle, {
      scale: 1,
      y: CIRCLE_FINAL_Y,
      duration: CIRCLE_POP,
      ease: "power3.out",
    })
    .to(
      rectangle,
      {
        rotation: BAR_FINAL_ROTATION,
        y: BAR_FINAL_Y,
        duration: CIRCLE_POP,
        ease: "power3.out",
      },
      "<",
    )
    // 5. Hold the completed logo clearly on screen
    .to({}, { duration: HOLD })
    .set(circle, {
      zIndex: 10,
    })
    // 6. ZOOM IN: Circle expands massively to reveal the homepage
    .to(circle, {
      scale: () => computeCoverScale(circle),
      x: 0,
      y: 0,
      duration: TRANSITION_DURATION,
      ease: "power4.inOut",
    })
    // 7. Fade out preloader wrapper
    .to(container, {
      opacity: 0,
      duration: LOADER_FADE_OUT,
      ease: "power1.in",
    });

  return timeline;
}
