(() => {
  const root = document.body;
  const menu = document.querySelector('[data-menu-toggle]');
  const mobileMenu = document.getElementById('mobile-menu');
  const dialog = document.querySelector('[data-settings]');
  const keys = ['largeText', 'contrast', 'reducedMotion'];
  const read = key => { try { return localStorage.getItem(`ren-rhapsody-${key}`) === 'true'; } catch { return false; } };
  const save = (key, value) => { try { localStorage.setItem(`ren-rhapsody-${key}`, String(value)); } catch {} };
  keys.forEach(key => { const input = document.querySelector(`[data-setting="${key}"]`); const enabled = read(key); root.classList.toggle(key === 'largeText' ? 'large-text' : key, enabled); if (input) input.checked = enabled; input?.addEventListener('change', () => { root.classList.toggle(key === 'largeText' ? 'large-text' : key, input.checked); save(key, input.checked); }); });
  document.querySelectorAll('[data-settings-open]').forEach(button => button.addEventListener('click', () => { if (dialog?.showModal) dialog.showModal(); }));
  menu?.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') === 'true'; menu.setAttribute('aria-expanded', String(!open)); mobileMenu.hidden = open; });
  mobileMenu?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => { mobileMenu.hidden = true; menu?.setAttribute('aria-expanded', 'false'); }));
})();
