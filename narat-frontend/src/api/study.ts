//src/api/study.ts
import api from '@/utils/api';

interface SubmitAnswerParams {
  session_token: string;
  question_id: number;
  correct: boolean;
}

interface GetStudyHistoryParams {
  session_token: string;
  limit?: number;
}

// 답안 제출
export const submitAnswer = async (params: SubmitAnswerParams) => {
  return await api.post('/api/study/submit', params);
};

// 학습 이력 조회
export const getStudyHistory = async (params: GetStudyHistoryParams) => {
  return await api.post('/api/study/history', params);
};

export default {
  submitAnswer,
  getStudyHistory,
};