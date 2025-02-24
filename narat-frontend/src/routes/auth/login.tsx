//src/routes/auth/login.tsx
import React from 'react';
import GoogleLogin from '@/components/auth/GoogleLogin';

const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-indigo-50">
      {/* 헤더 */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-xl font-bold text-indigo-700">나랏말싸미</h1>
        </div>
      </header>
      
      {/* 메인 콘텐츠 */}
      <main className="flex-grow flex flex-col justify-center items-center px-4 py-10">
        <div className="w-full max-w-md">
          {/* 로고 및 소개 */}
          <div className="text-center mb-10">
            <div className="inline-block bg-indigo-600 text-white p-6 rounded-full mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">나랏말싸미에 오신 것을 환영합니다</h2>
            <p className="text-gray-600">바른 한구어 공부를 시작해보세요</p>
          </div>
          
          {/* 로그인 카드 */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-lg font-medium text-gray-800 mb-4">로그인</h3>
            
            <GoogleLogin />
            
            <div className="text-center mt-4">
              <p className="text-sm text-gray-500">
                로그인하면 서비스 이용약관 및 개인정보 처리방침에 동의하게 됩니다.
              </p>
            </div>
          </div>
          
          {/* 앱 소개 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-medium text-gray-800 mb-4">나랏말싸미 특징</h3>
            
            <div className="space-y-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-md bg-indigo-600 text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-base font-medium text-gray-900">AI 기반 맞춤형 학습</h4>
                  <p className="mt-1 text-sm text-gray-500">개인별 학습 패턴과 취약점을 분석하여 최적의 학습 경로를 제안합니다.</p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-md bg-indigo-600 text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-base font-medium text-gray-900">체계적인 문법 학습</h4>
                  <p className="mt-1 text-sm text-gray-500">카테고리별로 선별된 문제로 실력을 검증합니다.</p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-md bg-indigo-600 text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-base font-medium text-gray-900">상세한 학습 통계</h4>
                  <p className="mt-1 text-sm text-gray-500">학습 진행 상황과 성취도를 다양한 통계와 그래프로 확인할 수 있습니다.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;