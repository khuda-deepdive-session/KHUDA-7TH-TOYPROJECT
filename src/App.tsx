//src/App.tsx
import styled from 'styled-components';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { theme } from './styles/theme';
import { Login, Profile, Study, Statistics } from './routes';
import { Loading } from './components/common/Loading';

const Container = styled.div`
  min-height: 100vh;
  padding: ${theme.spacing.xl};
  background-color: ${theme.colors.background.primary};
`;
const WelcomeSection = styled.section`
  text-align: center;
  margin-top: ${theme.spacing['3xl']};
`;

const Title = styled.h1`
  font-size: ${theme.typography.fontSize['4xl']};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.primary.deep};
  margin-bottom: ${theme.spacing.lg};
`;

const Subtitle = styled.p`
  font-size: ${theme.typography.fontSize.xl};
  color: ${theme.colors.mono.gray};
  margin-bottom: ${theme.spacing['2xl']};
`;
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <Loading />;
  }

  return isAuthenticated ? (
    children
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

function App() {
  const { isAuthenticated, displayName, isLoading } = useAuth();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container>
      <WelcomeSection>
        <Title>
          {isAuthenticated 
            ? `안녕하세요, ${displayName || '사용자'}님!`
            : '나랏말싸미에 오신 것을 환영합니다'}
        </Title>
        <Subtitle>
          {isAuthenticated
            ? '오늘도 즐거운 한글 학습 되세요'
            : '우리말을 바르게 쓰는 즐거움을 경험하세요'}
        </Subtitle>
      </WelcomeSection>
      <Routes>
        <Route 
          path="/" 
          element={isAuthenticated ? <Navigate to="/study" replace /> : <Login />} 
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/study"
          element={
            <ProtectedRoute>
              <Study />
            </ProtectedRoute>
          }
        />
        <Route
          path="/statistics"
          element={
            <ProtectedRoute>
              <Statistics />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Container>
  );
}

export default App;