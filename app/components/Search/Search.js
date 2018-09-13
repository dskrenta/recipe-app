import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-navigation';

import SearchBar from '../Common/SearchBar';

const Search = ({ navigation }) => (
  <SafeAreaView>
    <SearchBar navigation={navigation} autoFocus={true} />
    <Text>Search</Text>
  </SafeAreaView>
)

export default Search;