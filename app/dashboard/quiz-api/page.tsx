'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import QuizDeux from '@/app/components/QuizDeux';
import { QuizQuestionDeux } from '@/app/types/quizdeux';
import { decodeHtmlEntities } from '../../decodeHtmlEntities';
import Link from 'next/link';

const QuizDeuxPage = () => {
  const [questions, setQuestions] = useState<QuizQuestionDeux[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(65); // 65 seconds
  const [showNextButton, setShowNextButton] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [playerName, setPlayerName] = useState('');
  const [scores, setScores] = useState<{ name: string; score: number }[]>([]);
  const [scoreSaved, setScoreSaved] = useState(false);

  useEffect(() => {
    fetchQuestions();
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (!quizCompleted) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer);
            setQuizCompleted(true);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer); // Cleanup interval on component unmount or when quiz is completed
  }, [quizCompleted]);

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        'https://opentdb.com/api.php?amount=50&type=multiple',
      );
      if (response.data.results && response.data.results.length > 0) {
        const formattedQuestions = response.data.results.map(
          (questionData: any) => {
            return {
              question: decodeHtmlEntities(questionData.question),
              correct_answer: decodeHtmlEntities(questionData.correct_answer),
              incorrect_answers: questionData.incorrect_answers.map(
                (answer: string) => decodeHtmlEntities(answer),
              ),
            };
          },
        );
        setQuestions(formattedQuestions);
        setLoading(false);
        setShowNextButton(false);
      } else {
        console.error('No results found in API response');
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching quiz questions:', error);
      setLoading(false);
    }
  };

  const handleAnswer = (answer: string, isCorrect: boolean) => {
    if (isCorrect) {
      setCorrectAnswersCount(correctAnswersCount + 1);
    }
    setShowNextButton(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowNextButton(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleReplay = () => {
    setCorrectAnswersCount(0);
    setCurrentQuestionIndex(0);
    setQuizCompleted(false);
    setTimeLeft(65);
    fetchQuestions();
    setScoreSaved(false);
  };

  const handleSaveScore = () => {
    if (!scoreSaved) {
      const newScore = { name: playerName, score: correctAnswersCount };
      setScores([...scores, newScore]);
      setScoreSaved(true);
    }
  };

  if (loading && questions.length === 0) {
    return <div>Loading...</div>;
  }

  if (quizCompleted) {
    return (
      <div className="p-2 text-center">
        <h1 className="mb-4 text-2xl font-bold">Quiz Completed</h1>
        <br />
        <p className="mb-6 text-lg">
          Your score:{' '}
          <span className="font-semibold">{correctAnswersCount}</span> correct
          answers
        </p>
        <div className="flex flex-col items-center space-y-4">
          <input
            type="text"
            placeholder="Enter your name"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            className="rounded border p-2"
          />
          <button
            onClick={handleSaveScore}
            className="btn btn-primary"
            disabled={scoreSaved}
          >
            Save Score
          </button>
          <button onClick={handleReplay} className="btn btn-primary">
            Replay
          </button>
          <Link href="/dashboard">
            <button className="btn btn-secondary">Retour Accueil</button>
          </Link>
        </div>
        <div className="mt-8">
          <h2 className="text-xl font-semibold">Saved Scores:</h2>
          <ul className="list-inside list-disc">
            {scores.map((score, index) => (
              <li key={index}>
                {score.name}: {score.score}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return <div>Loading question...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];
  const allOptions = shuffleArray([
    ...currentQuestion.incorrect_answers,
    currentQuestion.correct_answer,
  ]);

  return (
    <main className="relative p-4">
      <div className="absolute right-4 top-4 text-lg font-bold">
        {timeLeft} seconds left
      </div>
      <h1 className="top-8 mb-4 text-2xl font-bold">QuizDeux Page</h1>
      <QuizDeux
        question={currentQuestion.question}
        options={allOptions}
        correctAnswer={currentQuestion.correct_answer}
        anecdote=""
        onAnswer={handleAnswer}
      />
      {showNextButton && (
        <button onClick={handleNextQuestion} className="btn btn-primary mt-4">
          Next Question
        </button>
      )}
    </main>
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

export default QuizDeuxPage;