// auth.ts

import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import bcrypt from 'bcrypt';
import type { utilisateurs } from '@/app/lib/definitions';

interface User {
  id: string;
  email: string;
  motdepasse: string;
}

async function getUser(email: string): Promise<User | null> {
  try {
    const user = await sql<utilisateurs>`SELECT * FROM utilisateurs WHERE email=${email}`;
    if (user.rows.length === 0) {
      return null;
    }

    // Convert utilisateurs to User type
    const fetchedUser: User = {
      id: String(user.rows[0].id), // Ensure id is string
      email: user.rows[0].email,
      motdepasse: user.rows[0].motdepasse,
      // Add other properties as needed
    };

    return fetchedUser;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user) return null;

          const passwordsMatch = await bcrypt.compare(password, user.motdepasse);
          if (passwordsMatch) return user;
        }

        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
});
