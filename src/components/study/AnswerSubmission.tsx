import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

interface AnswerSubmissionProps {
  onSubmit: (answer: string, timeSpent: number) => void;
  isCorrect?: boolean;
  isSubmitted?: boolean;
  onNext?: () => void;
  wrongWord?: string;
  rightWord?: string;
}

const Container = styled.div`
  margin-top: ${({ theme }) => theme.spacing.xl};
`;

const Form = styled.form`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const Input = styled.input<{ $isSubmitted?: boolean; $isCorrect?: boolean }>`
  flex: 1;
  height: 56px;
  padding: 0 ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 2px solid ${({ theme, $isSubmitted, $isCorrect }) => {
    if (!$isSubmitted) return theme.colors.mono.lightGray;
    return $isCorrect ? theme.colors.status.success : theme.colors.status.error;
  }};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  transition: all ${({ theme }) => theme.transitions.fast};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary.secondary};
    box-shadow: 0 0 0 3px ${({ theme }) => `${theme.colors.primary.secondary}20`};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.background.secondary};
    cursor: not-allowed;
  }
`;

const SubmitButton = styled.button<{ $isSubmitted?: boolean }>`
  min-width: 120px;
  height: 56px;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background-color: ${({ theme, $isSubmitted }) => 
    $isSubmitted ? theme.colors.primary.light : theme.colors.primary.secondary};
  color: ${({ theme }) => theme.colors.mono.white};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover:not(:disabled) {
    background-color: ${({ theme, $isSubmitted }) => 
      $isSubmitted ? theme.colors.primary.light : theme.colors.primary.deep};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Feedback = styled.div<{ $isCorrect: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background-color: ${({ theme, $isCorrect }) => 
    $isCorrect ? `${theme.colors.status.success}15` : `${theme.colors.status.error}15`};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const FeedbackIcon = styled.span`
  font-size: 24px;
`;

const FeedbackText = styled.p<{ $isCorrect: boolean }>`
  color: ${({ theme, $isCorrect }) => 
    $isCorrect ? theme.colors.status.success : theme.colors.status.error};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

const ComparisonText = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  align-items: center;
  margin-top: ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
`;

const Arrow = styled.span`
  color: ${({ theme }) => theme.colors.mono.gray};
`;

export const AnswerSubmission: React.FC<AnswerSubmissionProps> = ({
  onSubmit,
  isCorrect,
  isSubmitted,
  onNext,
  wrongWord,
  rightWord,
}) => {
  const [answer, setAnswer] = useState('');
  const [startTime] = useState(Date.now());

  useEffect(() => {
    if (isSubmitted) {
      document.addEventListener('keydown', handleKeyPress);
      return () => document.removeEventListener('keydown', handleKeyPress);
    }
  }, [isSubmitted]);

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && isSubmitted && onNext) {
      onNext();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!answer.trim()) return;
    const timeSpent = (Date.now() - startTime) / 1000;
    onSubmit(answer.trim(), timeSpent);
  };

  return (
    <Container>
      {isSubmitted && (
        <Feedback $isCorrect={isCorrect!}>
          <FeedbackIcon>{isCorrect ? '✓' : '✕'}</FeedbackIcon>
          <div>
            <FeedbackText $isCorrect={isCorrect!}>
              {isCorrect ? '정답입니다!' : '틀렸습니다. 다시 한 번 생각해보세요.'}
            </FeedbackText>
            {!isCorrect && wrongWord && rightWord && (
              <ComparisonText>
                <span>{wrongWord}</span>
                <Arrow>→</Arrow>
                <strong>{rightWord}</strong>
              </ComparisonText>
            )}
          </div>
        </Feedback>
      )}

      <Form onSubmit={handleSubmit}>
        <Input
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="정답을 입력하세요"
          disabled={isSubmitted}
          $isSubmitted={isSubmitted}
          $isCorrect={isCorrect}
          aria-label="정답 입력"
          aria-required="true"
        />
        <SubmitButton 
          type={isSubmitted ? 'button' : 'submit'}
          $isSubmitted={isSubmitted}
          onClick={isSubmitted ? onNext : undefined}
          aria-label={isSubmitted ? '다음 문제로 이동' : '정답 제출'}
        >
          {isSubmitted ? '다음 문제' : '제출하기'}
        </SubmitButton>
      </Form>
    </Container>
  );
};