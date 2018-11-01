import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link'

import Recipes from '../Recipes/Recipes';
import Saved from '../Saved/Saved';
import ShoppingList from '../ShoppingList/ShoppingList';

const httpLink = createHttpLink({ uri: 'http://localhost:4000/graphql' });

const errorLink = onError(({ networkError, graphQLErrors }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );
  }
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const link = ApolloLink.from([
  errorLink,
  httpLink
])

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
})

const App = () => (
  <ApolloProvider client={client}>
    <BrowserRouter>
      <div>
        <Route path="/" exact component={Recipes} />
        <Route path="/saved" component={Saved} />
        <Route path="/shoppingList" component={ShoppingList} />
      </div>
    </BrowserRouter>
  </ApolloProvider>
)

export default App;
