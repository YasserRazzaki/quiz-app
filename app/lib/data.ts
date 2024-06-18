'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { sql } from '@vercel/postgres';
import { RankingMap, utilisateurs, inscrits, RankingAPI } from './definitions';

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

export async function getInscrits(email: string): Promise<inscrits> {
  try {
    const user = await sql`SELECT * FROM inscrits WHERE email=${email}`;
    return user.rows[0] as inscrits;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export async function getRankingsMap(): Promise<RankingMap[]> {
  try {
    const rankings = await sql`SELECT * FROM classement_map`;
    return rankings.rows as RankingMap[];
  } catch (error) {
    console.error('Failed to save score:', error);
    throw new Error('Failed to save score.');
  }
}

export async function getRankingsApi(): Promise<RankingAPI[]> {
  try {
    const rankings = await sql`SELECT * FROM classement_api`;
    return rankings.rows as RankingAPI[];
  } catch (error) {
    console.error('Failed to fetch rankings:', error);
    throw new Error('Failed to fetch rankings.');
  }
}


