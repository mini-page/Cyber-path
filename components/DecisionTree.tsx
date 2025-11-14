
import React, { useState } from 'react';
import { QUESTIONS } from '../constants';
import { Question, Answer } from '../types';

interface ProgressBarProps {
    answered: number;
    total: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ answered, total }) => {
    const percentage = total > 0 ? (answered / total) * 100 : 0;
    return (
        <div className="mb-8 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-2 text-gray-400">
                <span className="text-sm font-semibold">Progress: {answered}/{total}</span>
                <span className="text-sm">{Math.round(percentage)}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div className="bg-[var(--accent-600)] h-2.5 rounded-full" style={{ width: `${percentage}%`, transition: 'width 0.5s ease-in-out' }}></div>
            </div>
        </div>
    );
};

interface DecisionTreeProps {
    answers: Answer;
    setAnswers: React.Dispatch<React.SetStateAction<Answer>>;
    onFinish: () => void;
}

const DecisionTree: React.FC<DecisionTreeProps> = ({ answers, setAnswers, onFinish }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const handleAnswer = (questionId: string, answer: string | string[]) => {
        setAnswers(prev => ({ ...prev, [questionId]: answer }));
    };

    const answeredCount = Object.values(answers).filter(a => a !== null && (!Array.isArray(a) || a.length > 0)).length;
    const allAnswered = answeredCount === QUESTIONS.length;
    
    const handleReset = () => {
        const initialAnswers: Answer = {};
        QUESTIONS.forEach(q => { initialAnswers[q.id] = q.type === 'multiple' ? [] : null });
        setAnswers(initialAnswers);
        setCurrentQuestionIndex(0);
    };
    
    const handleNext = () => {
        if (currentQuestionIndex < QUESTIONS.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handleBack = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };
    
    const currentQuestion = QUESTIONS[currentQuestionIndex];
    const currentAnswer = answers[currentQuestion.id];

    const isCurrentQuestionAnswered = currentAnswer !== null && (!Array.isArray(currentAnswer) || currentAnswer.length > 0);

    const handleSingleSelect = (value: string) => {
        handleAnswer(currentQuestion.id, value);
    };

    const handleMultiSelect = (value: string) => {
        const currentAnswers = Array.isArray(currentAnswer) ? [...currentAnswer] : [];
        const newAnswers = currentAnswers.includes(value)
            ? currentAnswers.filter(a => a !== value)
            : [...currentAnswers, value];
        handleAnswer(currentQuestion.id, newAnswers);
    };

    return (
        <div className="container mx-auto p-4 md:p-8 flex flex-col items-center">
            <div className="text-center mb-4">
                <h1 className="text-4xl font-bold mb-2">Cyber Career Pathfinder</h1>
                <p className="text-gray-400">Answer these 10 questions to discover your ideal cybersecurity role.</p>
            </div>

            <ProgressBar answered={answeredCount} total={QUESTIONS.length} />

            <div className="bg-gray-800 p-8 rounded-[var(--card-border-radius)] shadow-2xl w-full max-w-2xl min-h-[350px] border border-gray-700 transition-all">
                <div key={currentQuestion.id} className="flex flex-col">
                     <h3 className="text-2xl font-semibold mb-2 flex items-center">
                        <i className={`fas ${currentQuestion.icon} mr-4 text-[var(--accent-400)]`}></i>
                        {currentQuestion.title}
                    </h3>
                    <p className="text-gray-400 mb-6">{currentQuestion.description}</p>
                    <div className="space-y-4">
                        {currentQuestion.options.map(option => {
                            const isSelected = currentQuestion.type === 'single'
                                ? currentAnswer === option.value
                                : Array.isArray(currentAnswer) && currentAnswer.includes(option.value);

                            return (
                                <div key={option.value} onClick={() => currentQuestion.type === 'single' ? handleSingleSelect(option.value) : handleMultiSelect(option.value)}
                                    className={`cursor-pointer p-4 rounded-lg text-base transition-all duration-200 flex items-center border ${
                                        isSelected 
                                        ? 'bg-[var(--accent-600)] ring-2 ring-offset-2 ring-offset-gray-800 ring-[var(--accent-500)] text-white border-[var(--accent-500)]' 
                                        : 'bg-gray-700 border-gray-600 hover:bg-gray-600 hover:border-[var(--accent-500)]'
                                    }`}>
                                    {currentQuestion.type === 'multiple' && (
                                        <div className="h-5 w-5 mr-4 flex-shrink-0 flex items-center justify-center border-2 rounded-sm border-gray-400">
                                            {isSelected && <i className="fas fa-check text-xs"></i>}
                                        </div>
                                    )}
                                    {option.label}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div className="mt-8 flex justify-between items-center w-full max-w-2xl">
                 <button onClick={handleBack} disabled={currentQuestionIndex === 0} className="px-6 py-3 bg-gray-700 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                    <i className="fas fa-arrow-left mr-2"></i>Back
                </button>
                
                 <button onClick={handleReset} className="text-gray-400 hover:text-white transition-colors text-sm">
                    Reset All
                </button>
                
                {currentQuestionIndex < QUESTIONS.length - 1 ? (
                    <button onClick={handleNext} disabled={!isCurrentQuestionAnswered} className="px-6 py-3 bg-[var(--accent-600)] text-white font-semibold rounded-lg shadow-md hover:bg-[var(--accent-700)] transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed">
                        Next <i className="fas fa-arrow-right ml-2"></i>
                    </button>
                ) : (
                    <button onClick={onFinish} disabled={!allAnswered} className="px-8 py-4 bg-green-600 text-white font-bold rounded-lg shadow-lg hover:bg-green-700 transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed disabled:opacity-50 text-lg">
                        Find My Path!
                    </button>
                )}
            </div>
        </div>
    );
};

export default DecisionTree;