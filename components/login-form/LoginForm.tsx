import React from 'react';
import Link from 'next/link';
import { useController } from './controller';

function LoginForm() {
  const { username, setUsername, password, setPassword, handleSubmit } = useController();

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-3 bg-white rounded shadow-md">
        <h1 className="text-black text-2xl font-bold text-center">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="text-black block text-sm">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="text-black w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="text-black block text-sm">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="text-black w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              required
            />
          </div>
          <div>
            <button type="submit" className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">
              Login
            </button>
          </div>
        </form>
        <Link href="/register" passHref>
          <button className="mt-4 w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">
            Register
          </button>
        </Link>
        <Link href="/" passHref>
          <button className="mt-4 w-full px-4 py-2 text-white bg-gray-600 rounded-md hover:bg-gray-700">
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
}

export default LoginForm;
