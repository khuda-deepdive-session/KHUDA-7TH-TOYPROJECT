//src/routes/auth/profile.tsx
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, LogOut, Award, BookOpen, Clock, Edit2, Home, BarChart2, Lightbulb, User } from 'lucide-react';
import Loading from '@/components/common/Loading';
import Button from '@/components/common/Button';
import { AuthContext } from '@/context/AuthContext';
import { logout } from '@/api/auth';

const ProfilePage: React.FC = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('achievements');
  
  useEffect(() => {
    // 인증 확인
    if (!user?.isAuthenticated) {
      navigate('/login');
      return;
    }
  }, [user, navigate]);
  
  const handleLogout = async () => {
    try {
      setLoading(true);
      const sessionToken = localStorage.getItem('session_token') || '';
      await logout({ session_token: sessionToken });
      
      // 로컬 스토리지 토큰 제거
      localStorage.removeItem('session_token');
      
      // 유저 상태 초기화
      setUser(null);
      
      // 로그인 페이지로 이동
      navigate('/login');
    } catch (error) {
      console.error('Failed to logout:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const goToPage = (path: string) => {
    navigate(path);
  };
  
  // 샘플 사용자 데이터
  const userData = {
    displayName: user?.displayName || '사용자',
    email: 'user@example.com',
    profileImage: 'https://via.placeholder.com/80',
    studyLevel: user?.studyLevel || 1,
    joinDate: '2023년 12월 15일',
    totalStudied: 87,
    correctRate: 72
  };
  
  // 샘플 업적 데이터
  const achievements = [
    { id: 1, name: '첫 시작', description: '첫 문제 풀기', completed: true, icon: <BookOpen size={20} /> },
    { id: 2, name: '일주일 연속', description: '7일 연속 학습하기', completed: true, icon: <Clock size={20} /> },
    { id: 3, name: '문법 마스터', description: '시제 관련 문제 30개 이상 맞히기', completed: false, icon: <Award size={20} /> },
    { id: 4, name: '꾸준한 학습자', description: '한 달 동안 20일 이상 학습하기', completed: false, icon: <Clock size={20} /> },
    { id: 5, name: '완벽주의자', description: '10문제 연속 정답', completed: true, icon: <Award size={20} /> }
  ];
  
  if (loading) {
    return <Loading />;
  }
  
  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* 상단 헤더 */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-indigo-700">프로필</h1>
          <button className="text-gray-600 hover:text-gray-800">
            <Settings size={22} />
          </button>
        </div>
      </header>
      
      {/* 메인 콘텐츠 */}
      <main className="container mx-auto px-4 py-6">
        {/* 프로필 카드 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center">
            <img 
              src={userData.profileImage} 
              alt="User Profile" 
              className="w-20 h-20 rounded-full mr-4" 
            />
            <div className="flex-grow">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-800">{userData.displayName}</h2>
                <button className="text-gray-500 hover:text-gray-700">
                  <Edit2 size={18} />
                </button>
              </div>
              <p className="text-gray-500 text-sm">{userData.email}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-indigo-100 text-indigo-800">
                  레벨 {userData.studyLevel}
                </span>
                <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
                  가입: {userData.joinDate}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {/* 학습 요약 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-lg font-medium text-gray-800 mb-4">학습 요약</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-indigo-50 rounded-lg p-4">
              <p className="text-gray-500 text-sm">총 학습 문제</p>
              <p className="text-2xl font-bold text-indigo-600">{userData.totalStudied}문제</p>
            </div>
            <div className="bg-indigo-50 rounded-lg p-4">
              <p className="text-gray-500 text-sm">정답률</p>
              <p className="text-2xl font-bold text-indigo-600">{userData.correctRate}%</p>
            </div>
          </div>
        </div>
        
        {/* 탭 네비게이션 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex border-b mb-6">
            <button 
              className={`px-4 py-2 font-medium text-sm ${
                activeTab === 'achievements' 
                  ? 'text-indigo-600 border-b-2 border-indigo-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('achievements')}
            >
              업적
            </button>
            <button 
              className={`px-4 py-2 font-medium text-sm ${
                activeTab === 'settings' 
                  ? 'text-indigo-600 border-b-2 border-indigo-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('settings')}
            >
              설정
            </button>
          </div>
          
          {activeTab === 'achievements' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-800">획득한 업적</h3>
                <span className="text-sm text-gray-500">3/5 완료</span>
              </div>
              
              {achievements.map((achievement) => (
                <div 
                  key={achievement.id} 
                  className={`flex items-center p-4 border rounded-lg ${
                    achievement.completed 
                      ? 'border-indigo-200 bg-indigo-50' 
                      : 'border-gray-200'
                  }`}
                >
                  <div className={`p-2 rounded-full mr-4 ${
                    achievement.completed ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-500'
                  }`}>
                    {achievement.icon}
                  </div>
                  <div className="flex-grow">
                    <h4 className={`font-medium ${
                      achievement.completed ? 'text-indigo-600' : 'text-gray-500'
                    }`}>
                      {achievement.name}
                    </h4>
                    <p className="text-sm text-gray-500">{achievement.description}</p>
                  </div>
                  {achievement.completed && (
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-indigo-500 text-white">
                      완료
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
          
          {activeTab === 'settings' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-4">앱 설정</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-700">알림 설정</span>
                    <div className="relative inline-block w-10 mr-2 align-middle select-none">
                      <input 
                        type="checkbox" 
                        name="notification" 
                        id="notification" 
                        className="checked:bg-indigo-500 outline-none focus:outline-none right-4 checked:right-0 duration-200 ease-in absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                      />
                      <label 
                        htmlFor="notification" 
                        className="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                      ></label>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-700">다크 모드</span>
                    <div className="relative inline-block w-10 mr-2 align-middle select-none">
                      <input 
                        type="checkbox" 
                        name="darkMode" 
                        id="darkMode" 
                        className="checked:bg-indigo-500 outline-none focus:outline-none right-4 checked:right-0 duration-200 ease-in absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                      />
                      <label 
                        htmlFor="darkMode" 
                        className="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                      ></label>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-700">학습 목표 알림</span>
                    <div className="relative inline-block w-10 mr-2 align-middle select-none">
                      <input 
                        type="checkbox" 
                        name="goalNotification" 
                        id="goalNotification" 
                        className="checked:bg-indigo-500 outline-none focus:outline-none right-4 checked:right-0 duration-200 ease-in absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                      />
                      <label 
                        htmlFor="goalNotification" 
                        className="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <Button 
                  variant="outline"
                  onClick={handleLogout}
                  isLoading={loading}
                  fullWidth
                  className="flex items-center justify-center text-red-600 border-red-600 hover:bg-red-50"
                >
                  <LogOut size={16} className="mr-2" />
                  로그아웃
                </Button>
              </div>
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
              className="text-indigo-600 font-medium text-sm flex flex-col items-center"
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

export default ProfilePage;