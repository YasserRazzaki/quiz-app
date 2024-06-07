'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { getQuiz, getQuestionsByQuizId, getResponsesByQuestionId, recordRanking } from './data';

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function startQuiz(quizId: string) {
  try {
    const quiz = await getQuiz(quizId);
    const questions = await getQuestionsByQuizId(quiz.id); // Corrected typo from "getQuestionsByQuizH" to "getQuestionsByQuizId"
    const questionsWithResponses = await Promise.all(questions.map(async (question) => {
      const responses = await getResponsesByQuestionId(question.id);
      return { ...question, responses };
    }));
    return { ...quiz, questions: questionsWithResponses };
  } catch (error) {
    console.error('Failed to start quiz:', error);
    throw new Error('Failed to start quiz.');
  }
}

export async function submitQuizAnswers(quizId: string, userId: string, answers: { [questionId: string]: string[] }) {
  try {
    const questions = await getQuestionsByQuizId(quizId);
    let score = 0;
    for (const question of questions) {
      const correctAnswers = (await getResponsesByQuestionId(question.id)).filter(r => r.isCorrect).map(r => r.id);
      const userAnswers = answers[question.id] || [];
      if (correctAnswers.sort().join(',') === userAnswers.sort().join(',')) {
        score++;
      }
    }
    const rankingId = `${userId}-${quizId}`; // Added a clearer ID generation logic
    await recordRanking({
      id: rankingId,
      userId: userId,
      quizId: quizId, // Corrected typo from "quizH" to "quizId"
      score: score,
      rankingDate: new Date(),
    });
    return score;
  } catch (error) {
    console.error('Failed to submit quiz answers:', error);
    throw new Error('Failed to submit quiz answers.');
  }
}
