import { useMutation, UseMutationResult } from '@tanstack/react-query';
import axios from 'axios';
import bcrypt from 'bcryptjs';

const BASE_URL = 'https://smart-pika-29.hasura.app/v1/graphql';

type RegisterUserArgs = {
  username: string;
  password: string;
};

type RegisterUserResponse = {
  insert_users: {
    returning: {
      id: string;
      username: string;
    }[];
  };
};

export const useRegisterUser = (): UseMutationResult<RegisterUserResponse, Error, RegisterUserArgs> => {
  return useMutation({
    mutationFn: async (variables: RegisterUserArgs): Promise<RegisterUserResponse> => {
      try {
        // encryption
        const hashedPassword = await bcrypt.hash(variables.password, 10);

        const { data } = await axios.post(BASE_URL, {
          query: `
            mutation RegisterUser($username: String!, $password: String!) {
              insert_users(objects: { username: $username, password: $password }) {
                returning {
                  id
                  username
                }
              }
            }
          `,
          variables: {
            username: variables.username,
            password: hashedPassword,
          },
        });

        return data.data.insert_users;
      } catch (error) {
        throw new Error('Registration failed');
      }
    }
  });
};
