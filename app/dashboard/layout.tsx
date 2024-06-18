import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import { signOut } from '@/auth';
import Link from 'next/link';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <Link href="/" legacyBehavior>
                <a className="text-white font-bold text-xl">QuizApp</a>
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link href="/dashboard" legacyBehavior>
                  <a className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Dashboard</a>
                </Link>
                <Link href="/dashboard/quiz-api" legacyBehavior>
                  <a className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">API Quiz</a>
                </Link>
                <Link href="/dashboard/quiz-bdd" legacyBehavior>
                  <a className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Map Quiz</a>
                </Link>
                <Link href="/dashboard/rankings" legacyBehavior>
                  <a className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Results</a>
                </Link>
                <form
                  action={async () => {
                    'use server';
                    await signOut();
                  }}
                >
                  <button className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                    <div className="hidden md:block">Log Out</div>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={inter.className}>{children}</div>
    </div>
  );
}
