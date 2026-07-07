export type ServicePageState = {
  activeServiceHref: string | null;
  pathname: string;
  savedAt: number;
  scrollY: number;
  uiState: {
    selectedCategory: string | null;
    selectedTab: string | null;
  };
};

const stateKey = "adverto:service-page-state";
const restoreKey = "adverto:service-page-restore-on-return";
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

const buildServicePageState = (
  activeServiceHref: string | null,
  scrollY: number,
): ServicePageState => {
  const params = new URLSearchParams(window.location.search);

  return {
    activeServiceHref,
    pathname: window.location.pathname,
    savedAt: Date.now(),
    scrollY,
    uiState: {
      selectedCategory: params.get("category"),
      selectedTab: params.get("tab"),
    },
  };
};

const writeServicePageState = (state: ServicePageState) => {
  const serializedState = JSON.stringify(state);

  sessionStorage.setItem(stateKey, serializedState);
  sessionStorage.setItem(restoreKey, "true");
  setCookie(stateKey, serializedState);
  setCookie(restoreKey, "true");
};

export const saveServicePageState = (activeServiceHref: string | null) => {
  writeServicePageState(buildServicePageState(activeServiceHref, window.scrollY));
};

export const ensureServicePageFallbackState = () => {
  if (hasServicePageState()) return;

  writeServicePageState(buildServicePageState(null, 0));
};

export const hasServicePageState = () =>
  getCookie(restoreKey) === "true" ||
  sessionStorage.getItem(restoreKey) === "true";

export const readServicePageState = () => {
  const shouldRestore = hasServicePageState();
  const serializedState = getCookie(stateKey) ?? sessionStorage.getItem(stateKey);

  if (!shouldRestore || !serializedState) return null;

  try {
    return JSON.parse(serializedState) as ServicePageState;
  } catch {
    return null;
  }
};

export const clearServicePageState = () => {
  sessionStorage.removeItem(stateKey);
  sessionStorage.removeItem(restoreKey);
  deleteCookie(stateKey);
  deleteCookie(restoreKey);
};
