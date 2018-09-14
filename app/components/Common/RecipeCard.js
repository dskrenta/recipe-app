import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const RecipeCard = () => (
  <View style={styles.contain}>
  </View>
);

const styles = StyleSheet.create({
  contain: {
    flex: 1,
    marginHorizontal: 15,
    marginTop: 5,
    marginBottom: 10,
    backgroundColor: 'white',
    borderRadius: 25,
    width: width - 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2
  }
});

export default RecipeCard;