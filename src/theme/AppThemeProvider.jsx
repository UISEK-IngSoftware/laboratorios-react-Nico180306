import { useEffect, useMemo, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import App from '../App.jsx';
import { getSystemThemeMode, getThemeByMode } from './theme.js';

export default function AppThemeProvider() {
  const [mode, setMode] = useState(getSystemThemeMode);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) {
      return undefined;
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (event) => setMode(event.matches ? 'dark' : 'light');

    handleChange(mediaQuery);
    mediaQuery.addEventListener?.('change', handleChange);

    return () => mediaQuery.removeEventListener?.('change', handleChange);
  }, []);

  const theme = useMemo(() => getThemeByMode(mode), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  );
}
