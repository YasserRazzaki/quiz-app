'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { sql } from '@vercel/postgres';
import { redirect } from 'next/navigation';
import { z } from 'zod';

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
import bcrypt from 'bcrypt';

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
      message: `Database Error: Failed to create user. Error: ${error.message}`,
    };
  }
}