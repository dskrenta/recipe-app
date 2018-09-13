import React from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import { SafeAreaView } from 'react-navigation';

import SearchBar from '../Common/SearchBar';

const Recommended = ({ navigation }) => (
  <SafeAreaView>
    <TouchableHighlight
      onPress={() => (navigation.navigate('Search'))}
      underlayColor="transparent"
    >
      <SearchBar navigation={navigation} />
    </TouchableHighlight>
    <Text>Recommended</Text>
  </SafeAreaView>
)

export default Recommended;