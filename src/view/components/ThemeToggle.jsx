export default function ThemeToggle({ theme, onToggle }) {
  return (
    <button
      className="theme-toggle"
      onClick={onToggle}
      aria-label={theme === 'dark' ? 'Mudar para tema claro' : 'Mudar para tema escuro'}
      title={theme === 'dark' ? 'Tema escuro (clique para mudar)' : 'Tema claro (clique para mudar)'}
    >
      <span className="theme-icon">{theme === 'dark' ? '🌙' : '☀️'}</span>
    </button>
  );
}
