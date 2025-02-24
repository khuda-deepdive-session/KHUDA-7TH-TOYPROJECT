//src/api/types.ts
// 인증 관련 타입
export interface AuthResponse {
  session_token: string;
  display_name: string;
  study_level: number;
}

export interface VerifyResponse {
  is_valid: boolean;
  display_name: string;
  study_level: number;
}

export interface LogoutResponse {
  success: boolean;
}

// 문제 관련 타입
export interface Question {
  question_id: number;
  category_id?: string;
  wrong_sentence: string;
  right_sentence: string;
  reason_code?: string;
  reason_detail?: string;
  wrong_word?: string;
  right_word?: string;
  location?: number;
  explanation: string;
  difficulty_level: number;
  is_active?: boolean;
  correct_ans: string;
  wrong_ans: string;
  question: string;
}

export interface QuestionsResponse {
  questions: Question[];
  total: number;
}

// 학습 관련 타입
export interface SubmitAnswerResponse {
  success: boolean;
  explanation: string;
}

export interface StudyHistoryItem {
  question_id: number;
  created_at: string;
  correct: number; // 0은 정답, 1은 오답
}

export interface StudyHistoryResponse {
  history: StudyHistoryItem[];
}

// 추천 관련 타입
export interface RecommendationsResponse {
  rec_id: string;
}

export interface RecommendationItem {
  question_id: number;
}

export interface RecommendationStatusResponse {
  success: boolean;
  recommendation: RecommendationItem[];
}

// 통계 관련 타입
export interface UserStatsResponse {
  study_states: StudyHistoryItem[];
}

export interface QuestionStatsItem {
  created_at: string;
  correct: number;
}

export interface QuestionStatsResponse {
  question_stats: QuestionStatsItem[];
}