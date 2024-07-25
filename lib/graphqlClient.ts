import { GraphQLClient } from 'graphql-request';

const BASE_URL = 'https://smart-pika-29.hasura.app/v1/graphql';

const graphqlClient = new GraphQLClient(BASE_URL, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  export default graphqlClient;
