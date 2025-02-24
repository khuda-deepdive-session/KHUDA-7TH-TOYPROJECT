  // Statistics Types
  export interface UserStatsResponse {
    study_stats: {
      total_questions: number;
      correct_rate: number;
      average_time: number;
    }
  }
  
  export interface QuestionStatsResponse {
    question_stats: {
      total_attempts: number;
      correct_rate: number;
      avg_time_spent: number;
      dropout_rate: number;
    }
  }