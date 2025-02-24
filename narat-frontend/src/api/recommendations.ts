// src/api/recommendations.ts
import api from '@/utils/api';

interface GetRecommendationsParams {
  session_token: string;
}

interface CheckRecommendationStatusParams {
  rec_id: string;
}

// 추천 문제 목록 요청
export const getRecommendations = async (params: GetRecommendationsParams) => {
  return await api.post('/api/recommendations', params);
};

// 문제 추천 완료 확인
export const checkRecommendationStatus = async (params: CheckRecommendationStatusParams) => {
  return await api.get('/api/recommendations/success', { params });
};

export default {
  getRecommendations,
  checkRecommendationStatus,
};