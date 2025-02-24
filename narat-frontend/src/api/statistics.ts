// src/api/statistics.ts
import { AxiosError } from 'axios';
import { apiClient } from '@/utils/api';

export interface DailyStats {
  attempts: number;
  correct_rate: number;
}

export interface QuestionStats {
  correct_rate: number;
  avg_time_spent: number;
  dropout_rate: number;
  total_attempts: number;
  daily_stats: Record<string, DailyStats>;
}

export interface CategoryStats {
  hanja_confusion: number;
  passive_active: number;
  spoken_written: number;
  ending_confusion: number;
  honorific_casual: number;
}

export interface DailyProgress {
  date: string;
  solved_count: number;
  correct_rate: number;
}

export interface UserStats {
  current_level: '가' | '양' | '미' | '우' | '수';
  category_stats: CategoryStats;
  daily_progress: DailyProgress[];
}

export class StatisticsError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'StatisticsError';
  }
}

export const getQuestionStats = async (questionId: string): Promise<QuestionStats> => {
  try {
    const response = await apiClient.get<QuestionStats>(`/api/stats/questions/${questionId}`);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new StatisticsError(error.response?.data?.message || '문제 통계를 불러오는데 실패했습니다.');
    }
    throw error;
  }
};

export const getUserStats = async (sessionToken: string): Promise<UserStats> => {
  try {
    const response = await apiClient.post<UserStats>('/api/stats/user', { session_token: sessionToken });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new StatisticsError(error.response?.data?.message || '사용자 통계를 불러오는데 실패했습니다.');
    }
    throw error;
  }
};