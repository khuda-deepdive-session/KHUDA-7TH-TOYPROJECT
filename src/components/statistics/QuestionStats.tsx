// components/statistics/QuestionStats.tsx
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { theme } from '@/styles/theme';
import { getQuestionStats } from '@/api/statistics';
import { Button } from '../common/Button';

interface QuestionStatsProps {
  questionId: string;
}

const StatsContainer = styled.div`
  background-color: ${theme.colors.background.primary};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.xl};
  box-shadow: ${theme.shadows.md};
`;

const Title = styled.h2`
  font-size: ${theme.typography.fontSize['2xl']};
  font-weight: ${theme.typography.fontWeight.bold};
  margin-bottom: ${theme.spacing.lg};
  color: ${theme.colors.mono.black};
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.xl};
`;

const StatCard = styled.div`
  background-color: ${theme.colors.background.secondary};
  padding: ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.md};
  text-align: center;
`;

const StatValue = styled.div`
  font-size: ${theme.typography.fontSize['3xl']};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.primary.main};
  margin-bottom: ${theme.spacing.xs};
`;

const StatLabel = styled.div`
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.mono.gray};
`;

const ChartContainer = styled.div`
  height: 300px;
  margin-top: ${theme.spacing.xl};
`;

export const QuestionStats: React.FC<QuestionStatsProps> = ({ questionId }) => {
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getQuestionStats(questionId);
        setStats(data);
      } catch (error) {
        console.error('Failed to fetch question stats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, [questionId]);

  if (isLoading) {
    return <div>Loading stats...</div>;
  }

  if (!stats) {
    return <div>Failed to load statistics</div>;
  }

  const dailyStatsData = Object.entries(stats.daily_stats).map(([date, data]: [string, any]) => ({
    date,
    attempts: data.attempts,
    correctRate: data.correct_rate * 100,
  }));

  return (
    <StatsContainer>
      <Title>문제 통계</Title>
      
      <StatsGrid>
        <StatCard>
          <StatValue>{(stats.correct_rate * 100).toFixed(1)}%</StatValue>
          <StatLabel>정답률</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{stats.avg_time_spent.toFixed(1)}초</StatValue>
          <StatLabel>평균 소요 시간</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{(stats.dropout_rate * 100).toFixed(1)}%</StatValue>
          <StatLabel>중도 포기율</StatLabel>
        </StatCard>
      </StatsGrid>

      <ChartContainer>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={dailyStatsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis yAxisId="left" orientation="left" stroke={theme.colors.primary.main} />
            <YAxis yAxisId="right" orientation="right" stroke={theme.colors.secondary.main} />
            <Tooltip />
            <Legend />
            <Bar 
              yAxisId="left"
              dataKey="attempts" 
              name="시도 횟수" 
              fill={theme.colors.primary.main} 
            />
            <Bar 
              yAxisId="right"
              dataKey="correctRate" 
              name="정답률" 
              fill={theme.colors.secondary.main} 
            />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>

      <Button 
        variant="secondary" 
        size="sm" 
        onClick={() => window.print()}
        style={{ marginTop: theme.spacing.lg }}
      >
        통계 내보내기
      </Button>
    </StatsContainer>
  );
};