import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: {
        deep: string;
        secondary: string;
        light: string;
      };
      background: {
        primary: string;
        secondary: string;
      };
      mono: {
        black: string;    // 추가
        white: string;    // 추가
        gray: string;
        lightGray: string;
        darkGray: string;
      };
      status: {
        success: string;
        error: string;
        warning: string;
        info: string;
      };
    };
    spacing: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      '2xl': string;
      '3xl': string;
    };
    typography: {
      fontSize: {
        xs: string;
        sm: string;
        base: string;
        lg: string;
        xl: string;
        '2xl': string;
        '3xl': string;
        '4xl': string;
      };
      fontWeight: {
        normal: number;
        medium: number;
        bold: number;
      };
    };
    borderRadius: {
      none: string;
      sm: string;
      base: string;
      md: string;
      lg: string;
      xl: string;
      full: string;
    };
    transitions: {    // 추가
      fast: string;
      normal: string;
      slow: string;
    };
  }
}