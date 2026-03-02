export const uuid = () => {
  if (typeof window !== "undefined" && window.crypto?.randomUUID) {
    return window.crypto.randomUUID();
  }

  return Math.random().toString(36).substring(2, 11) + Date.now().toString(36);
};
