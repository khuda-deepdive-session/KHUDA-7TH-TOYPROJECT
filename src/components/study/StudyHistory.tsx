// src/components/study/StudyHistory.tsx
import React from 'react';
import styled from 'styled-components';
import { theme } from '@/styles/theme';
import { useStudy } from '@/context/StudyContext';

const Container = styled.div`
  padding: ${theme.spacing.xl};
  background-color: ${theme.colors.background.primary};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.md};
`;

const Title = styled.h2`
  font-size: ${theme.typography.fontSize['2xl']};
  font-weight: ${theme.typography.fontWeight.bold};
  margin-bottom: ${theme.spacing.lg};
  color: ${theme.colors.mono.black};
`;

const HistoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`;

const HistoryItem = styled.div<{ $isCorrect: boolean }>`
  display: flex;
  align-items: center;
  padding: ${theme.spacing.lg};
  background-color: ${theme.colors.background.secondary};
  border-radius: ${theme.borderRadius.md};
  border-left: 4px solid ${props => 
    props.$isCorrect ? theme.colors.status.success : theme.colors.status.error};
  transition: transform ${theme.transitions.fast};

  &:hover {
    transform: translateX(4px);
  }
`;

const TimeStamp = styled.span`
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.mono.gray};
  margin-right: ${theme.spacing.lg};
  min-width: 100px;
`;

const ResultIndicator = styled.span<{ $isCorrect: boolean }>`
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.sm};
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.medium};
  background-color: ${props => 
    props.$isCorrect ? 
    `${theme.colors.status.success}20` : 
    `${theme.colors.status.error}20`};
  color: ${props => 
    props.$isCorrect ? 
    theme.colors.status.success : 
    theme.colors.status.error};
`;

const TimeSpent = styled.span`
  margin-left: auto;
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.mono.gray};
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${theme.spacing.xl};
  color: ${theme.colors.mono.gray};
  font-size: ${theme.typography.fontSize.lg};
`;

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('ko-KR', {
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

const formatTimeSpent = (seconds: number) => {
  if (seconds < 60) {
    return `${seconds}초`;
  }
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}분 ${remainingSeconds}초`;
};

export const StudyHistory: React.FC = () => {
  const { state } = useStudy();
  const { studyHistory } = state;

  if (studyHistory.length === 0) {
    return (
      <Container>
        <Title>학습 이력</Title>
        <EmptyState>
          아직 학습 이력이 없습니다.
          <br />
          첫 문제를 풀어보세요!
        </EmptyState>
      </Container>
    );
  }

  return (
    <Container>
      <Title>학습 이력</Title>
      <HistoryList>
        {studyHistory.map((item, index) => (
          <HistoryItem key={index} $isCorrect={item.isCorrect}>
            <TimeStamp>{formatDate(item.timestamp)}</TimeStamp>
            <ResultIndicator $isCorrect={item.isCorrect}>
              {item.isCorrect ? '정답' : '오답'}
            </ResultIndicator>
            <TimeSpent>{formatTimeSpent(item.timeSpent)}</TimeSpent>
          </HistoryItem>
        ))}
      </HistoryList>
    </Container>
  );
};