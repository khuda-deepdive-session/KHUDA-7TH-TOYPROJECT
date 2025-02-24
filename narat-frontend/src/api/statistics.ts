// src/api/statistics.ts
import api from '@/utils/api';

interface GetUserStatsParams {
  session_token: string;
}

// 사용자 통계 조회
export const getUserStats = async (params: GetUserStatsParams) => {
  return await api.post('/api/stats/user', params);
};

// 문제별 통계 조회
export const getQuestionStats = async (id: number) => {
  return await api.get(`/api/stats/questions/${id}`);
};

export default {
  getUserStats,
  getQuestionStats,
};