import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import { Metadata } from 'next';
import Link from 'next/link';
//import NavLinks from './ui/dashboard/nav-links';
 
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
 /*    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <div className="flex">
          <nav className="w-1/4 bg-gray-100 p-4">
            <NavLinks />
          </nav>
          <main className="w-3/4 p-4">
            {children}
          </main>
        </div>
      </body>
    </html> */
    <html>
    <body>
      <div className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <Link href="/" legacyBehavior>
                <a className="text-white font-bold text-xl">Mon Site !</a>
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
                <Link href="/logout" legacyBehavior>
                  <a className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Log out</a>
                </Link>
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