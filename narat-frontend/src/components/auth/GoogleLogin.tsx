//src/components/auth/GoogleLogin.tsx 수정
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { theme } from '@/styles/theme';

interface GoogleLoginProps {
  onLogin: () => void;
  isLoading?: boolean;
}

const Container = styled.div`
  max-width: 480px;
  margin: 0 auto;
  padding: ${theme.spacing.xl};
  text-align: center;
`;

const Title = styled.h1`
  font-size: ${theme.typography.fontSize['4xl']};
  font-weight: ${theme.typography.fontWeight.bold};
  margin-bottom: ${theme.spacing.md};
  color: ${theme.colors.mono.black};
`;

const Subtitle = styled.p`
  font-size: ${theme.typography.fontSize.lg};
  color: ${theme.colors.mono.gray};
  margin-bottom: ${theme.spacing['2xl']};
  line-height: 1.6;
`;

const LoginButton = styled.button`
  width: 100%;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.md};
  background-color: ${theme.colors.mono.white};
  border: 2px solid ${theme.colors.mono.lightGray};
  border-radius: ${theme.borderRadius.lg};
  font-size: ${theme.typography.fontSize.lg};
  font-weight: ${theme.typography.fontWeight.medium};
  color: ${theme.colors.mono.darkGray};
  transition: all ${theme.transitions.fast};
  padding: 0 ${theme.spacing.xl};

  &:hover:not(:disabled) {
    border-color: ${theme.colors.mono.darkGray};
    background-color: ${theme.colors.background.secondary};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const GoogleIcon = styled.div`
  width: 24px;
  height: 24px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'%3E%3Cpath fill='%23FFC107' d='M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z'/%3E%3Cpath fill='%23FF3D00' d='m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z'/%3E%3Cpath fill='%234CAF50' d='M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z'/%3E%3Cpath fill='%231976D2' d='M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z'/%3E%3C/svg%3E");
  background-size: contain;
  background-repeat: no-repeat;
`;

const Spinner = styled.div`
  width: 24px;
  height: 24px;
  border: 3px solid ${theme.colors.mono.lightGray};
  border-top-color: ${theme.colors.primary.main};
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const Description = styled.p`
  margin-top: ${theme.spacing.xl};
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.mono.gray};
  line-height: 1.6;
`;
const StyledLink = styled(Link)`
  color: ${theme.colors.primary.deep};
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

export const GoogleLogin: React.FC<GoogleLoginProps> = ({ onLogin, isLoading }) => {
  return (
    <Container>
      <Title>나랏말싸미</Title>
      <Subtitle>
        우리말 맞춤법 학습을 위한<br />
        가장 쉽고 재미있는 방법
      </Subtitle>

      <LoginButton 
        onClick={onLogin} 
        disabled={isLoading}
        aria-busy={isLoading}
      >
        {isLoading ? <Spinner aria-hidden="true" /> : <GoogleIcon aria-hidden="true" />}
        Google 계정으로 시작하기
      </LoginButton>

      <Description>
        로그인하면 나랏말싸미의{' '}
        <StyledLink to="/terms">이용약관</StyledLink>과{' '}
        <StyledLink to="/privacy">개인정보 처리방침</StyledLink>에 
        동의하게 됩니다.
      </Description>
    </Container>
  );
};