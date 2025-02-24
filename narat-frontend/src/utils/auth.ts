// src/utils/auth.ts
export const AUTH_TOKEN_KEY = 'session_token';

export const authUtils = {
  setToken: (token: string) => {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
  },

  getToken: () => {
    return localStorage.getItem(AUTH_TOKEN_KEY);
  },

  removeToken: () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
  },

  isAuthenticated: () => {
    return !!localStorage.getItem(AUTH_TOKEN_KEY);
  },

  handleLogout: () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    window.location.href = '/auth/login';
  }
};
