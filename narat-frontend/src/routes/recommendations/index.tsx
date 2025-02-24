//KHUDA-7TH-TOYPROJECT/narat-frontend/src/routes/recommendations/index.tsx
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Book, Clock, Award, ArrowRight, ChevronRight, Home, BarChart2, Lightbulb, User } from 'lucide-react';
import Loading from '@/components/common/Loading';
import Button from '@/components/common/Button';
import { AuthContext } from '@/context/AuthContext';
import { getRecommendations, checkRecommendationStatus } from '@/api/recommendations';

interface RecommendationQuestion {
  id: number;
  type: string;
  question: string;
  options: string[];
  difficulty: string;
}

const RecommendationsPage: React.FC = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [recommendedQuestions, setRecommendedQuestions] = useState<RecommendationQuestion[]>([]);
  const [recId, setRecId] = useState<string | null>(null);
  
  useEffect(() => {
    // 인증 확인
    if (!user?.isAuthenticated) {
      navigate('/login');
      return;
    }
    
    // 페이지 로딩 시 추천 문제 가져오기
    fetchRecommendations();
  }, [user, navigate]);
  
  const fetchRecommendations = async () => {
    try {
      setLoading(true);
      
      // 새 추천 요청
      const sessionToken = localStorage.getItem('session_token') || '';
      const response = await getRecommendations({ session_token: sessionToken });
      
      if (response.rec_id) {
        setRecId(response.rec_id);
        
        // 추천 완료 여부 확인
        checkRecommendationsStatus(response.rec_id);
      }
    } catch (error) {
      console.error('Failed to fetch recommendations:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const checkRecommendationsStatus = async (id: string) => {
    try {
      // 최대 10번까지 시도 (5초 간격)
      let attempts = 0;
      const maxAttempts = 10;
      
      const checkStatus = async () => {
        if (attempts >= maxAttempts) {
          console.error('Recommendation generation timed out');
          return;
        }
        
        attempts++;
        const statusResponse = await checkRecommendationStatus({ rec_id: id });
        
        if (statusResponse.success) {
          // 추천 문제 변환 및 저장
          const formattedQuestions = statusResponse.recommendation.map((item: any) => ({
            id: item.question_id,
            type: item.category || '일반',
            question: 'Choose the grammatically correct sentence:',
            options: [item.correct_ans, item.wrong_ans],
            difficulty: getDifficultyLevel(item.difficulty_level || 1)
          }));
          
          setRecommendedQuestions(formattedQuestions);
        } else {
          // 아직 완료되지 않았으면 5초 후 재시도
          setTimeout(checkStatus, 5000);
        }
      };
      
      checkStatus();
    } catch (error) {
      console.error('Failed to check recommendation status:', error);
    }
  };
  
  const handleRefreshRecommendations = () => {
    setUpdating(true);
    
    // 새로운 추천 요청
    fetchRecommendations().finally(() => {
      setUpdating(false);
    });
  };
  
  const goToQuestion = (questionId: number) => {
    // 문제 페이지로 이동
    // 실제 구현에서는 해당 문제로 이동하는 로직 추가
    navigate(`/study?question=${questionId}`);
  };
  
  const goToPage = (path: string) => {
    navigate(path);
  };
  
  const getDifficultyLevel = (level: number): string => {
    if (level <= 1) return '초급';
    if (level <= 2) return '중급';
    return '고급';
  };
  
  // 샘플 카테고리 데이터
  const categories = [
    { name: '시제', icon: <Clock size={20} />, color: 'bg-blue-500', count: 35 },
    { name: '전치사', icon: <Book size={20} />, color: 'bg-green-500', count: 42 },
    { name: '관사', icon: <Award size={20} />, color: 'bg-purple-500', count: 28 }
  ];
  
  if (loading && recommendedQuestions.length === 0) {
    return <Loading />;
  }
  
  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* 상단 헤더 */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-indigo-700">맞춤 학습</h1>
          <button className="text-gray-600 hover:text-gray-800 rounded-full overflow-hidden">
            <img 
              src="https://via.placeholder.com/32" 
              alt="User Profile" 
              className="w-8 h-8 rounded-full" 
            />
          </button>
        </div>
      </header>
      
      {/* 메인 콘텐츠 */}
      <main className="container mx-auto px-4 py-6">
        {/* 소개 카드 */}
        <div className="bg-indigo-600 rounded-lg shadow-md p-6 mb-6 text-white">
          <h2 className="text-lg font-medium mb-2">맞춤형 추천 학습</h2>
          <p className="text-indigo-100 text-sm mb-4">
            개인 학습 데이터를 분석하여 가장 효과적인 학습 경로를 제안합니다.
          </p>
          
          <Button 
            variant="outline"
            className="bg-white text-indigo-600 hover:bg-indigo-50 font-medium py-2 px-4 rounded-md transition"
            onClick={handleRefreshRecommendations}
            disabled={updating}
          >
            {updating ? '업데이트 중...' : '추천 학습 업데이트'}
            {!updating && <ArrowRight size={16} className="ml-2" />}
          </Button>
        </div>
        
        {/* 오늘의 추천 학습 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-lg font-medium text-gray-800 mb-4">오늘의 추천 학습</h2>
          
          {recommendedQuestions.length > 0 ? (
            <div className="space-y-4">
              {recommendedQuestions.map((item) => (
                <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:border-indigo-300 transition-all">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-indigo-100 text-indigo-800 mb-2">
                        {item.type}
                      </span>
                      <h3 className="font-medium text-gray-800">{item.question}</h3>
                    </div>
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-gray-100 text-gray-800">
                      {item.difficulty}
                    </span>
                  </div>
                  
                  <div className="space-y-2 text-sm text-gray-700 mb-3">
                    {item.options.map((option, index) => (
                      <div key={index} className="pl-2 border-l-2 border-gray-300">
                        {option}
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex justify-end">
                    <button 
                      className="text-indigo-600 hover:text-indigo-700 font-medium text-sm flex items-center"
                      onClick={() => goToQuestion(item.id)}
                    >
                      풀어보기
                      <ChevronRight size={16} className="ml-1" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">
                아직 추천 학습이 생성되지 않았습니다.
              </p>
              <Button 
                variant="primary"
                onClick={handleRefreshRecommendations}
                disabled={updating}
              >
                학습 추천 받기
              </Button>
            </div>
          )}
          
          {recommendedQuestions.length > 0 && (
            <div className="mt-4 text-center">
              <button className="text-indigo-600 hover:text-indigo-700 font-medium text-sm">
                더 많은 추천 문제 보기
              </button>
            </div>
          )}
        </div>
        
        {/* 카테고리별 추천 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-medium text-gray-800 mb-4">카테고리별 추천</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {categories.map((category) => (
              <div 
                key={category.name} 
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-indigo-300 transition-all"
              >
                <div className={`${category.color} p-3 rounded-full text-white mr-4`}>
                  {category.icon}
                </div>
                <div className="flex-grow">
                  <h3 className="font-medium text-gray-800">{category.name}</h3>
                  <p className="text-sm text-gray-500">{category.count}개 문제</p>
                </div>
                <button className="text-indigo-600 hover:text-indigo-700">
                  <ChevronRight size={20} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
      
      {/* 하단 네비게이션 */}
      <footer className="bg-white shadow-md border-t border-gray-200 fixed bottom-0 w-full">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-around">
            <button 
              className="text-gray-500 font-medium text-sm flex flex-col items-center"
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
              className="text-indigo-600 font-medium text-sm flex flex-col items-center"
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

export default RecommendationsPage;