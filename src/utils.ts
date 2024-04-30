export const getBaseUrl = (): string => {
  const crtUrl: URL = new URL(window.location.href);
  return `${crtUrl.protocol}//${crtUrl.host}`;
};
