//src/components/study/QuestionCard.tsx
import React, { useState } from 'react';
import { Check, X, ChevronRight, ChevronLeft } from 'lucide-react';
import Button from '@/components/common/Button';

interface QuestionCardProps {
  question: {
    id: number;
    question: string;
    correct_ans: string;
    wrong_ans: string;
    explanation: string;
  };
  onNext: () => void;
  onPrevious: () => void;
  onSubmit: (questionId: number, isCorrect: boolean) => void;
  currentIndex: number;
  totalQuestions: number;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  onNext,
  onPrevious,
  onSubmit,
  currentIndex,
  totalQuestions,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleAnswerSelection = (answer: string) => {
    if (showExplanation) return; // 이미 정답을 제출한 후에는 선택을 변경할 수 없음
    setSelectedAnswer(answer);
  };

  const handleSubmit = () => {
    if (!selectedAnswer) return;
    
    const isCorrect = selectedAnswer === question.correct_ans;
    setShowExplanation(true);
    onSubmit(question.id, isCorrect);
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setShowExplanation(false);
    onNext();
  };

  const handlePreviousQuestion = () => {
    setSelectedAnswer(null);
    setShowExplanation(false);
    onPrevious();
  };

  const isCorrect = selectedAnswer === question.correct_ans;
  const progress = ((currentIndex + 1) / totalQuestions) * 100;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      {/* 진행 상태 */}
      <div className="mb-6">
        <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-indigo-600 rounded-full" 
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between mt-2 text-sm text-gray-500">
          <span>문제 {currentIndex + 1}/{totalQuestions}</span>
          <span>{progress.toFixed(0)}% 완료</span>
        </div>
      </div>
      
      <h2 className="text-lg font-medium text-gray-800 mb-6">{question.question}</h2>
      
      <div className="space-y-4">
        <button 
          className={`w-full p-4 rounded-lg border text-left transition-all ${
            selectedAnswer === question.correct_ans
              ? showExplanation
                ? 'border-green-500 bg-green-50 text-green-700'
                : 'border-indigo-500 bg-indigo-50'
              : 'border-gray-300 hover:border-indigo-300 hover:bg-indigo-50'
          }`}
          onClick={() => handleAnswerSelection(question.correct_ans)}
          disabled={showExplanation}
        >
          {question.correct_ans}
          {showExplanation && selectedAnswer === question.correct_ans && (
            <Check className="inline-block ml-2 text-green-500" size={20} />
          )}
        </button>
        
        <button 
          className={`w-full p-4 rounded-lg border text-left transition-all ${
            selectedAnswer === question.wrong_ans
              ? showExplanation
                ? 'border-red-500 bg-red-50 text-red-700'
                : 'border-indigo-500 bg-indigo-50'
              : 'border-gray-300 hover:border-indigo-300 hover:bg-indigo-50'
          }`}
          onClick={() => handleAnswerSelection(question.wrong_ans)}
          disabled={showExplanation}
        >
          {question.wrong_ans}
          {showExplanation && selectedAnswer === question.wrong_ans && (
            <X className="inline-block ml-2 text-red-500" size={20} />
          )}
        </button>
      </div>
      
      {/* 선택 후 제출 버튼 또는 설명 */}
      {selectedAnswer && !showExplanation && (
        <div className="mt-6 flex justify-center">
          <Button
            variant="primary"
            onClick={handleSubmit}
          >
            제출하기
          </Button>
        </div>
      )}
      
      {/* 설명 */}
      {showExplanation && (
        <div className={`mt-6 p-4 rounded-lg ${isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
          <h3 className={`font-medium mb-2 ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
            {isCorrect ? '정답입니다!' : '틀렸습니다.'}
          </h3>
          <p className="text-gray-700">{question.explanation}</p>
          
          <div className="mt-4 flex justify-between">
            <Button
              variant="text"
              onClick={handlePreviousQuestion}
              className="flex items-center"
            >
              <ChevronLeft size={18} className="mr-1" />
              이전 문제
            </Button>
            <Button
              variant="primary"
              onClick={handleNextQuestion}
              className="flex items-center"
            >
              다음 문제
              <ChevronRight size={18} className="ml-1" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionCard;