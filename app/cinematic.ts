export const sessionKey = 'branquinho-cinematic-intro';

// Run before the page paints so the final composition never flashes before the opening.
export const cinematicBootstrap = `(() => {
  const root = document.documentElement;
  if (location.pathname !== '/' || location.hash || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  try { if (sessionStorage.getItem('${sessionKey}')) return; } catch {}
  root.dataset.cinematic = 'pending';
  setTimeout(() => {
    if (root.dataset.cinematic === 'pending') delete root.dataset.cinematic;
  }, 1800);
})();`;
