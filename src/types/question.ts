// src/types/question.ts
export interface QuestionsListResponse {
  questions: Array<{
    question_id: string;
    wrong_sentence: string;
    right_sentence: string;
    category: string;
  }>;
  total: number;
}

export interface QuestionDetailResponse {
  question_id: string;
  wrong_sentence: string;
  right_sentence: string;
  explanation: string;
  category: string;
}

export interface SubmitAnswerRequest {
  session_token: string;
  question_id: string;
  answer: string;
}

export interface SubmitAnswerResponse {
  is_correct: boolean;
  explanation: string;
  next_question_id: string;
}

// 학습 이력 관련 타입 추가
export interface StudyHistoryResponse {
  history: Array<{
    question_id: string;
    wrong_sentence: string;
    right_sentence: string;
    solved_at: string;
    is_correct: boolean;
  }>;
}