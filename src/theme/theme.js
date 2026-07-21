import { createTheme } from '@mui/material/styles';

const lightPalette = {
  mode: 'light',
  primary: {
    main: '#054690',
  },
  secondary: {
    main: '#2b7ba8',
  },
  error: {
    main: '#ef1403',
  },
  success: {
    main: '#40ad44',
  },
  background: {
    default: '#f5f7fb',
    paper: '#ffffff',
  },
  text: {
    primary: '#14213d',
    secondary: '#4b5563',
  },
};

const darkPalette = {
  mode: 'dark',
  primary: {
    main: '#6ea8ff',
  },
  secondary: {
    main: '#7dd3fc',
  },
  error: {
    main: '#ff6b6b',
  },
  success: {
    main: '#4ade80',
  },
  background: {
    default: '#0f172a',
    paper: '#111827',
  },
  text: {
    primary: '#f8fafc',
    secondary: '#cbd5e1',
  },
};

export const lightTheme = createTheme({
  palette: lightPalette,
});

export const darkTheme = createTheme({
  palette: darkPalette,
});

export const getThemeByMode = (mode) => (mode === 'dark' ? darkTheme : lightTheme);

export const getSystemThemeMode = () => {
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  return 'light';
};