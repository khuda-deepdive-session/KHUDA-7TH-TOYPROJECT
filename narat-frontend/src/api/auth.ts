// src/api/auth.ts
import { AxiosError } from 'axios';
import apiClient from '@/utils/api';
import { User, AuthCredentials, ProfileUpdateData } from '@/types/auth';

interface AuthResponse {
  session_token: string;
  display_name: string;
  study_level: string;
  user?: User;
}

interface VerifyResponse {
  is_valid: boolean;
  google_id: string;
  email: string;
  display_name: string;
  study_level: string;
  created_at: string;
  last_login: string;
}

interface ProfileResponse {
  display_name: string;
  user: User;
}

export const loginWithGoogle = async (accessToken: string): Promise<AuthResponse> => {
  try {
    const { data } = await apiClient.post<AuthResponse>('/api/auth/google', {
      access_token: accessToken
    });
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || '로그인에 실패했습니다.');
    }
    throw error;
  }
};

export const verifySession = async (sessionToken: string): Promise<VerifyResponse> => {
  try {
    const { data } = await apiClient.post<VerifyResponse>('/api/auth/verify', {
      session_token: sessionToken
    });
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || '세션 검증에 실패했습니다.');
    }
    throw error;
  }
};

export const updateProfile = async (
  sessionToken: string, 
  profileData: ProfileUpdateData
): Promise<ProfileResponse> => {
  try {
    const { data } = await apiClient.post<ProfileResponse>('/api/auth/detail', {
      session_token: sessionToken,
      ...profileData
    });
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || '프로필 업데이트에 실패했습니다.');
    }
    throw error;
  }
};