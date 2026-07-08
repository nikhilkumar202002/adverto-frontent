export const runAfterPageReady = (
  callback: () => void,
  options: { delayMs?: number; waitForFonts?: boolean } = {},
) => {
  const { delayMs = 90, waitForFonts = true } = options;

  const run = () => {
    const execute = () => {
      callback();

      window.requestAnimationFrame(() => {
        callback();
        window.setTimeout(() => callback(), delayMs);
      });
    };

    if (document.readyState === "loading") {
      window.addEventListener("load", execute, { once: true });
      return () => window.removeEventListener("load", execute);
    }

    if (
      waitForFonts &&
      "fonts" in document &&
      typeof document.fonts?.ready?.then === "function"
    ) {
      void document.fonts.ready.then(execute);
      return () => undefined;
    }

    execute();
    return () => undefined;
  };

  return run();
};
