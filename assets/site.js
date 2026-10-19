(() => {
  const storage = {
    get(key) { try { return localStorage.getItem(key); } catch { return null; } },
    set(key, value) { try { localStorage.setItem(key, value); } catch {} }
  };
  const system = window.matchMedia('(prefers-color-scheme: dark)');
  let theme = storage.get('theme');
  if (!['light', 'dark', 'system'].includes(theme)) theme = 'system';
  function applyTheme() {
    document.documentElement.classList.toggle('dark', theme === 'dark' || (theme === 'system' && system.matches));
    for (const name of ['light', 'dark', 'system']) {
      document.getElementById(`icon-${name}`)?.classList.toggle('hidden', name !== theme);
    }
  }
  window.toggleTheme = () => {
    theme = { system: 'light', light: 'dark', dark: 'system' }[theme];
    storage.set('theme', theme);
    applyTheme();
  };
  applyTheme();
  system.addEventListener('change', applyTheme);
  // Language changes require a user choice; content is identical for people and bots.
  document.querySelectorAll('select[data-language-select]').forEach(select => {
    select.value = document.documentElement.lang;
    select.addEventListener('change', () => {
      const selected = select.selectedOptions[0];
      if (selected?.dataset.url) window.location.assign(selected.dataset.url);
    });
  });
  const menu = document.getElementById('mobile-menu');
  const button = document.getElementById('mobile-menu-btn');
  button?.addEventListener('click', () => {
    const isHidden = menu.classList.toggle('hidden');
    button.setAttribute('aria-expanded', String(!isHidden));
  });
  menu?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    menu.classList.add('hidden');
    button?.setAttribute('aria-expanded', 'false');
  }));
})();
