import React from 'react';
import { View, Image, Text, StyleSheet, Dimensions } from 'react-native';
import IconMdc from 'react-native-vector-icons/MaterialCommunityIcons';
import IconMd from 'react-native-vector-icons/MaterialIcons';
import IconIon from 'react-native-vector-icons/Ionicons';
import IconEn from 'react-native-vector-icons/Entypo';
import Star from 'react-native-star-view';

import { iPhoneStyle } from '../../utils/iPhoneStyle';

const { width, height } = Dimensions.get('window');

const RecipeCard = ({ recipe }) => (
  <View style={styles.contain}>
    <View style={styles.imageContain}>
      <Image source={{uri: recipe.image}} style={styles.image} />
    </View>
    <View style={styles.titleContain}>
      <Text style={styles.title}>{recipe.title}</Text>
      <View style={styles.ratingRow}>
        <Star score={recipe.rating} style={styles.ratingStars} />
        <Text style={styles.ratingText}>{recipe.rating}</Text>
      </View>
    </View>
    {/*<View style={styles.colorRow}>
      <View style={styles.colorItem}>
        <Text style={styles.colorItemText}>EASY</Text>
      </View>
      <View style={[styles.colorItem, {borderRightWidth: 1, borderLeftWidth: 1}]}>
        <Text style={styles.colorItemText}>{recipe.cuisine.toUpperCase()}</Text>
      </View>
      <View style={styles.colorItem}>
        <Text style={styles.colorItemText}>{recipe.course.toUpperCase()}</Text>
      </View>
    </View>*/}
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
    <View style={styles.bottomRow}>
      <View style={styles.bottomItem}>
        <Text style={styles.statText}>{recipe.totalTime}</Text>
        <Text style={styles.statSpan}>Minutes</Text>
      </View>
      <View style={styles.bottomItem}>
        <Text style={styles.statText}>{recipe.servings}</Text>
        <Text style={styles.statSpan}>Servings</Text>
      </View>
      <View style={styles.bottomItem}>
        <Text style={styles.statText}>{recipe.nutrition.calories}</Text>
        <Text style={styles.statSpan}>Calories</Text>
      </View>
    </View>
    <View style={styles.descContain}>
      <Text numberOfLines={3}>{recipe.description}</Text>
    </View>
    {/*<View style={styles.bottomRow}>
      <View style={styles.bottomItem}>
        <IconIon name="md-stopwatch" size={30} color="#2c6" />
        <Text style={styles.statSpan}>{recipe.totalTime}<Text style={styles.statSpan}> min</Text></Text>
      </View>
      <View style={styles.bottomItem}>
        <IconIon name="md-ribbon" size={30} color="#2c6" />
        <Text style={styles.statSpan}>{recipe.rating}<Text style={styles.statSpan}>/5</Text></Text>
      </View>
      <View style={styles.bottomItem}>
        <IconMdc name="fire" size={30} color="#2c6" />
        <Text style={styles.statSpan}>{recipe.nutrition.calories}<Text style={styles.statSpan}> cal</Text></Text>
      </View>
    </View>*/}
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
    padding: 20,
    paddingBottom: 5
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333'
  },
  ratingRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  ratingStars: {
    height: 20,
    width: 100,
  },
  ratingText: {
    fontSize: 16,
    marginHorizontal: 6,
    marginBottom: 3,
    marginTop: 4
  },
  colorRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-between',
  },
  colorItem: {
    flex: 1,
    //xflexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderWidth: 0,
    borderColor: '#ccc',
    marginVertical: 10
  },
  colorItemText: {
    fontWeight: '900',
    color: '#fff',
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
    paddingTop: 5,
    paddingBottom: 15
  },
  statText: {
    marginBottom: 5,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a5'
  },
  statSpan: {
    color: '#666'
  },
  descContain: {
    padding: 20,
    paddingTop: 0,
    paddingBottom: 20
  }
});

export default RecipeCard;