"use client";

import { FC, useState, useEffect } from "react";

interface QuizDeuxProps {
  question: string;
  options: string[];
  correctAnswer: string;
  anecdote: string;
  onAnswer: (answer: string, isCorrect: boolean) => void;
}

const QuizDeux: FC<QuizDeuxProps> = ({
  question,
  options,
  correctAnswer,
  anecdote,
  onAnswer,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);

  useEffect(() => {
    setSelectedAnswer(null);
    setIsAnswered(false);
    setShuffledOptions(shuffleArray([...options]));
  }, [question]);

  const handleAnswerClick = (answer: string) => {
    const isCorrect = answer === correctAnswer;
    setSelectedAnswer(answer);
    setIsAnswered(true);
    onAnswer(answer, isCorrect);
  };

  return (
    <div className="card shadow-lg p-4 mb-4">
      <h2 className="text-xl font-semibold mb-2">{question}</h2>
      <div className="flex flex-col space-y-2">
        {shuffledOptions.map((option) => (
          <button
            key={option}
            onClick={() => handleAnswerClick(option)}
            className={`btn ${
              isAnswered
                ? option === correctAnswer
                  ? "bg-green-500 text-white"
                  : option === selectedAnswer
                  ? "bg-red-500 text-white"
                  : "bg-gray-300 text-black cursor-not-allowed no-hover"
                : "bg-blue-500 text-white hover:bg-blue-700"
            }`}
            disabled={
              isAnswered &&
              option !== selectedAnswer &&
              option !== correctAnswer
            }
          >
            {option}
          </button>
        ))}
      </div>
      {isAnswered && <p className="mt-4">{anecdote}</p>}
    </div>
  );
};

function shuffleArray(array: any[]) {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

export default QuizDeux;
