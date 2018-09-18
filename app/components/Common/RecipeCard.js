import React from 'react';
import { View, Image, Text, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

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
      <View style={[styles.colorItem, {backgroundColor: '#66e599'}]}>
        <Text style={styles.colorItemText}>EASY</Text>
      </View>
      <View style={[styles.colorItem, {backgroundColor: '#3bde7c'}]}>
        <Text style={styles.colorItemText}>{recipe.cuisine.toUpperCase()}</Text>
      </View>
      <View style={[styles.colorItem, {backgroundColor: '#2c6'}]}>
        <Text style={styles.colorItemText}>{recipe.course.toUpperCase()}</Text>
      </View>
    </View>
    <View style={styles.titleContain}>
      <Text numberOfLines={4}>{recipe.description}</Text>
    </View>
    <View style={styles.bottomRow}>
      <View style={styles.bottomItem}>
        <Icon name="stopwatch" size={30} color="#666" />
        <Text style={styles.statText}>{recipe.totalTime}<Text style={styles.statSpan}> min</Text></Text>
      </View>
      <View style={styles.bottomItem}>
        <Icon name="price-ribbon" size={30} color="#666" />
        <Text style={styles.statText}>{recipe.rating}<Text style={styles.statSpan}> /5</Text></Text>
      </View>
      <View style={styles.bottomItem}>
        <Icon name="flash" size={30} color="#666" />
        <Text style={styles.statText}>{recipe.nutrition.calories}<Text style={styles.statSpan}> cal</Text></Text>
      </View>
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
  colorItem: {
    flex: 1,
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12
  },
  colorItemText: {
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center'
  },
  bottomRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-between',
  },
  bottomItem: {
    flex: 1,
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 20
  },
  statText: {
    marginTop: 5,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a5'
  },
  statSpan: {
    fontSize: 16,
    fontWeight: 'normal',
    color: '#333'
  }
});

export default RecipeCard;