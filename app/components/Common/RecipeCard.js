import React from 'react';
import { View, Image, Text, StyleSheet, Dimensions } from 'react-native';
import { iPhoneStyle } from '../../utils/iPhoneStyle';

const { width, height } = Dimensions.get('window');

const RecipeCard = ({ recipe }) => (
  <View style={styles.contain}>
    <View style={styles.imageContain}>
      <Image source={{uri: recipe.image}} style={styles.image} />
    </View>
    <View style={styles.titleContain}>
      <Text style={styles.title}>{recipe.title}</Text>
    </View>
    <View style={styles.colorRow}>
      <View style={[styles.rowItem, {backgroundColor: '#66e599'}]}>
        <Text style={styles.rowItemText}>EASY</Text>
      </View>
      <View style={[styles.rowItem, {backgroundColor: '#3bde7c'}]}>
        <Text style={styles.rowItemText}>{recipe.cuisine.toUpperCase()}</Text>
      </View>
      <View style={[styles.rowItem, {backgroundColor: '#2c6'}]}>
        <Text style={styles.rowItemText}>{recipe.course.toUpperCase()}</Text>
      </View>
    </View>
    <View style={styles.titleContain}>
      <Text numberOfLines={4}>{recipe.description}</Text>
    </View>
    <View style={styles.titleContain}>
      <Text numberOfLines={4}>{recipe.description}</Text>
    </View>
    <View style={styles.titleContain}>
      <Text numberOfLines={4}>{recipe.description}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  contain: {
    flex: 1,
    marginHorizontal: 15,
    marginTop: 5,
    marginBottom: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    width: width - 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2
  },
  imageContain: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden',
    flex: 1
  },
  image: {
    width: '100%',
    height: (height - iPhoneStyle(220, 180, 180)) / 2,
    flex: 1
  },
  titleContain: {
    padding: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333'
  },
  colorRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-between',
  },
  rowItem: {
    flex: 1,
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15
  },
  rowItemText: {
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center'
  }
});

export default RecipeCard;