import { createPool } from '@vercel/postgres';
import { Quiz, Question, Response, Ranking, utilisateurs } from './definitions';

const connectionString = "postgres://default:wR68xFvtgUSE@ep-bold-glade-a2y0sax4-pooler.eu-central-1.aws.neon.tech:5432/verceldb?sslmode=require";

if (!connectionString) {
  throw new Error('Missing connection string');
}

const pool = createPool({ connectionString });

export async function getUser(email: string): Promise<utilisateurs> {
  try {
    const { rows } = await pool.query('SELECT * FROM utilisateurs WHERE email=$1', [email]);
    return rows[0] as utilisateurs;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export async function getQuiz(id: string): Promise<Quiz> {
  try {
    const { rows } = await pool.query('SELECT * FROM quiz WHERE idquiz=$1', [id]);
    return rows[0] as Quiz;
  } catch (error) {
    console.error('Failed to fetch quiz:', error);
    throw new Error('Failed to fetch quiz.');
  }
}

export async function getQuestionsByQuizId(quizId: string): Promise<Question[]> {
  try {
    const { rows } = await pool.query('SELECT * FROM question WHERE idquiz=$1', [quizId]);
    return rows as Question[];
  } catch (error) {
    console.error('Failed to fetch questions:', error);
    throw new Error('Failed to fetch questions.');
  }
}

export async function getResponsesByQuestionId(questionId: string): Promise<Response[]> {
  try {
    const { rows } = await pool.query('SELECT * FROM reponse WHERE idquestion=$1', [questionId]);
    return rows as Response[];
  } catch (error) {
    console.error('Failed to fetch responses:', error);
    throw new Error('Failed to fetch responses.');
  }
}

export async function getRankingsByQuizId(quizId: string): Promise<Ranking[]> {
  try {
    const { rows } = await pool.query('SELECT * FROM classement WHERE idquiz=$1', [quizId]);
    return rows as Ranking[];
  } catch (error) {
    console.error('Failed to fetch rankings:', error);
    throw new Error('Failed to fetch rankings.');
  }
}

export async function recordRanking(ranking: Ranking): Promise<void> {
  try {
    await pool.query(
      'INSERT INTO classement (idclassement, idUtilisateurs, idquiz, score, date_classement) VALUES ($1, $2, $3, $4, $5) ON CONFLICT (idclassement) DO NOTHING',
      [ranking.id, ranking.userId, ranking.quizId, ranking.score, ranking.rankingDate]
    );
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


