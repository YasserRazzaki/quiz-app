'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { sql } from '@vercel/postgres';
import bcrypt from 'bcrypt';

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


export async function createUser(prevState: any, formData: FormData) {
  const nom = formData.get('nom') as string;
  const email = formData.get('email') as string;
  const motdepasse = formData.get('motdepasse') as string;

  if (!nom || !email || !motdepasse) {
    return {
      message: 'All fields are required.',
      errors: {
        nom: !nom ? 'Name is required' : undefined,
        email: !email ? 'Email is required' : undefined,
        motdepasse: !motdepasse ? 'Password is required' : undefined,
      },
    };
  }

  try {
    const hashedPassword = await bcrypt.hash(motdepasse, 10);
    await sql`
      INSERT INTO utilisateurs (nom, email, motdepasse, date_inscription)
      VALUES (${nom}, ${email}, ${hashedPassword}, CURRENT_TIMESTAMP)
    `;
    return { message: 'User created successfully!' };
  } catch (error) {
    console.error('Failed to create user:', error);
    return {
      message: `Database Error: Failed to create user. Error: ${error}`,
    };
  }
}

const connectionString = process.env.POSTGRES_URL;

if (!connectionString) {
throw new Error('Missing PostgreSQL connection string');
}

export async function saveUserScore(playerName: string, score: number) {
  try {
    console.log(`Saving score for player: ${playerName} with score: ${score}`);
    console.log('Postgres URL:', connectionString);

    await sql`
      INSERT INTO classement_map (username, score, date_classement)
      VALUES (${playerName}, ${score}, CURRENT_TIMESTAMP)
    `;

    console.log('Score saved successfully!');
    return { message: 'Score saved successfully!' };
  } catch (error) {
    console.error('Failed to save score:', error);
    return {
      message: `Database Error: Failed to save score. Error: ${error}`,
    };
  }
}
