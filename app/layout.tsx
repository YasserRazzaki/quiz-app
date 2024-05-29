import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import { Metadata } from 'next';
import NavLinks from './ui/dashboard/nav-links';
 
export const metadata: Metadata = {
  title: {
    template: '%s | Acme Dashboard',
    default: 'Acme Dashboard',
  },
  description: 'The official Next.js Learn Dashboard built with App Router.',
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
};
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
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
    </html>
  );
}