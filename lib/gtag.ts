export const gaTrackingId = 'UA-51514713-1';

export const pageview = (url: URL): void => {
  // @ts-ignore
  window.gtag('config', gaTrackingId, { page_path: url });
};
