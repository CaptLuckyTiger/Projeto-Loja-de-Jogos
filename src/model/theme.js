export function applyTheme(theme) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  if (!root) return;
  if (theme === 'dark') {
    root.classList.add('theme-dark');
  } else {
    root.classList.remove('theme-dark');
  }
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('checkpoint-theme', JSON.stringify(theme));
    }
  } catch {
    // ignore
  }
}
