import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import NavLinks from '../ui/dashboard/nav-links';
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}
      <p>Dashboard Page</p>
      <p>Dashboard Page fr</p> 
      <p>Dashboard Page here</p>
      <p>Dashboard Page where ?</p>   <div>
      <NavLinks />
    </div></body>
    </html>
  );
}