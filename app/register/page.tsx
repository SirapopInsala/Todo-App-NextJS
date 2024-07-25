"use client";

import RegisterForm from '@/components/register-form/RegisterForm';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const RegisterPage: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RegisterForm />
    </QueryClientProvider>
  );
};

export default RegisterPage;

