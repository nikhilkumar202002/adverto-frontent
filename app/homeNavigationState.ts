export type HomeProjectSliderState = {
  activeProjectId: string | null;
  animationDuration: number;
  animationProgress: number;
  trackTranslateX: number;
};

export type HomeServicesGridState = {
  activeServiceHref: string | null;
  pathname: string;
  uiState: {
    selectedCategory: string | null;
    selectedTab: string | null;
  };
};

export type HomeNavigationState = {
  projectSlider: HomeProjectSliderState | null;
  servicesGrid?: HomeServicesGridState | null;
  savedAt: number;
  scrollY: number;
};

const stateKey = "adverto:home-navigation-state";
const restoreKey = "adverto:home-navigation-restore-on-return";
const legacyScrollKey = "adverto:home-project-scroll-y";
const legacyRestoreKey = "adverto:home-project-restore-on-return";
const maxAge = 30 * 60;

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

  return new DOMMatrixReadOnly(transform).m41;
};

const getAnimationDuration = (element: Element) => {
  const duration = window.getComputedStyle(element).animationDuration;
  const firstDuration = duration.split(",")[0]?.trim() ?? "0s";
  const seconds = firstDuration.endsWith("ms")
    ? Number.parseFloat(firstDuration) / 1000
    : Number.parseFloat(firstDuration);

  return Number.isFinite(seconds) && seconds > 0 ? seconds : 52;
};

const getActiveProjectId = () => {
  const cards = Array.from(
    document.querySelectorAll<HTMLElement>("[data-home-project-card]"),
  );

  if (cards.length === 0) return null;

  const viewportCenter = window.innerWidth / 2;
  let activeProjectId: string | null = null;
  let closestDistance = Number.POSITIVE_INFINITY;

  cards.forEach((card) => {
    const rect = card.getBoundingClientRect();
    const cardCenter = rect.left + rect.width / 2;
    const distance = Math.abs(cardCenter - viewportCenter);

    if (distance < closestDistance) {
      closestDistance = distance;
      activeProjectId = card.dataset.homeProjectCard ?? null;
    }
  });

  return activeProjectId;
};

const readProjectSliderState = (): HomeProjectSliderState | null => {
  const track = document.querySelector<HTMLElement>("[data-home-project-track]");

  if (!track) return null;

  const trackTranslateX = getTranslateX(track);
  const loopWidth = Math.max(track.scrollWidth / 2, 1);
  const animationProgress = Math.min(
    Math.max(Math.abs(trackTranslateX) / loopWidth, 0),
    1,
  );

  return {
    activeProjectId: getActiveProjectId(),
    animationDuration: getAnimationDuration(track),
    animationProgress,
    trackTranslateX,
  };
};

const readServicesGridState = (
  activeServiceHref: string | null,
): HomeServicesGridState => {
  const searchParams = new URLSearchParams(window.location.search);

  return {
    activeServiceHref,
    pathname: window.location.pathname,
    uiState: {
      selectedCategory: searchParams.get("category"),
      selectedTab: searchParams.get("tab"),
    },
  };
};

const writeHomeNavigationState = (state: HomeNavigationState) => {
  const serializedState = JSON.stringify(state);

  sessionStorage.setItem(stateKey, serializedState);
  sessionStorage.setItem(restoreKey, "true");
  setCookie(stateKey, serializedState);
  setCookie(restoreKey, "true");
};

export const saveHomeNavigationState = () => {
  writeHomeNavigationState({
    projectSlider: readProjectSliderState(),
    servicesGrid: null,
    savedAt: Date.now(),
    scrollY: window.scrollY,
  });
};

export const saveHomeServicesGridNavigationState = (
  activeServiceHref: string,
) => {
  writeHomeNavigationState({
    projectSlider: readProjectSliderState(),
    servicesGrid: readServicesGridState(activeServiceHref),
    savedAt: Date.now(),
    scrollY: window.scrollY,
  });
};

export const hasHomeNavigationState = () =>
  getCookie(restoreKey) === "true" ||
  sessionStorage.getItem(restoreKey) === "true";

export const readHomeNavigationState = () => {
  const shouldRestore = hasHomeNavigationState();
  const serializedState = getCookie(stateKey) ?? sessionStorage.getItem(stateKey);

  if (shouldRestore && serializedState) {
    try {
      return JSON.parse(serializedState) as HomeNavigationState;
    } catch {
      return null;
    }
  }

  const legacyShouldRestore =
    getCookie(legacyRestoreKey) === "true" ||
    sessionStorage.getItem(legacyRestoreKey) === "true";
  const legacyScrollY =
    getCookie(legacyScrollKey) ?? sessionStorage.getItem(legacyScrollKey);
  const scrollY = Number(legacyScrollY);

  if (!legacyShouldRestore || !Number.isFinite(scrollY)) return null;

  return {
    projectSlider: null,
    servicesGrid: null,
    savedAt: Date.now(),
    scrollY,
  };
};

export const clearHomeNavigationState = () => {
  sessionStorage.removeItem(stateKey);
  sessionStorage.removeItem(restoreKey);
  sessionStorage.removeItem(legacyScrollKey);
  sessionStorage.removeItem(legacyRestoreKey);
  deleteCookie(stateKey);
  deleteCookie(restoreKey);
  deleteCookie(legacyScrollKey);
  deleteCookie(legacyRestoreKey);
};
