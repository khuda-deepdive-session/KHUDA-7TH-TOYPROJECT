//src/api/types.ts

// Auth Types
export interface GoogleLoginRequest {
  google_token: string;
}

export interface UserInfo {
  google_id: string;
  email: string;
  name: string;
  photo_url: string;
  display_name?: string;
  study_level?: number;
  gender?: boolean;
  age?: number;
}

export interface GoogleLoginResponse {
  session_token: string;
  user_info: UserInfo;
}

export interface VerifySessionRequest {
  session_token: string;
}

export interface VerifySessionResponse {
  is_valid: boolean;
  user_info: UserInfo;
}

export interface UpdateUserDetailRequest {
  session_token: string;
  display_name: string;
  gender?: boolean;
  age?: number;
}

export interface UpdateUserDetailResponse {
  success: boolean;
  user_info: UserInfo;
}

// Error Types
export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

// Session Types
export interface SessionData {
  token: string;
  user: UserInfo;
  expires_at: number;
}