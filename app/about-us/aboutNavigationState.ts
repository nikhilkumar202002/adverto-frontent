export type AboutFeaturedSliderState = {
  activeSlug: string | null;
  animationDuration: number;
  animationProgress: number;
  timelineProgress: number | null;
  trackTranslateX: number;
};

export type AboutNavigationState = {
  scrollY: number;
  featuredSlider: AboutFeaturedSliderState | null;
  savedAt: number;
};

const stateKey = "adverto:about-navigation-state";
const restoreKey = "adverto:about-restore-on-return";
const maxAge = 30 * 60;

const isBrowser = () => typeof window !== "undefined";

const setCookie = (name: string, value: string) => {
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAge}; SameSite=Lax`;
};

const getCookie = (name: string) => {
  const cookie = document.cookie
    .split("; ")
    .find((item) => item.startsWith(`${name}=`));

  return cookie ? decodeURIComponent(cookie.split("=").slice(1).join("=")) : null;
};

const deleteCookie = (name: string) => {
  document.cookie = `${name}=; path=/; max-age=0; SameSite=Lax`;
};

const getTranslateX = (element: Element) => {
  const transform = window.getComputedStyle(element).transform;

  if (!transform || transform === "none") return 0;

  const matrix = new DOMMatrixReadOnly(transform);

  return matrix.m41;
};

const getAnimationDuration = (element: Element) => {
  const duration = window.getComputedStyle(element).animationDuration;
  const firstDuration = duration.split(",")[0]?.trim() ?? "0s";
  const seconds = firstDuration.endsWith("ms")
    ? Number.parseFloat(firstDuration) / 1000
    : Number.parseFloat(firstDuration);

  return Number.isFinite(seconds) && seconds > 0 ? seconds : 48;
};

const getActiveSlug = () => {
  const cards = Array.from(
    document.querySelectorAll<HTMLElement>("[data-about-featured-project]"),
  );

  if (cards.length === 0) return null;

  const viewportCenter = window.innerWidth / 2;
  let activeSlug: string | null = null;
  let closestDistance = Number.POSITIVE_INFINITY;

  cards.forEach((card) => {
    const rect = card.getBoundingClientRect();
    const cardCenter = rect.left + rect.width / 2;
    const distance = Math.abs(cardCenter - viewportCenter);

    if (distance < closestDistance) {
      closestDistance = distance;
      activeSlug = card.dataset.aboutFeaturedProject ?? null;
    }
  });

  return activeSlug;
};

const readFeaturedSliderState = (): AboutFeaturedSliderState | null => {
  const track = document.querySelector<HTMLElement>("[data-about-featured-track]");

  if (!track) return null;

  const translateX = getTranslateX(track);
  const loopWidth = Math.max(track.scrollWidth / 2, 1);
  const progress = Math.min(Math.max(Math.abs(translateX) / loopWidth, 0), 1);
  const timelineProgress = Number.parseFloat(track.dataset.gsapProgress ?? "");

  return {
    activeSlug: getActiveSlug(),
    animationDuration: getAnimationDuration(track),
    animationProgress: progress,
    timelineProgress: Number.isFinite(timelineProgress) ? timelineProgress : null,
    trackTranslateX: translateX,
  };
};

export const saveAboutNavigationState = () => {
  if (!isBrowser()) return;

  const state: AboutNavigationState = {
    scrollY: window.scrollY,
    featuredSlider: readFeaturedSliderState(),
    savedAt: Date.now(),
  };
  const serializedState = JSON.stringify(state);

  sessionStorage.setItem(stateKey, serializedState);
  sessionStorage.setItem(restoreKey, "true");
  setCookie(stateKey, serializedState);
  setCookie(restoreKey, "true");
};

export const readAboutNavigationState = () => {
  if (!isBrowser()) return null;

  const shouldRestore =
    getCookie(restoreKey) === "true" ||
    sessionStorage.getItem(restoreKey) === "true";
  const serializedState = getCookie(stateKey) ?? sessionStorage.getItem(stateKey);

  if (!shouldRestore || !serializedState) return null;

  try {
    return JSON.parse(serializedState) as AboutNavigationState;
  } catch {
    return null;
  }
};

export const clearAboutNavigationState = () => {
  if (!isBrowser()) return;

  sessionStorage.removeItem(stateKey);
  sessionStorage.removeItem(restoreKey);
  deleteCookie(stateKey);
  deleteCookie(restoreKey);
};
