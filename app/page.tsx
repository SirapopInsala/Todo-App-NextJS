import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <nav className="bg-gray-200 py-5">
        <div className="container mx-auto px-5">
          <div className="flex items-center justify-between">
            <div className="text-black text-2xl font-bold py-5">
              Todo-list app
            </div>
          </div>
        </div>
      </nav>
      <div className="flex-grow flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Welcome to Todo-list app
          </h1>
          <p className="text-gray-600 mb-8">
            Manage your tasks efficiently and stay organized.
          </p>
          <Link href="/login" passHref>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Go to Login
            </button>
          </Link>
        </div>
      </div>
      <footer className="bg-gray-200 py-5">
        <div className="container mx-auto px-5">
          <div className="flex justify-between items-center">
            <div className="text-gray-600">
              &copy; {new Date().getFullYear()} Todo-list app. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
