(() => {
  const root = document.documentElement;
  const key = 'jyotisha-reader-theme-v1';
  let saved;
  try { saved = localStorage.getItem(key); } catch {}
  root.dataset.theme = saved === 'light' || saved === 'dark'
    ? saved
    : matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

  document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('themeToggle');
    const update = () => {
      const dark = root.dataset.theme === 'dark';
      toggle.setAttribute('aria-pressed', String(dark));
      toggle.textContent = dark ? '☀' : '☾';
    };
    toggle.addEventListener('click', () => {
      root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
      try { localStorage.setItem(key, root.dataset.theme); } catch {}
      update();
    });
    update();
  });
})();
