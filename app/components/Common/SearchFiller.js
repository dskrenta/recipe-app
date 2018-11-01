import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const SearchFiller = () => (
  <View style={styles.contain}>
    <Icon name="search" size={40} color="#2c6" style={styles.icon} />
    <Text style={styles.text}>Search for a Recipe</Text>
  </View>
)

const styles = StyleSheet.create({
  contain: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 100
  },
  icon: {
    marginBottom: 20
  },
  text: {
    fontSize: 20,
    color: "#666"
  }
})

export default SearchFiller;