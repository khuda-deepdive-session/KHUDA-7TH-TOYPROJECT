// src/context/AuthContext.tsx
import React, { createContext, useState, Dispatch, SetStateAction, ReactNode } from 'react';

interface User {
  displayName: string;
  studyLevel: number;
  isAuthenticated: boolean;
}

interface AuthContextType {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
}

const defaultValue: AuthContextType = {
  user: null,
  setUser: () => {}
};

export const AuthContext = createContext<AuthContextType>(defaultValue);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};