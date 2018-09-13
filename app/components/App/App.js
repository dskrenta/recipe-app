import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import { View, Text } from 'react-native';

import Recommended from '../Recommended/Recommended';
import Random from '../Random/Random';
import Saved from '../Saved/Saved';
import Recipe from '../Recipe/Recipe';
import TabBar from '../TabBar/TabBar';

console.disableYellowBox = true;

const Tabs = createBottomTabNavigator(
  {
    Recommended: {
      screen: Recommended
    },
    Random: {
      screen: Random
    },
    Saved: {
      screen: Saved
    },
    Recipe: {
      screen: Recipe
    }
  },
  {
    initialRouteName: 'Recommended',
    swipeEnabled: false,
    animationEnabled: true,
    tabBarComponent: TabBar
  }
);

const App = () => (
  <Tabs />
)

export default App;