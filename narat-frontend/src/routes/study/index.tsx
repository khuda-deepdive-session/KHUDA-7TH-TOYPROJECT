//src/routes/study/index.tsx
import React from 'react';
import { QuestionCard } from '@/components/study/QuestionCard';
import { AnswerSubmission } from '@/components/study/AnswerSubmission';

const Study = () => {
  const questionData = {
    wrongSentence: "잘못된 문장입니다.",
    category: "맞춤법",
    difficulty: 1
  };

  const handleSubmit = (answer: string) => {
    console.log('Submitted answer:', answer);
  };

  return (
    <div>
      <QuestionCard {...questionData} />
      <AnswerSubmission onSubmit={handleSubmit} />
    </div>
  );
};

export default Study;