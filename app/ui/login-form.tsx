'use client';
import '@/app/ui/global.css';import { useState } from 'react';
import { signIn } from 'next-auth/react';
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from '@/app/ui/button';

export default function LoginForm() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (result) {
      setErrorMessage('Invalid credentials. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className="mb-3 text-2xl font-bold">Please log in to continue.</h1>
        <div className="w-full">
          <div>
            <label htmlFor="email" className="block text-xs font-medium text-gray-900 mb-1">
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email address"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-none placeholder-gray-500"
                required
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div className="mt-4">
            <label htmlFor="password" className="block text-xs font-medium text-gray-900 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-none placeholder-gray-500"
                required
                minLength={6}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        <Button className="mt-4 w-full" type="submit">
          Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
        </Button>
        {errorMessage && (
          <div className="flex items-center mt-2 text-sm text-red-500 space-x-1">
            <ExclamationCircleIcon className="h-4 w-4" />
            <p>{errorMessage}</p>
          </div>
        )}
      </div>
    </form>
  );
}