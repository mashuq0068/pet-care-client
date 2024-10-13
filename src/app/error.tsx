"use client"
import Link from 'next/link';

const ErrorPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-purple-100">
      <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-lg">
        <h1 className="text-6xl font-bold text-purple-500 mb-4">500</h1>
        <p className="text-gray-700 text-xl mb-6">
          Oops! Something went wrong on our end.
        </p>
        <Link href="/">
          <p className="inline-block px-6 py-3 bg-purple-500 text-white font-semibold rounded-md hover:bg-purple-600 transition">
            Go Back Home
          </p>
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
