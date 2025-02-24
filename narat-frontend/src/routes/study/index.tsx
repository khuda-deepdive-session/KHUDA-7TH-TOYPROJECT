//src/routes/study/index.tsx
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trophy, Home, BarChart2, Lightbulb, User } from 'lucide-react';
import QuestionCard from '@/components/study/QuestionCard';
import Loading from '@/components/common/Loading';
import { AuthContext } from '@/context/AuthContext';
import { getQuestions } from '@/api/questions';
import { submitAnswer } from '@/api/study';

const StudyPage: React.FC = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);
  
  useEffect(() => {
    // 인증 확인
    if (!user?.isAuthenticated) {
      navigate('/login');
      return;
    }
    
    // 문제 목록 불러오기
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const response = await getQuestions({ page: 1, limit: 10 });
        setQuestions(response.questions || []);
      } catch (error) {
        console.error('Failed to fetch questions:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchQuestions();
  }, [user, navigate]);
  
  const handleAnswerSubmit = async (questionId: number, isCorrect: boolean) => {
    try {
      // 서버에 답안 제출
      const sessionToken = localStorage.getItem('session_token') || '';
      await submitAnswer({
        session_token: sessionToken,
        question_id: questionId,
        correct: isCorrect
      });
      
      // 통계 업데이트
      setTotalAnswered(prev => prev + 1);
      if (isCorrect) {
        setCorrectAnswers(prev => prev + 1);
      }
    } catch (error) {
      console.error('Failed to submit answer:', error);
    }
  };
  
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // 모든 문제를 다 풀었을 때 처리
      // 예: 결과 페이지로 이동 또는 축하 메시지 표시
      alert('모든 문제를 완료했습니다!');
    }
  };
  
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };
  
  const goToPage = (path: string) => {
    navigate(path);
  };
  
  if (loading) {
    return <Loading />;
  }
  
  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-800 mb-4">사용 가능한 문제가 없습니다</h2>
          <p className="text-gray-600 mb-6">잠시 후 다시 시도해주세요.</p>
          <button
            onClick={() => navigate('/')}
            className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
          >
            홈으로 돌아가기
          </button>
        </div>
      </div>
    );
  }
  
  const currentQuestion = questions[currentQuestionIndex];
  
  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* 상단 헤더 */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-indigo-700">나랏말씀</h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium">
              <Trophy className="inline-block text-amber-500 mr-1" size={18} />
              {correctAnswers}/{totalAnswered}
            </span>
            <button className="text-gray-600 hover:text-gray-800 rounded-full overflow-hidden">
              <img 
                src="https://via.placeholder.com/32" 
                alt="User Profile" 
                className="w-8 h-8 rounded-full" 
              />
            </button>
          </div>
        </div>
      </header>
      
      {/* 메인 콘텐츠 */}
      <main className="container mx-auto px-4 py-8">
        <QuestionCard
          question={currentQuestion}
          onNext={handleNextQuestion}
          onPrevious={handlePreviousQuestion}
          onSubmit={handleAnswerSubmit}
          currentIndex={currentQuestionIndex}
          totalQuestions={questions.length}
        />
      </main>
      
      {/* 하단 네비게이션 */}
      <footer className="bg-white shadow-md border-t border-gray-200 fixed bottom-0 w-full">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-around">
            <button 
              className="text-indigo-600 font-medium text-sm flex flex-col items-center"
              onClick={() => goToPage('/')}
            >
              <Home size={20} className="mb-1" />
              홈
            </button>
            <button 
              className="text-gray-500 font-medium text-sm flex flex-col items-center"
              onClick={() => goToPage('/statistics')}
            >
              <BarChart2 size={20} className="mb-1" />
              통계
            </button>
            <button 
              className="text-gray-500 font-medium text-sm flex flex-col items-center"
              onClick={() => goToPage('/recommendations')}
            >
              <Lightbulb size={20} className="mb-1" />
              추천
            </button>
            <button 
              className="text-gray-500 font-medium text-sm flex flex-col items-center"
              onClick={() => goToPage('/profile')}
            >
              <User size={20} className="mb-1" />
              프로필
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default StudyPage;