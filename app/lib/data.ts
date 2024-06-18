"use server"
import { sql } from '@vercel/postgres';
import { Quiz, Question, Response, Ranking, utilisateurs } from './definitions';

export async function getUser(email: string): Promise<utilisateurs> {
  try {
    const user = await sql`SELECT * FROM utilisateurs WHERE email=${email}`;
    return user.rows[0] as utilisateurs;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export async function getQuiz(id: string): Promise<Quiz> {
  try {
    const quiz = await sql`SELECT * FROM quiz WHERE idquiz=${id}`;
    return quiz.rows[0] as Quiz;
  } catch (error) {
    console.error('Failed to fetch quiz:', error);
    throw new Error('Failed to fetch quiz.');
  }
}

export async function getQuestionsByQuizId(quizId: string): Promise<Question[]> {
  try {
    const questions = await sql`SELECT * FROM question WHERE idquiz=${quizId}`;
    return questions.rows as Question[];
  } catch (error) {
    console.error('Failed to fetch questions:', error);
    throw new Error('Failed to fetch questions.');
  }
}

export async function getResponsesByQuestionId(questionId: string): Promise<Response[]> {
  try {
    const responses = await sql`SELECT * FROM reponse WHERE idquestion=${questionId}`;
    return responses.rows as Response[];
  } catch (error) {
    console.error('Failed to fetch responses:', error);
    throw new Error('Failed to fetch responses.');
  }
}

export async function getRankingsByQuizId(quizId: string): Promise<Ranking[]> {
  try {
    const rankings = await sql`SELECT * FROM classement WHERE idquiz=${quizId}`;
    return rankings.rows as Ranking[];
  } catch (error) {
     console.error('Failed to fetch rankings:', error);
    throw new Error('Failed to fetch rankings.');
  }
}

export async function recordRanking(ranking: Ranking): Promise<void> {
  try {
    await sql`
      INSERT INTO classement (idclassement, idUtilisateurs, idquiz, score, date_classement)
      VALUES (${ranking.id}, ${ranking.userId}, ${ranking.quizId}, ${ranking.score})
      ON CONFLICT (idclassement) DO NOTHING;
    `;
    console.log('Ranking recorded successfully');
  } catch (error) {
    console.error('Failed to record ranking:', error);
    throw new Error('Failed to record ranking.');
  }
}

export async function getRankings(): Promise<Ranking[]> {
  try {
    const rankings = await sql`SELECT * FROM classement`;
    return rankings.rows as Ranking[];
  } catch (error) {
    console.error('Failed to fetch rankings:', error);
    throw new Error('Failed to fetch rankings.');
  }
}


