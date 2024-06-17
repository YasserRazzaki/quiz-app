import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import { Metadata } from 'next';

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
        <div className={inter.className}>{children}</div>
      </body>
    </html>
  );
}
