import { useMutation, UseMutationResult } from '@tanstack/react-query';
import axios from 'axios';

const BASE_URL = 'https://smart-pika-29.hasura.app/v1/graphql';

type LoginUserArgs = {
  username: string;
  password: string;
};

type LoginUserResponse = {
  users: {
    id: string;
    username: string;
  }[];
};

export const useLoginUser = (): UseMutationResult<LoginUserResponse, Error, LoginUserArgs> => {
  return useMutation({
    mutationFn: async (variables: LoginUserArgs): Promise<LoginUserResponse> => {
      try {
        const { data } = await axios.post(BASE_URL, {
          query: `
            query LoginUser($username: String!, $password: String!) {
              users(where: { username: { _eq: $username }, password: { _eq: $password } }) {
                id
                username
              }
            }
          `,
          variables
        });
        // Debugging Data
        console.log('Data from server:', data);
        // Ensure the response matches the expected structure
        if (data.data.users.length === 0) {
          throw new Error('Invalid username or password');
        }

        return data.data;
      } catch (error: any) {
        console.error('Login error:', error);
        const errorMessage = error?.response?.data?.errors?.[0]?.message || 'Login failed';
        throw new Error(errorMessage);
      }
    }
  });
};
