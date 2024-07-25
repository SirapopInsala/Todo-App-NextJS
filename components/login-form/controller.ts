import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLoginUser } from '../../hooks/useLoginUser';

export const useController = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const router = useRouter();
  const { mutateAsync: loginUser } = useLoginUser();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!username || !password) {
      alert('Please enter both username and password');
      return;
    }
    console.log('Submitting login with username:', username);
    try {
      const response = await loginUser({ username, password });
      console.log('Login response:', response);// Debugging login
      const users = response.users;

      if (users.length === 0) {
        throw new Error('Invalid username or password');
      }
      // Assuming you have some token or user information to store
      const authToken = 'some-auth-token';
      localStorage.setItem('authToken', authToken);
      localStorage.setItem('username', username);

      router.push('/todolist');
    } catch (error) {
      console.error('Login error:', error);
      alert('Invalid username or password');
    }
  };

  return { username, setUsername, password, setPassword, handleSubmit };
};
