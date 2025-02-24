// src/routes/statistics/index.tsx

import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { Calendar, BarChart2, PieChart as PieChartIcon, ChevronDown, Home, Lightbulb, User } from 'lucide-react';
import Loading from '@/components/common/Loading';
import { AuthContext } from '@/context/AuthContext';
import { getUserStats } from '@/api/statistics';

const StatisticsPage: React.FC = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('daily');
  const [timeRange, setTimeRange] = useState('week');
  const [userStats, setUserStats] = useState<any[]>([]);
  
  // 학습 요약 데이터
  const [streakData, setStreakData] = useState({
    current: 0,
    longest: 0,
    total: 0
  });
  
  // 정확도 데이터
  const [accuracy, setAccuracy] = useState(0);
  
  useEffect(() => {
    // 인증 확인
    if (!user?.isAuthenticated) {
      navigate('/login');
      return;
    }
    
    // 유저 통계 가져오기
    fetchUserStats();
  }, [user, navigate]);
  
  const fetchUserStats = async () => {
    try {
      setLoading(true);
      const sessionToken = localStorage.getItem('session_token') || '';
      const response = await getUserStats({ session_token: sessionToken });
      
      if (response.study_states) {
        processUserStats(response.study_states);
      }
    } catch (error) {
      console.error('Failed to fetch user stats:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const processUserStats = (stats: any[]) => {
    // 여기서 서버에서 받은 통계 데이터를 가공하여 필요한 정보를 추출
    // 통계 데이터 포맷팅 (임시 샘플 데이터)
    
    // 현재 연속 학습일, 최장 연속 학습일, 총 학습일 계산
    const streakInfo = calculateStreaks(stats);
    setStreakData(streakInfo);
    
    // 정확도 계산
    const accuracyValue = calculateAccuracy(stats);
    setAccuracy(accuracyValue);
    
    // 통계 데이터 저장
    setUserStats(stats);
  };
  
  const calculateStreaks = (stats: any[]) => {
    // 실제로는 여기서 연속 학습일을 계산
    // 샘플 데이터를 위한 임시 함수
    return {
      current: 7,
      longest: 12,
      total: stats.length > 0 ? Math.min(stats.length, 23) : 0
    };
  };
  
  const calculateAccuracy = (stats: any[]) => {
    if (stats.length === 0) return 0;
    
    // correct가 0인 경우가 정답 (문제에 맞게 조정)
    const correctCount = stats.filter(item => item.correct === 0).length;
    return Math.round((correctCount / stats.length) * 100);
  };
  
  // 샘플 차트 데이터 (실제로는 서버에서 받은 데이터를 가공하여 사용)
  const dailyData = [
    { date: '5/1', correct: 8, incorrect: 2 },
    { date: '5/2', correct: 7, incorrect: 3 },
    { date: '5/3', correct: 9, incorrect: 1 },
    { date: '5/4', correct: 6, incorrect: 4 },
    { date: '5/5', correct: 8, incorrect: 2 },
    { date: '5/6', correct: 10, incorrect: 0 },
    { date: '5/7', correct: 9, incorrect: 1 },
  ];
  
  const categoryData = [
    { name: '시제', correct: 42, incorrect: 8 },
    { name: '전치사', correct: 36, incorrect: 14 },
    { name: '관사', correct: 28, incorrect: 22 },
    { name: '조동사', correct: 38, incorrect: 12 },
    { name: '접속사', correct: 30, incorrect: 20 },
  ];
  
  const accuracyData = [
    { name: '정답', value: 174 },
    { name: '오답', value: 76 },
  ];
  
  const COLORS = ['#4F46E5', '#EF4444'];
  
  const goToPage = (path: string) => {
    navigate(path);
  };
  
  if (loading) {
    return <Loading />;
  }
  
  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* 상단 헤더 */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-indigo-700">통계</h1>
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
        {/* 요약 통계 카드 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-lg font-medium text-gray-800 mb-4">학습 요약</h2>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-gray-500 text-sm">현재 연속</p>
              <p className="text-2xl font-bold text-indigo-600">{streakData.current}일</p>
            </div>
            <div className="text-center">
              <p className="text-gray-500 text-sm">최장 연속</p>
              <p className="text-2xl font-bold text-indigo-600">{streakData.longest}일</p>
            </div>
            <div className="text-center">
              <p className="text-gray-500 text-sm">총 학습일</p>
              <p className="text-2xl font-bold text-indigo-600">{streakData.total}일</p>
            </div>
          </div>
          
          <div className="mt-4">
            <p className="text-gray-500 text-sm">정확도</p>
            <div className="h-6 w-full bg-gray-200 rounded-full overflow-hidden mt-1">
              <div 
                className="h-full bg-indigo-600 rounded-full" 
                style={{ width: `${accuracy}%` }}
              />
            </div>
            <div className="flex justify-between mt-1 text-sm">
              <span>{accuracy}%</span>
              <span className="text-gray-500">목표: 80%</span>
            </div>
          </div>
        </div>
        
        {/* 탭 네비게이션 */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex border-b">
            <button 
              className={`px-4 py-2 font-medium text-sm flex items-center ${
                activeTab === 'daily' 
                  ? 'text-indigo-600 border-b-2 border-indigo-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('daily')}
            >
              <Calendar size={16} className="mr-2" />
              일별 통계
            </button>
            <button 
              className={`px-4 py-2 font-medium text-sm flex items-center ${
                activeTab === 'category' 
                  ? 'text-indigo-600 border-b-2 border-indigo-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('category')}
            >
              <BarChart2 size={16} className="mr-2" />
              카테고리별
            </button>
            <button 
              className={`px-4 py-2 font-medium text-sm flex items-center ${
                activeTab === 'accuracy' 
                  ? 'text-indigo-600 border-b-2 border-indigo-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('accuracy')}
            >
              <PieChartIcon size={16} className="mr-2" />
              정확도
            </button>
          </div>
          
          {/* 기간 선택 */}
          <div className="flex justify-end mt-4">
            <div className="relative">
              <button className="flex items-center text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md px-3 py-1">
                {timeRange === 'week' ? '최근 1주' : timeRange === 'month' ? '최근 1개월' : '전체 기간'}
                <ChevronDown size={16} className="ml-1" />
              </button>
              
              {/* 드롭다운 메뉴는 실제 구현 시 추가 */}
            </div>
          </div>
          
          {/* 차트 영역 */}
          <div className="mt-4 h-64">
            {activeTab === 'daily' && (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dailyData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="correct" stroke="#4F46E5" strokeWidth={2} />
                  <Line type="monotone" dataKey="incorrect" stroke="#EF4444" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            )}
            
            {activeTab === 'category' && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="correct" stackId="a" fill="#4F46E5" />
                  <Bar dataKey="incorrect" stackId="a" fill="#EF4444" />
                </BarChart>
              </ResponsiveContainer>
            )}
            
            {activeTab === 'accuracy' && (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={accuracyData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {accuracyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
        
        {/* 최근 학습 이력 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-medium text-gray-800 mb-4">최근 학습 이력</h2>
          
          {userStats.length > 0 ? (
            <div className="space-y-4">
              {userStats.slice(0, 3).map((item, index) => (
                <div key={index} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                  <div className="flex justify-between items-center">
                    <p className="font-medium">문제 #{item.question_id}</p>
                    <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                      item.correct === 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {item.correct === 0 ? '정답' : '오답'}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">
                    {new Date(item.created_at).toLocaleString('ko-KR')}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">
                아직 학습 이력이 없습니다.
              </p>
              <button 
                className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
                onClick={() => navigate('/study')}
              >
                지금 학습 시작하기
              </button>
            </div>
          )}
          
          {userStats.length > 3 && (
            <div className="mt-4 text-center">
              <button className="text-indigo-600 hover:text-indigo-700 font-medium text-sm">
                더 보기
              </button>
            </div>
          )}
        </div>
      </main>
      
      {/* 하단 네비게이션 */}
      <footer className="bg-white shadow-md border-t border-gray-200 fixed bottom-0 w-full">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-around">
            <button 
              className="text-gray-500 font-medium text-sm flex flex-col items-center"
              onClick={() => goToPage('/study')}
            >
              <Home size={20} className="mb-1" />
              홈
            </button>
            <button 
              className="text-indigo-600 font-medium text-sm flex flex-col items-center"
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

export default StatisticsPage;