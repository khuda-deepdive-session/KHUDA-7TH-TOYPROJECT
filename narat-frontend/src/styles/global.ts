// src/styles/global.ts
import { createGlobalStyle } from 'styled-components';
import { theme } from './theme';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: ${theme.typography.fontFamily.primary};
    background-color: ${theme.colors.background.primary};
    color: ${theme.colors.mono.black};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  button {
    cursor: pointer;
    border: none;
    background: none;
    font-family: inherit;
  }

  input, textarea {
    font-family: inherit;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  /* 토스의 부드러운 스크롤 효과 */
  html {
    scroll-behavior: smooth;
  }

  /* 토스 스타일 스크롤바 */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${theme.colors.background.secondary};
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb {
    background: ${theme.colors.mono.gray};
    border-radius: 4px;
  }

  /* 모바일 탭 하이라이트 제거 */
  -webkit-tap-highlight-color: transparent;

  /* 토스 스타일 텍스트 선택 */
  ::selection {
    background: ${theme.colors.primary.main}40;
  }
`;