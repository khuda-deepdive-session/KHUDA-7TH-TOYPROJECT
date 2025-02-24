//src/App.tsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import { verifySession } from './api/auth';

// 페이지 컴포넌트 임포트
import LoginPage from './routes/auth/login';
import ProfilePage from './routes/auth/profile';
import StudyPage from './routes/study';
import StatisticsPage from './routes/statistics';
// 추천 페이지 
import Loading from './components/common/Loading';

const App: React.FC = () => {
  const [user, setUser] = useState<{
    displayName: string;
    studyLevel: number;
    isAuthenticated: boolean;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const sessionToken = localStorage.getItem('session_token');
      
      if (sessionToken) {
        try {
          const response = await verifySession(sessionToken);
          
          if (response.is_valid) {
            setUser({
              displayName: response.display_name,
              studyLevel: response.study_level,
              isAuthenticated: true
            });
          } else {
            // 세션이 유효하지 않으면 토큰 제거
            localStorage.removeItem('session_token');
            setUser(null);
          }
        } catch (error) {
          console.error('Failed to verify session:', error);
          localStorage.removeItem('session_token');
          setUser(null);
        }
      } else {
        setUser(null);
      }
      
      setLoading(false);
    };
    
    checkAuth();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Router>
        <Routes>
          {/* 공개 라우트 */}
          <Route path="/login" element={
            user?.isAuthenticated ? <Navigate to="/study" /> : <LoginPage />
          } />
          
          {/* 보호된 라우트 */}
          <Route path="/study" element={
            user?.isAuthenticated ? <StudyPage /> : <Navigate to="/login" />
          } />
          <Route path="/statistics" element={
            user?.isAuthenticated ? <StatisticsPage /> : <Navigate to="/login" />
          } />
          <Route path="/profile" element={
            user?.isAuthenticated ? <ProfilePage /> : <Navigate to="/login" />
          } />
          
          {/* 추천 페이지 라우트 */}
          <Route path="/recommendations" element={
            user?.isAuthenticated ? <RecommendationsPage /> : <Navigate to="/login" />
          } />
          
          {/* 기본 리다이렉트 */}
          <Route path="/" element={
            user?.isAuthenticated ? <Navigate to="/study" /> : <Navigate to="/login" />
          } />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;