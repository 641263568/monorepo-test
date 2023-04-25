import React from 'react';
import { ApolloProvider, Query } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { gql } from 'graphql-tag';

const client = new ApolloClient({
  link: new HttpLink({ uri: 'http://localhost:4000' }),
  cache: new InMemoryCache()
});

const GET_AUTHORS = gql`
  query {
    authors {
      name
    }
  }
`;

function App() {
  return (
    <ApolloProvider client={client}>
      <div>
        <h2>Authors</h2>
        <Query query={GET_AUTHORS}>
          {({ loading, error, data }) => {
            if (loading) return 'Loading...';
            if (error) return `Error! ${error.message}`;
            return (
              <ul>
                {data.authors.map(author => (
                  <li key={author.name}>{author.name}</li>
                ))}
              </ul>
            );
          }}
        </Query>
      </div>
    </ApolloProvider>
  );
}

export default App;
