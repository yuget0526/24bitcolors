export const triggerAndroidHaptic = () => {
  // Check if navigator exists (SSR protection) and vibrate is supported
  if (
    typeof navigator !== "undefined" &&
    typeof navigator.vibrate === "function"
  ) {
    try {
      // Short 10ms pulse for a crisp "click" feel
      // Use array format for better compatibility
      navigator.vibrate([10]);
    } catch (e) {
      // Ignore errors (e.g. security policy blocking)
      console.debug("Haptics failed:", e);
    }
  }
};
