// src/routes/statistics/index.tsx
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { QuestionStats } from '@/components/statistics/QuestionStats';
import { UserStats } from '@/components/statistics/UserStats';
import { getRecentQuestions } from '@/api/questions';

const Statistics = () => {
  const { isAuthenticated, sessionToken } = useAuth();
  const [recentQuestionId, setRecentQuestionId] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecentQuestion = async () => {
      if (!sessionToken) return;
      
      try {
        const recentQuestions = await getRecentQuestions(sessionToken);
        if (recentQuestions.length > 0) {
          setRecentQuestionId(recentQuestions[0].question_id); // id -> question_id
        }
      } catch (error) {
        console.error('Failed to fetch recent questions:', error);
      }
    };

    fetchRecentQuestion();
  }, [sessionToken]); // sessionToken 의존성 추가

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="mb-8 p-6 bg-white rounded-lg shadow">
        <UserStats />
      </div>
      {recentQuestionId && (
        <div className="p-6 bg-white rounded-lg shadow">
          <QuestionStats questionId={recentQuestionId} />
        </div>
      )}
    </div>
  );
};

export default Statistics;