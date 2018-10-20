import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link'

import Recipes from '../Recipes/Recipes';
import Random from '../Random/Random';
import Saved from '../Saved/Saved';
import Recipe from '../Recipe/Recipe';
import TabBar from '../TabBar/TabBar';
import ShoppingList from '../ShoppingList/ShoppingList';

console.disableYellowBox = true;

// const httpLink = createHttpLink({ uri: 'http://recipe-app-server.us-west-1.elasticbeanstalk.com/graphql' });
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

const Tabs = createBottomTabNavigator(
  {
    Recipes: {
      screen: Recipes
    },
    Random: {
      screen: Random
    },
    Saved: {
      screen: Saved
    },
    Recipe: {
      screen: Recipe
    },
    ShoppingList: {
      screen: ShoppingList
    }
  },
  {
    initialRouteName: 'Recipes',
    swipeEnabled: false,
    animationEnabled: false,
    tabBarComponent: TabBar
  }
);

const App = () => (
  <ApolloProvider client={client}>
    <Tabs />
  </ApolloProvider>
)

export default App;