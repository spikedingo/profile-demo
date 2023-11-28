export const checkIsMobile = () => {
  const ua = navigator.userAgent.toLowerCase();

  if (/mobile|android|iphone|ipad|phone|micromessenger/i.test(ua)) {
    return true;
  }
  return false;
};
