import React, { memo } from 'react';
import './QuestionSequence.css';

export const QuestionSequence = memo(({ className = '' }) => {
  return (
    <div
      className={`question-sequence-track ${className}`.trim()}
      role="region"
      aria-label="Progressive questioning sequence"
    >
      {/* Primary Equal Group: What, How, Why */}
      <span className="question-word question-word-primary">What,</span>
      <span className="question-word question-word-primary">How,</span>
      <span className="question-word question-word-primary">Why,</span>

      {/* Progressively smaller repeated whys */}
      <span className="question-word question-word-step1">why,</span>
      <span className="question-word question-word-step2">why,</span>
      <span className="question-word question-word-step3">why....</span>
    </div>
  );
});

QuestionSequence.displayName = 'QuestionSequence';

export default QuestionSequence;
