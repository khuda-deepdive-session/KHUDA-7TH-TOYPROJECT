// src/styles/theme.ts
export const theme = {
  colors: {
    primary: {
      deep: '#1a237e',
      main: '#303f9f',    // main 추가
      secondary: '#3f51b5',
      light: '#7986cb',
      hover: '#283593'    // hover 추가
    },
    background: {
      primary: '#ffffff',
      secondary: '#f5f5f5'
    },
    mono: {
      black: '#000000',
      white: '#ffffff',
      gray: '#666666',
      lightGray: '#999999',
      darkGray: '#333333'
    },
    status: {
      success: '#4caf50',
      error: '#f44336',
      warning: '#ff9800',
      info: '#2196f3'
    }
  },
  transitions: {
    fast: '0.2s',
    normal: '0.3s',
    slow: '0.5s'
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem'
  },
  typography: {
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem'
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      bold: 700
    }
  },
  borderRadius: {
    none: '0',
    sm: '0.125rem',
    base: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    full: '9999px'
  },
  shadows: {     // shadows 추가
    sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
  }
};

export type Theme = typeof theme;