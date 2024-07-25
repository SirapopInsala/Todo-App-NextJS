"use client";

import TodoList from "@/components/todo-list/TodoList";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function Index() {
  return (
    <QueryClientProvider client={queryClient}>
       <TodoList />
    </QueryClientProvider>
  );
}