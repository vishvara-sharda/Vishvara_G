import React, { memo } from 'react';
import Container from '../../components/Container/Container';
import Section from '../../components/Section/Section';
import QuestionSequence from '../../components/QuestionSequence/QuestionSequence';
import './QuestionIntroduction.css';

export const QuestionIntroduction = memo(() => {
  return (
    <Section id="questions" paddingTop="default" paddingBottom="default" className="question-intro-section">
      <Container>
        <div className="question-intro-content">
          <p className="question-intro-lead">
            <span className="lead-text">I love using</span>
            <span className="caret-insertion">
              <span className="inserted-word">these</span>
              <svg
                viewBox="0 0 10 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="caret-svg"
                aria-hidden="true"
              >
                <path d="M1 11 L5 2 L9 11" />
              </svg>
            </span>
            <span className="lead-text">question words</span>
          </p>
          <div className="question-sequence-wrapper">
            <QuestionSequence />
          </div>
        </div>
      </Container>
    </Section>
  );
});

QuestionIntroduction.displayName = 'QuestionIntroduction';

export default QuestionIntroduction;
