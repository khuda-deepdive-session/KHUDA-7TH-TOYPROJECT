// src/api/questions.ts
import { AxiosError } from 'axios';
import api from '@/utils/api';
import type {
  QuestionsListResponse,
  QuestionDetailResponse,
  SubmitAnswerRequest,
  SubmitAnswerResponse,
  StudyHistoryResponse
} from '@/types/question';

export const questionsAPI = {
  getQuestions: (page: number, limit: number) =>
    api.get<QuestionsListResponse>('/api/questions', { params: { page, limit } }),
    
  getQuestionDetail: (id: string) =>
    api.get<QuestionDetailResponse>(`/api/questions/${id}`),
    
  submitAnswer: (data: SubmitAnswerRequest) =>
    api.post<SubmitAnswerResponse>('/api/study/submit', data),
    
  getStudyHistory: async (session_token: string, limit: number = 5) => {
    try {
      const response = await api.post<StudyHistoryResponse>('/api/study/history', { 
        session_token, 
        limit 
      });
      return response.data.history;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data?.message || '학습 이력을 불러오는데 실패했습니다.');
      }
      throw error;
    }
  }
};

// Statistics 컴포넌트에서 사용할 수 있도록 getRecentQuestions 함수 추가
export const getRecentQuestions = (session_token: string, limit: number = 5) => {
  return questionsAPI.getStudyHistory(session_token, limit);
};