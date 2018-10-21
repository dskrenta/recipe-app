import React from 'react';
import { View, Image, Text, StyleSheet, Dimensions } from 'react-native';
import IconMd from 'react-native-vector-icons/MaterialIcons';
import IconFa from 'react-native-vector-icons/FontAwesome';

import { iPhoneStyle } from '../../utils/iPhoneStyle';
import recipeImage from '../../utils/recipeImage';

const { width, height } = Dimensions.get('window');

const RecipeCard = ({ recipe }) => {
  renderDifficulty = (recipe) => {
    let difficulty;
    let score = 0;
    if (recipe.directions) score += recipe.directions.length;
    if (recipe.ingredients) score += recipe.ingredients.length;
    
    if (score < 10) {
      difficulty = 'Easy'
    }
    else if (score < 16) {
      difficulty = 'Medium'
    }
    else {
      difficulty = 'Hard'
    }
  
    return (
      <View style={styles.bottomItem}>
        <Text style={styles.statText}>{difficulty}</Text>
        <Text style={styles.statSpan}>Difficulty</Text>
      </View>
    )
  }

  return (
    <View style={styles.contain}>
      <View style={styles.overflow}>
        {recipe.image &&
          <View style={styles.imageContain}>
            <Image source={{uri: recipeImage(recipe.image)}} style={styles.image} />
            <View style={styles.saveContain}>
              <IconFa name="bookmark-o" size={30} color="#fff" style={styles.saveIcon} />
            </View>
            {recipe.rating &&
              <View style={styles.ratingContain}>
                <View style={styles.ratingRow}>
                  <IconMd name="star" size={25} color="orange" />
                  <Text style={styles.ratingText}>{recipe.rating}</Text>
                </View>
              </View>
            }
          </View>
        }
        <View style={styles.titleContain}>
          <Text style={styles.title}>{recipe.title}</Text>
          <View style={styles.titleSubrow}>
            {recipe.course &&
              <View style={styles.courseTag}>
                <Text style={styles.course}>{recipe.course}</Text>
              </View>
            }
            {recipe.cuisine &&
              <Text style={styles.cuisine}>{recipe.cuisine} Cuisine</Text>
            }
          </View>
        </View>
        <View style={styles.bottomRow}>
          {recipe.totalTime &&
            <View style={styles.bottomItem}>
              <Text style={styles.statText}>{recipe.totalTime}</Text>
              <Text style={styles.statSpan}>Minutes</Text>
            </View>
          }
          {recipe.servings &&
            <View style={styles.bottomItem}>
              <Text style={styles.statText}>{recipe.servings}</Text>
              <Text style={styles.statSpan}>Servings</Text>
            </View>
          }
          {recipe.nutrition 
            ? recipe.nutrition.calories &&
                <View style={styles.bottomItem}>
                  <Text style={styles.statText}>{recipe.nutrition.calories}</Text>
                  <Text style={styles.statSpan}>Calories</Text>
                </View>
            : this.renderDifficulty(recipe)
          }
        </View>
        {recipe.description &&
          <View style={styles.descContain}>
            <Text style={styles.descTitle}>Description</Text>
            <Text numberOfLines={3} style={styles.descText}>{recipe.description}</Text>
          </View>
        }
      </View>
    </View>
  );
}

