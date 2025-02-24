// src/api/questions.ts

import api from '@/utils/api';

interface GetQuestionsParams {
  page: number;
  limit: number;
}

// 문제 목록 조회
export const getQuestions = async (params: GetQuestionsParams) => {
  return await api.get('/api/questions', { params });
};

// 개별 문제 조회
export const getQuestion = async (id: number) => {
  return await api.get(`/api/questions/${id}`);
};

export default {
  getQuestions,
  getQuestion,
};