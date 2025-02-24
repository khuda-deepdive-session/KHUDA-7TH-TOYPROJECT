// src/components/statistics/UserStats.tsx
import React, { useEffect, useState } from 'react';
import { 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { useNavigate } from 'react-router-dom';
import { getUserStats, UserStats as UserStatsType } from '@/api/statistics';
import { useAuth } from '@/context/AuthContext';

export const UserStats: React.FC = () => {
  const { sessionToken, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState<UserStatsType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated || !sessionToken) {
      navigate('/login');
      return;
    }

    const fetchStats = async () => {
      try {
        const data = await getUserStats(sessionToken);
        setStats(data);
      } catch (error) {
        console.error('Failed to fetch user stats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, [sessionToken, isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">통계를 불러오는 중입니다...</div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-red-500">통계 데이터를 불러오는데 실패했습니다.</div>
      </div>
    );
  }

  const levels = ['가', '양', '미', '우', '수'];
  const currentLevelIndex = levels.indexOf(stats.current_level);

  const categoryData = [
    { category: '한자어 혼동', value: stats.category_stats.hanja_confusion },
    { category: '피동/사동', value: stats.category_stats.passive_active },
    { category: '구어/문어', value: stats.category_stats.spoken_written },
    { category: '어미 혼동', value: stats.category_stats.ending_confusion },
    { category: '존댓말/반말', value: stats.category_stats.honorific_casual },
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">학습 통계</h1>
        <p className="text-lg text-gray-600">나의 학습 현황을 한눈에 확인하세요</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* 현재 레벨 카드 */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-4">현재 레벨</h3>
          <div className="flex items-center mb-2">
            {levels.map((level, index) => (
              <span
                key={level}
                className={`px-2 py-1 rounded text-sm mr-1 ${
                  index <= currentLevelIndex
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {level}
              </span>
            ))}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentLevelIndex + 1) * 20}%` }}
            />
          </div>
        </div>

        {/* 유형별 정답률 카드 */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-4">유형별 정답률</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={categoryData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="category" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                <Radar
                  name="정답률"
                  dataKey="value"
                  stroke="#2563eb"
                  fill="#2563eb"
                  fillOpacity={0.6}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 학습 추이 카드 */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-4">학습 추이</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={stats.daily_progress}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="solved_count" 
                  name="풀이 문제 수"
                  stroke="#2563eb" 
                />
                <Line 
                  type="monotone" 
                  dataKey="correct_rate" 
                  name="정답률"
                  stroke="#059669" 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 추가 통계 정보나 필터링 옵션을 여기에 추가할 수 있습니다 */}
    </div>
  );
};

export default UserStats;