/*<View style={styles.row}>
  <IconIon name="md-stopwatch" size={20} color="#333" style={{marginRight: 5}} />
  <Text style={styles.statSpan1}>{recipe.totalTime}</Text>
  <Text style={styles.statSpan}> Minutes</Text>
  <IconIon name="md-restaurant" size={20} color="#333" style={{marginLeft: 15, marginRight: 5}} />
  <Text style={styles.statSpan1}>{recipe.servings}</Text>
  <Text style={styles.statSpan}> Servings</Text>
</View>*/
/*<View style={styles.colorRow}>
  <View style={[styles.colorItem, {backgroundColor: '#66e599'}]}>
    <Text style={styles.colorItemText}>EASY</Text>
  </View>
  <View style={[styles.colorItem, {backgroundColor: '#3bde7c'}]}>
    <Text style={styles.colorItemText}>{recipe.cuisine.toUpperCase()}</Text>
  </View>
  <View style={[styles.colorItem, {backgroundColor: '#2c6'}]}>
    <Text style={styles.colorItemText}>{recipe.course.toUpperCase()}</Text>
  </View>
</View>*/
/*<View style={styles.bottomRow}>
  <View style={styles.bottomItem}>
    <IconIon name="md-stopwatch" size={30} color="#2c6" />
    <Text style={styles.statSpan}>{recipe.totalTime}<Text style={styles.statSpan}> minutes</Text></Text>
  </View>
  <View style={styles.bottomItem}>
    <IconMd name="restaurant" size={30} color="#2c6" />
    <Text style={styles.statSpan}>{recipe.servings}<Text style={styles.statSpan}> servings</Text></Text>
  </View>
  <View style={styles.bottomItem}>
    <IconMdc name="fire" size={30} color="#2c6" />
    <Text style={styles.statSpan}>{recipe.nutrition.calories}<Text style={styles.statSpan}> calories</Text></Text>
  </View>
</View>*/
/*
<View style={styles.ratingRow}>
  <IconMd name="star" size={25} color="orange" style={styles.ratingStars} />
  <Text style={styles.ratingText}>{recipe.rating}</Text>
</View>*/
/*<View style={styles.colorRow}>
  <View style={styles.colorItem}>
    <Text style={styles.colorItemText}>Easy</Text>
  </View>
  <View style={[styles.colorItem, {borderRightWidth: 1, borderLeftWidth: 1}]}>
    <Text style={styles.colorItemText}>{recipe.cuisine}</Text>
  </View>
  <View style={styles.colorItem}>
    <Text style={styles.colorItemText}>{recipe.course}</Text>
  </View>
</View>
*/


const styles = StyleSheet.create({
  contain: {
    flex: 1,
    marginHorizontal: 15,
    marginTop: 5,
    marginBottom: 10,
    backgroundColor: 'white',
    borderRadius: 15,
    width: width - 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 2
  },
  overflow: {
    overflow: 'hidden',
    flex: 1,
    paddingBottom: 10
  },
  imageContain: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden',
    flex: 1,
    position: 'relative'
  },
  image: {
    width: '100%',
    height: (height - iPhoneStyle(220, 180, 180)) / 2,
    flex: 1
  },
  saveContain: {
    position: 'absolute',
    top: 25,
    right: 20
  },
  saveIcon: {
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 1
    },
    textShadowOffset: {
      width: 0,
      height: 1
    },
    elevation: 5
  },
  titleContain: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 5,
    display: 'flex',
    flexDirection: 'column',
    position: 'relative'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333'
  },
  titleSubrow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'flex-start',
    marginTop: 5
  },
  courseTag: {
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 4,
    backgroundColor: '#2c6',
    marginRight: 8
  },
  course: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold'
  },
  cuisine: {
    fontSize: 16,
    color: '#333'
  },
  ratingCircle: {
    position: 'absolute',
    top: -20,
    right: 20,
    height: 40,
    width: 80,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ratingContain: {
    position: 'absolute',
    top: 20,
    left: 20,
    height: 40,
    width: 80,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ratingRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 0
  },
  ratingText: {
    fontSize: 18,
    color: '#666',
    fontWeight: 'bold',
    marginHorizontal: 5
  },
  colorRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-between',
  },
  colorItem: {
    flex: 1,
    //flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderWidth: 0,
    borderColor: '#ccc',
    marginVertical: 10
  },
  colorItemText: {
    fontWeight: 'bold',
    color: '#444',
    textAlign: 'center'
  },
  bottomRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    paddingLeft: 20
  },
  bottomItem: {
    flex: 1,
    flexGrow: 1,
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingTop: 8,
    paddingBottom: 10
  },
  statText: {
    marginBottom: 3,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a5'
  },
  statSpan: {
    color: '#888',
    fontSize: 15
  },
  descContain: {
    padding: 20,
    paddingTop: 0,
    paddingBottom: 10
  },
  descTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#555'
  },
  descText: {
    fontSize: 15
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    paddingBottom: 20
  },
  statSpan1: {
    paddingLeft: 5,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c6'
  }
});

export default RecipeCard;
