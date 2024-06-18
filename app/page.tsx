import '@/app/ui/global.css';
import Link from 'next/link';
export default async function Page() { 
  return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="p-4">
    <h1 className="text-2xl font-bold mb-4">You are not connected, please Log in !</h1>
    <div className="flex flex-col space-y-4">
      <Link href="/login" legacyBehavior>
        <a className="btn btn-primary text-white">Login</a>
      </Link>
    </div></div></div>
  );
}