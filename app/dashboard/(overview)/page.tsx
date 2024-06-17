
import Link from 'next/link';
export default async function Page() { 
  return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="p-4">
    <h1 className="text-2xl font-bold mb-4">You are connected, Welcome !</h1>
    <div className="flex flex-col space-y-4">
      <Link href="/dashboard/quiz-api" legacyBehavior>
        <a className="btn btn-primary text-white">Start API Quiz</a>
      </Link>
      <Link href="/dashboard/quiz-bdd" legacyBehavior>
        <a className="btn btn-success text-white">Start Database Quiz</a>
      </Link>
      <Link href="/dashboard/results" legacyBehavior>
        <a className="btn btn-error text-white">View Results</a>
      </Link>
    </div></div></div>
  );
}