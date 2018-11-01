import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Recipes from '../Recipes/Recipes';
import Search from '../Search/Search';
import Saved from '../Saved/Saved';
import ShoppingList from '../ShoppingList/ShoppingList';

const App = () => (
  <BrowserRouter>
    <div>
      <Route path="/" exact component={Recipes} />
      <Route path="/search/:query" component={Search} />
      <Route path="/saved" component={Saved} />
      <Route path="/shoppingList" component={ShoppingList} />
    </div>
  </BrowserRouter>
)

export default App;
