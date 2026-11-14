(() => {
  if (document.getElementById('blog-leda')) return;
  const pet = document.createElement('fortuneweave-pet');
  pet.id = 'blog-leda';
  pet.setAttribute('character', 'leda');
  pet.setAttribute('size', '160');
  pet.setAttribute('storage-key', 'paipai-blog-leda-position');
  // The generic widget sleeps after 45 seconds; keep this blog companion awake.
  pet.setAttribute('auto-idle', 'false');
  // Keep a reader's hide choice while navigating between blog pages.
  const visibilityKey = 'paipai-blog-leda-hidden';
  let ready = false;
  let idleTimer;
  const schedulePerformance = () => {
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => {
      if (document.hidden || pet.state !== 'idle' || pet.pointer ||
          pet.shadowRoot.querySelector('.figure').hidden ||
          matchMedia('(prefers-reduced-motion: reduce)').matches) {
        schedulePerformance();
        return;
      }
      pet.act('music');
    }, 15000);
  };
  pet.addEventListener('pet:ready', () => {
    ready = true;
    try { if (sessionStorage.getItem(visibilityKey) === 'true') pet.hide(); }
    catch { /* Storage is optional in private browsing. */ }
    schedulePerformance();
  }, {once: true});
  pet.addEventListener('pet:interaction', event => {
    if (!ready) return;
    schedulePerformance();
    if (event.detail.action === 'hide' || event.detail.action === 'greet') {
      try { sessionStorage.setItem(visibilityKey, String(event.detail.action === 'hide')); }
      catch { /* The component still works without persisted preferences. */ }
    }
  });
  document.body.append(pet);
})();
