"use server"
import { sql } from '@vercel/postgres';
import { RankingMap, utilisateurs } from './definitions';

export async function getUser(email: string): Promise<utilisateurs> {
  try {
    const user = await sql`SELECT * FROM utilisateurs WHERE email=${email}`;
    return user.rows[0] as utilisateurs;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export async function getRankings(): Promise<RankingMap[]> {
  try {
    const rankings = await sql`SELECT * FROM classement`;
    return rankings.rows as RankingMap[];
  } catch (error) {
    console.error('Failed to fetch rankings:', error);
    throw new Error('Failed to fetch rankings.');
  }
}


