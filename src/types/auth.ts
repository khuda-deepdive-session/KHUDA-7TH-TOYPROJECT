// src/types/auth.ts
export interface User {
  googleId: string;
  email: string;
  displayName: string;
  studyLevel: string;
  createdAt: string;
  lastLogin: string;
  gender?: 'male' | 'female';  // boolean -> 'male' | 'female'로 변경
  age?: number;
  photoUrl?: string;
}

export interface AuthCredentials {
  access_token: string;
}

export interface AuthResponse {
  session_token: string;
  display_name: string;
  study_level: string;
  user?: User;
}

export interface VerifyResponse {
  is_valid: boolean;
  google_id: string;
  email: string;
  display_name: string;
  study_level: string;
  created_at: string;
  last_login: string;
}

export interface ProfileUpdateData {
  display_name: string;
  gender: 'male' | 'female';
  age: number;
}

export interface ProfileResponse {
  display_name: string;
  user: User;
}

export interface ApiError {
  code: string;
  message: string;
}