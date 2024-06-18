'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { sql } from '@vercel/postgres';

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

export async function saveScore(userId: string, userName: string, score: number) {
  try {
    const rankings = await sql`SELECT * FROM classement_map`;
    return rankings.rows as RankingMap[];
  } catch (error) {
    console.error('Failed to save score:', error);
    throw new Error('Failed to save score.');
  }
}

export async function getRankingsApi(): Promise<RankingMap[]> {
  try {
    const rankings = await sql`SELECT * FROM classement_api`;
    return rankings.rows as RankingMap[];
  } catch (error) {
    console.error('Failed to fetch rankings:', error);
    throw new Error('Failed to fetch rankings.');
  }
}


