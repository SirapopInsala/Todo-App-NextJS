'use client'

import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import graphqlClient from '@/lib/graphqlClient';
import { gql } from 'graphql-request';

type Priority = 'low' | 'normal' | 'high';

type Todo = {
  id: string;  
  title: string;
  priority: Priority;
  description: string;
  completed: boolean;
};

export function useTodoList() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [newTodo, setNewTodo] = useState('');
  const [newPriority, setNewPriority] = useState<Priority>('normal');
  const [newDescription, setNewDescription] = useState('');
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedPriority, setEditedPriority] = useState<Priority>('normal');
  const [editedDescription, setEditedDescription] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [day, setDay] = useState('');
  const [week, setWeek] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [username, setUsername] = useState<string | null>(null);

  const getTodosQuery = gql`
    query GetTodos {
      todos {
        id
        title
        priority
        description
        completed
      }
    }
  `;

  const addTodoMutation = gql`
    mutation AddTodo(
      $title: String!,
      $priority: String!,
      $description: String!
    ) {
      insert_todos_one(object: {
        title: $title,
        priority: $priority,
        description: $description,
        completed: false
      }) {
        id
      }
    }
  `;

  const deleteTodoMutation = gql`
    mutation DeleteTodo($id: uuid!) {
      delete_todos_by_pk(id: $id) {
        id
      }
    }
  `;

  const updateTodoMutation = gql`
    mutation UpdateTodo(
      $id: uuid!,
      $title: String!,
      $priority: String!,
      $description: String!,
      $completed: Boolean!
    ) {
      update_todos_by_pk(pk_columns: { id: $id }, _set: {
        title: $title,
        priority: $priority,
        description: $description,
        completed: $completed
      }) {
        id
      }
    }
  `;

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    console.log('authToken', authToken );
    if (!authToken) {
      router.push('/login');
    } else {
      const storedUsername = localStorage.getItem('username');
      if (storedUsername) {
        setUsername(storedUsername);
      }
    }
  }, [router]);

  const { data } = useQuery({
    queryKey: ['todos'],
    queryFn: async () => {
      const response = await graphqlClient.request<{ todos: Todo[] }>(getTodosQuery);
      return response.todos;
    },
  });

  const addTodo = useMutation({
    mutationFn: async (variables: { title: string; priority: string; description: string }) => {
      await graphqlClient.request(addTodoMutation, variables);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  const deleteTodo = useMutation({
    mutationFn: async (variables: { id: string }) => {
      await graphqlClient.request(deleteTodoMutation, variables);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  const updateTodo = useMutation({
    mutationFn: async (variables: { id: string; title: string; priority: string; description: string; completed: boolean }) => {
      await graphqlClient.request(updateTodoMutation, variables);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  useEffect(() => {
    const date = new Date();
    setDay(date.toLocaleDateString('en-US', { day: 'numeric' }));
    setWeek(date.toLocaleDateString('en-US', { weekday: 'short'}));
    setMonth(date.toLocaleDateString('en-US', { month: 'long' }));
    setYear(date.getFullYear().toString());
  }, []);

  const handleDelete = (id: string) => {
    deleteTodo.mutate({ id });
  };

  const handleEditStart = (todo: Todo) => {
    setEditingTodo(todo);
    setEditedTitle(todo.title);
    setEditedPriority(todo.priority);
    setEditedDescription(todo.description);
    setEditMode(true);
  };

  const handleEditSave = () => {
    if (editingTodo) {
      updateTodo.mutate({
        id: editingTodo.id,
        title: editedTitle,
        priority: editedPriority,
        description: editedDescription,
        completed: editingTodo.completed,
      });
      setEditMode(false);
      setEditingTodo(null);
    }
  };

  const handleEditCancel = () => {
    setEditMode(false);
    setEditingTodo(null);
  };

  const handleToggleComplete = (id: string) => {
    const todo = data?.find(todo => todo.id === id);
    if (todo) {
      updateTodo.mutate({
        id: todo.id,
        title: todo.title,
        priority: todo.priority,
        description: todo.description,
        completed: !todo.completed,
      });
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    addTodo.mutate({ title: newTodo, priority: newPriority, description: newDescription });
    setNewTodo('');
    setNewPriority('normal');
    setNewDescription('');
    setShowAddForm(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');
    router.push('/login');
  };

  const getPriorityColor = (priority: Priority, completed: boolean) => {
    if (completed) return 'bg-green-600';
    switch (priority) {
      case 'low':
        return 'bg-yellow-500';
      case 'normal':
        return 'bg-blue-500';
      case 'high':
        return 'bg-red-500';
      default:
        return '';
    }
  };

  const toggleAddForm = () => {
    setShowAddForm(prev => !prev);
  };

  return {
    todos: data || [],
    newTodo,
    setNewTodo,
    newPriority,
    setNewPriority,
    newDescription,
    setNewDescription,
    editingTodo,
    editMode,
    editedTitle,
    setEditedTitle,
    editedPriority,
    setEditedPriority,
    editedDescription,
    setEditedDescription,
    handleDelete,
    handleEditStart,
    handleEditSave,
    handleEditCancel,
    handleToggleComplete,
    handleLogout,
    getPriorityColor,
    showAddForm,
    toggleAddForm,
    day,
    week,
    month,
    year,
    handleSubmit,
    username
  };
}
