import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import NavLinks from '../ui/dashboard/nav-links';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Ajoutez vos balises d'en-tête ici */}
      </head>
      <body className={`${inter.className} antialiased`}>
        {/* Vos éléments de contenu et le composant NavLinks */}
        {children}
        <div>
          <NavLinks />
        </div>
      </body>
    </html>
  );
}
