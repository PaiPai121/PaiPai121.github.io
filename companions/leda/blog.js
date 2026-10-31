(() => {
  if (document.getElementById('blog-leda')) return;
  const pet = document.createElement('fortuneweave-pet');
  pet.id = 'blog-leda';
  pet.setAttribute('character', 'leda');
  pet.setAttribute('size', '160');
  pet.setAttribute('storage-key', 'paipai-blog-leda-position');
  // Keep a reader's hide choice while navigating between blog pages.
  const visibilityKey = 'paipai-blog-leda-hidden';
  pet.addEventListener('pet:ready', () => {
    try { if (sessionStorage.getItem(visibilityKey) === 'true') pet.hide(); }
    catch { /* Storage is optional in private browsing. */ }
  }, {once: true});
  pet.addEventListener('pet:interaction', event => {
    if (event.detail.action === 'hide' || event.detail.action === 'greet') {
      try { sessionStorage.setItem(visibilityKey, String(event.detail.action === 'hide')); }
      catch { /* The component still works without persisted preferences. */ }
    }
  });
  document.body.append(pet);
})();
