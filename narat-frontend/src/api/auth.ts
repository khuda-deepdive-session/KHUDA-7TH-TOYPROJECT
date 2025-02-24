// src/api/auth.ts
import api from '@/utils/api';

// 인증 관련 응답 타입
export interface AuthResponse {
  session_token: string;
  display_name: string;
  study_level: number;
}

interface GoogleLoginParams {
  access_token: string;
}

interface VerifySessionParams {
  session_token: string;
}

interface LogoutParams {
  session_token: string;
}

interface UpdateProfileParams {
  session_token: string;
  display_name?: string;
  gender?: boolean;
  age?: number;
}

// Google 로그인
export const loginWithGoogle = async (params: GoogleLoginParams): Promise<AuthResponse> => {
  return await api.post('/api/auth/google', params);
};

// 세션 검증
export const verifySession = async (sessionToken: string) => {
  const params: VerifySessionParams = { session_token: sessionToken };
  return await api.post('/api/auth/verify', params);
};


// 로그아웃
export const logout = async (params: LogoutParams) => {
  return await api.post('/api/auth/logout', params);
};

// 테스트용 세션 생성 (개발 환경에서만 사용)
export const createTestSession = async (params: GoogleLoginParams) => {
  return await api.post('/api/auth/test_session_create', params);
};

// 사용자 프로필 업데이트
export const updateProfile = async (params: UpdateProfileParams) => {
  return await api.post('/api/auth/detail', params);
};

export default {
  loginWithGoogle,
  verifySession,
  logout,
  createTestSession,
  updateProfile,
};