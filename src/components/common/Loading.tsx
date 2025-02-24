// components/common/Loading.tsx
import React from 'react';
import styled, { keyframes } from 'styled-components';
import { theme } from '@/styles/theme';

interface LoadingProps {
  message?: string;
}

const flicker = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const loadingBar = keyframes`
  0% {
    width: 0;
    opacity: 0;
  }
  90% {
    width: 100%;
    opacity: 1;
  }
  100% {
    width: 100%;
    opacity: 0;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: ${theme.spacing['2xl']};
`;

const LoadingTitle = styled.h2`
  font-size: ${theme.typography.fontSize['2xl']};
  font-weight: ${theme.typography.fontWeight.medium};
  color: ${theme.colors.primary.deep};
  text-align: center;
  animation: ${flicker} 1600ms infinite alternate;
  margin-bottom: ${theme.spacing.xl};
`;

const ProgressBarContainer = styled.div`
  width: 300px;
  height: 12px;
  background-color: ${theme.colors.background.secondary};
  border-radius: ${theme.borderRadius.full};
  position: relative;
  overflow: hidden;
`;

const ProgressBarGauge = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  border-radius: ${theme.borderRadius.full};
  background-color: ${theme.colors.primary.main};
  animation: ${loadingBar} 1600ms infinite ease-out;
`;

export const Loading: React.FC<LoadingProps> = ({ 
  message = "다음 문제 준비중..." 
}) => {
  return (
    <LoadingContainer role="alert" aria-busy="true">
      <LoadingTitle aria-live="polite">{message}</LoadingTitle>
      <ProgressBarContainer aria-label="로딩 진행률">
        <ProgressBarGauge />
      </ProgressBarContainer>
    </LoadingContainer>
  );
};
