// src/utils/helpers.ts
export const helpers = {
    // 시간 형식 변환 (예: "2024-02-19T15:30:00" -> "2024년 2월 19일 15:30")
    formatDateTime: (dateString: string) => {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }).format(date);
    },
  
    // 학습 레벨에 따른 텍스트 반환
    getStudyLevelText: (level: number) => {
      const levels = {
        1: '초급',
        2: '중급',
        3: '고급'
      };
      return levels[level as keyof typeof levels] || '알 수 없음';
    },
  
    // 천 단위 콤마 포맷팅
    formatNumber: (num: number) => {
      return num.toLocaleString('ko-KR');
    },
  
    // 소요 시간 포맷팅 (초 -> "3분 20초" 형식)
    formatDuration: (seconds: number) => {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = Math.floor(seconds % 60);
      
      if (minutes === 0) {
        return `${remainingSeconds}초`;
      }
      return `${minutes}분 ${remainingSeconds}초`;
    },
  
    // 정답률 포맷팅 (0.7865 -> "78.7%")
    formatPercentage: (ratio: number) => {
      return `${(ratio * 100).toFixed(1)}%`;
    },
  
    // 에러 메시지 처리
    getErrorMessage: (error: any) => {
      if (error.response?.data?.error?.message) {
        return error.response.data.error.message;
      }
      return '알 수 없는 오류가 발생했습니다.';
    },
  
    // 디바운스 함수
    debounce: <T extends (...args: any[]) => any>(
      func: T,
      wait: number
    ) => {
      let timeout: NodeJS.Timeout;
  
      return function executedFunction(...args: Parameters<T>) {
        const later = () => {
          clearTimeout(timeout);
          func(...args);
        };
  
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    },
  
    // URL 파라미터 추출
    getQueryParam: (param: string) => {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get(param);
    },
  
    // 배열 셔플
    shuffleArray: <T>(array: T[]): T[] => {
      const shuffled = [...array];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    }
  };
  
  // 상수 정의
  export const CONSTANTS = {
    MAX_RETRY_COUNT: 3,
    DEFAULT_PAGE_SIZE: 10,
    MIN_PASSWORD_LENGTH: 8,
    MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
    SUPPORTED_FILE_TYPES: ['image/jpeg', 'image/png', 'image/gif'],
    API_TIMEOUT: 10000, // 10초
  };