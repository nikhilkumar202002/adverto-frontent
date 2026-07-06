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
const BAR_GROUND_Y = 0;
const BAR_FINAL_Y = 0;
const BAR_GROUND_ROTATION = -64;
const BAR_FINAL_ROTATION = 0;
const BAR_GROUND_X = 0;
const BAR_FINAL_X = -18;
const CIRCLE_START_Y = 116;
const CIRCLE_FINAL_Y = 36;
const CIRCLE_FINAL_X = -88;
const BASE_CIRCLE_DIAMETER = 148;
const BAR_START_Y = 20;

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

function getLogoPositionScale(circleElement: HTMLElement) {
  const currentDiameter = circleElement.getBoundingClientRect().width || BASE_CIRCLE_DIAMETER;
  return currentDiameter / BASE_CIRCLE_DIAMETER;
}

export function createPreloaderTimeline({
  refs,
  onComplete,
  timeScale = 1,
}: CreateTimelineOptions) {
  const { background, logoGroup, rectangle, circle, container } = refs;
  const logoPositionScale = getLogoPositionScale(circle);
  const scaled = (value: number) => value * logoPositionScale;

  const timeline = gsap.timeline({
    paused: true,
    onComplete,
  });

  timeline.timeScale(timeScale);

  // Set initial position: circle rests precisely at the bottom-left flank of the diagonal bar
  gsap.set(circle, {
    x: scaled(CIRCLE_FINAL_X),
    y: scaled(CIRCLE_START_Y),
    scale: 0,
    opacity: 1,
    zIndex: 1,
    transformOrigin: "50% 50%",
  });

  // Set initial position: thin line rises perfectly straight before it falls.
  gsap.set(rectangle, {
    opacity: 0,
    zIndex: 2,
    x: 0,
    rotation: 0,
    scaleX: 0.1,
    scaleY: 0,
    y: scaled(BAR_START_Y),
    transformOrigin: "50% 100%",
  });

  gsap.set(logoGroup, {
    transformOrigin: "50% 50%",
  });
  gsap.set(background, {
    opacity: 1,
  });

  timeline
    // 1. Raise the thin vertical line into view.
    .to(rectangle, {
      opacity: 1,
      rotation: 0,
      scaleY: 1,
      y: 0,
      duration: LINE_RAISE,
      ease: "power3.out",
    })
    // 2. Fall fully to the base before the circle grows.
    .to(rectangle, {
      x: scaled(BAR_GROUND_X),
      rotation: BAR_GROUND_ROTATION,
      scaleX: 1,
      y: scaled(BAR_GROUND_Y),
      transformOrigin: "50% 100%",
      duration: BAR_FALL,
      ease: "power3.in",
    })
    .to({}, { duration: GROUND_HOLD })
    // 3. Pop the circle in behind the bar to form the finished mark.
    .to(circle, {
      scale: 1,
      y: scaled(CIRCLE_FINAL_Y),
      duration: CIRCLE_POP,
      ease: "power3.out",
    })
    .to(
      rectangle,
      {
        x: scaled(BAR_FINAL_X),
        rotation: BAR_FINAL_ROTATION,
        y: scaled(BAR_FINAL_Y),
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
