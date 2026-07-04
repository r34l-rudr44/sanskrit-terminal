import { registerSW } from 'virtual:pwa-register';

// Clear the one-shot retry flag once this load succeeded, so a future
// deploy-race failure is allowed to trigger another single reload.
window.addEventListener('load', () => sessionStorage.removeItem('sk_preload_retry'));

// A stale deploy can leave the page referencing a hashed chunk that no
// longer exists on the CDN edge; Vite fires this event when that fetch 404s.
window.addEventListener('vite:preloadError', () => {
  if (sessionStorage.getItem('sk_preload_retry')) return;
  sessionStorage.setItem('sk_preload_retry', '1');
  window.location.reload();
});

registerSW({
  onRegisterError(error) {
    console.error('[SW] registration failed', error);
  },
});
