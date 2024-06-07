import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Dashboard',
};

export default function Page() {
  return (
    <main className="flex min-h-screen items-center flex-col mt-16 p-6">
     <p className='mb-2'>Dashboard Page !</p>
          <Link
            href="/login"
            className="flex items-center gap-5 rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
          >
            <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
      </main>

  );
}

