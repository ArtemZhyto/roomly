const themeScript = `
  (() => {
    try {
      const storedTheme = localStorage.getItem('roomly-theme');
      const preference =
        storedTheme === 'light' ||
        storedTheme === 'dark' ||
        storedTheme === 'system'
          ? storedTheme
          : 'system';

      const resolvedTheme =
        preference === 'system'
          ? window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'light'
          : preference;

      document.documentElement.dataset.theme = resolvedTheme;
      document.documentElement.style.colorScheme = resolvedTheme;
    } catch {
      document.documentElement.dataset.theme = 'light';
      document.documentElement.style.colorScheme = 'light';
    }
  })();
`

const ThemeScript = () => {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: themeScript,
      }}
    />
  )
}

export default ThemeScript
