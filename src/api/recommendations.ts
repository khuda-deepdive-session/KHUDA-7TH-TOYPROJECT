// src/api/recommendations.ts
import api from '../utils/api';
import type {
  RecommendationResponse,
  RecommendationSuccessResponse
} from './types';

export const recommendationsAPI = {
  getRecommendations: (session_token: string) =>
    api.post<RecommendationResponse>('/api/recommendations', { session_token }),
    
  checkRecommendationSuccess: (rec_id: string) =>
    api.get<RecommendationSuccessResponse>(`/api/recommendations/success`, { params: { rec_id } })
};