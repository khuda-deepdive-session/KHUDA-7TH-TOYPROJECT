// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthCredentials, ProfileUpdateData } from '@/types/auth';
import { loginWithGoogle, verifySession, updateProfile } from '@/api/auth';

interface AuthState {
  sessionToken: string | null;
  displayName: string | null;
  studyLevel: string | null;
  currentUser: User | null;
}

interface AuthContextType extends AuthState {
  isLoading: boolean;
  isAuthenticated: boolean;
  setAuth: (token: string, name: string, level: string) => void;
  clearAuth: () => void;
  login: (credentials: AuthCredentials) => Promise<void>;
  logout: () => Promise<void>;
  updateUserProfile: (data: ProfileUpdateData) => Promise<void>;
}

const INITIAL_STATE: AuthState = {
  sessionToken: null,
  displayName: null,
  studyLevel: null,
  currentUser: null,
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>(INITIAL_STATE);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('sessionToken');
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await verifySession(token);
        if (response.is_valid) {
          setAuthState({
            sessionToken: token,
            displayName: response.display_name,
            studyLevel: response.study_level,
            currentUser: {
              googleId: response.google_id,
              email: response.email,
              displayName: response.display_name,
              studyLevel: response.study_level,
              createdAt: response.created_at,
              lastLogin: response.last_login,
            },
          });
        } else {
          clearAuth();
        }
      } catch (error) {
        console.error('Session verification failed:', error);
        clearAuth();
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const setAuth = (token: string, name: string, level: string) => {
    localStorage.setItem('sessionToken', token);
    localStorage.setItem('displayName', name);
    localStorage.setItem('studyLevel', level);

    setAuthState({
      sessionToken: token,
      displayName: name,
      studyLevel: level,
      currentUser: null, // 세션 검증 후 업데이트됨
    });
  };

  const clearAuth = () => {
    localStorage.removeItem('sessionToken');
    localStorage.removeItem('displayName');
    localStorage.removeItem('studyLevel');
    setAuthState(INITIAL_STATE);
  };

  const login = async (credentials: AuthCredentials) => {
    setIsLoading(true);
    try {
      const response = await loginWithGoogle(credentials.access_token);
      setAuth(
        response.session_token,
        response.display_name,
        response.study_level
      );
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      // 서버 측 로그아웃 로직이 필요한 경우 여기에 추가
      clearAuth();
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateUserProfile = async (data: ProfileUpdateData) => {
    if (!authState.sessionToken) {
      throw new Error('Not authenticated');
    }

    setIsLoading(true);
    try {
      const response = await updateProfile(authState.sessionToken, data);
      setAuthState(prev => ({
        ...prev,
        displayName: response.display_name,
        currentUser: response.user,
      }));
    } catch (error) {
      console.error('Profile update failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        isLoading,
        isAuthenticated: !!authState.sessionToken,
        setAuth,
        clearAuth,
        login,
        logout,
        updateUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;