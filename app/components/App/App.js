import React from 'react';
import { createBottomTabNavigator, SafeAreaView } from 'react-navigation';

import Recipes from '../Recipes/Recipes';
import Random from '../Random/Random';
import Saved from '../Saved/Saved';
import Recipe from '../Recipe/Recipe';
import TabBar from '../TabBar/TabBar';
import ShoppingList from '../ShoppingList/ShoppingList';

console.disableYellowBox = true;

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
  <Tabs />
)

export default App;