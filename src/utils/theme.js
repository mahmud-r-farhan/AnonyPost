export const themes = {
  light: {
    primary: '#4F46E5',
    secondary: '#3B82F6',
    background: '#FFFFFF',
    surface: '#F9FAFB',
  },
  dark: {
    primary: '#6366F1',
    secondary: '#60A5FA',
    background: '#111827',
    surface: '#1F2937',
  }
};

export const getDefaultTheme = () => {
  if (typeof window !== 'undefined') {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'light';
};

export const setTheme = (theme) => {
  const root = document.documentElement;
  const selectedTheme = themes[theme];
  
  Object.entries(selectedTheme).forEach(([key, value]) => {
    root.style.setProperty(`--${key}`, value);
  });
  
  if (theme === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
  localStorage.setItem('theme', theme);
};
