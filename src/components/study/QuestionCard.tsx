import React from 'react';
import styled from 'styled-components';
import { Theme } from '@/styles/theme';

interface QuestionCardProps {
  wrongSentence: string;
  category: string;
  difficulty: number;
  isRevealed?: boolean;
  rightSentence?: string;
  explanation?: string;
  wrongWord?: string;
  rightWord?: string;
  location?: number;
  stats?: {
    totalAttempts: number;
    correctRate: number;
    avgTimeSpent: number;
  }
}

const Card = styled.div`
  background-color: ${({ theme }) => theme.colors.background.primary};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  transition: transform ${({ theme }) => theme.transitions.fast};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const Category = styled.div`
  display: inline-block;
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  background-color: ${({ theme }) => `${theme.colors.primary.secondary}15`};
  color: ${({ theme }) => theme.colors.primary.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

const DifficultyIndicator = styled.div`
  display: flex;
  gap: 4px;
`;

const DifficultyDot = styled.div<{ $active: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background-color: ${({ theme, $active }) => 
    $active ? theme.colors.primary.deep : theme.colors.mono.lightGray};
  transition: background-color ${({ theme }) => theme.transitions.fast};
`;

const QuestionContent = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const Sentence = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.mono.black};
  white-space: pre-wrap;
`;

const HighlightedWord = styled.mark`
  background-color: ${({ theme }) => `${theme.colors.status.error}20`};
  color: ${({ theme }) => theme.colors.status.error};
  padding: 0 4px;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
`;

const RevealedContent = styled.div`
  margin-top: ${({ theme }) => theme.spacing.xl};
  padding-top: ${({ theme }) => theme.spacing.xl};
  border-top: 1px solid ${({ theme }) => theme.colors.mono.lightGray};
`;

const RightAnswer = styled.div`
  background-color: ${({ theme }) => `${theme.colors.status.success}10`};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const RightSentence = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  color: ${({ theme }) => theme.colors.status.success};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const Explanation = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  color: ${({ theme }) => theme.colors.mono.darkGray};
  line-height: 1.6;
  
  strong {
    color: ${({ theme }) => theme.colors.primary.secondary};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  }
`;

const Stats = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  margin-top: ${({ theme }) => theme.spacing.lg};
  padding-top: ${({ theme }) => theme.spacing.lg};
  border-top: 1px dashed ${({ theme }) => theme.colors.mono.lightGray};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.mono.darkGray};
`;

export const QuestionCard: React.FC<QuestionCardProps> = ({
  wrongSentence,
  category,
  difficulty,
  isRevealed,
  rightSentence,
  explanation,
  wrongWord,
  rightWord,
  location,
  stats
}) => {
  const highlightedSentence = location && wrongWord
    ? wrongSentence.slice(0, location) +
      `<mark>${wrongWord}</mark>` +
      wrongSentence.slice(location + wrongWord.length)
    : wrongSentence;

  return (
    <Card>
      <Header>
        <Category>{category}</Category>
        <DifficultyIndicator>
          {[1, 2, 3, 4, 5].map((level) => (
            <DifficultyDot key={level} $active={level <= difficulty} />
          ))}
        </DifficultyIndicator>
      </Header>

      <QuestionContent>
        <Sentence 
          dangerouslySetInnerHTML={{ __html: highlightedSentence }}
        />
      </QuestionContent>

      {isRevealed && rightSentence && (
        <RevealedContent>
          <RightAnswer>
            <RightSentence>{rightSentence}</RightSentence>
            {wrongWord && rightWord && (
              <div>
                틀린 단어: <HighlightedWord>{wrongWord}</HighlightedWord> → 
                <strong>{rightWord}</strong>
              </div>
            )}
          </RightAnswer>
          {explanation && (
            <Explanation dangerouslySetInnerHTML={{ __html: explanation }} />
          )}
          {stats && (
            <Stats>
              <span>총 시도: {stats.totalAttempts}회</span>
              <span>정답률: {(stats.correctRate * 100).toFixed(1)}%</span>
              <span>평균 소요시간: {stats.avgTimeSpent.toFixed(1)}초</span>
            </Stats>
          )}
        </RevealedContent>
      )}
    </Card>
  );
};