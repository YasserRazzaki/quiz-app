import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import { Metadata } from 'next';
import { signOut } from '@/auth';
import Link from 'next/link';
 
export const metadata: Metadata = {
  title: {
    template: 'Projet next.js',
    default: 'Projet next.js',
  },
  description: 'Projet fait par Yasser Razzaki, Léo Lacrabère et Thomas De La Ascunsion',
};
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
<html>
    <body>
      <div className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <Link href="/" legacyBehavior>
                <a className="text-white font-bold text-xl">QuizApp</a>
              </Link>
            </div>
            <div className="hidden md:block" >
              <div className="ml-10 flex items-baseline space-x-4">
                <Link href="/dashboard" legacyBehavior>
                  <a className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Tableau de board</a>
                </Link>
                <Link href="/dashboard/quiz-api" legacyBehavior>
                  <a className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Quiz API</a>
                </Link>
                <Link href="/dashboard/quiz-api" legacyBehavior>
                  <a className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Quiz BDD</a>
                </Link>
                <form
          action={async () => {
            'use server';
            await signOut();
          }}
        >
          <button className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={inter.className}>{children}</div>
    </body>
  </html>
  );
}