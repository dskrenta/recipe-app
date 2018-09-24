import React from 'react';
import { View, Text, Image, StyleSheet, TouchableHighlight, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon5 from 'react-native-vector-icons/FontAwesome5';

const Recipe = ({ navigation }) => {
  const recipe = navigation.getParam('recipe', {});
  return (
    <SafeAreaView>
      <View style={styles.header}>
        <TouchableHighlight
          onPress={() => {navigation.goBack()}}
          underlayColor="transparent"
          style={styles.touchable}
        >
          <Icon5 name="arrow-left" size={25} />
        </TouchableHighlight>
        <Text style={styles.headerTitle}>Recipe Details</Text>
        <TouchableHighlight
          onPress={() => {navigation.goBack()}}
          underlayColor="transparent"
          style={styles.touchable}
        >
          <Icon name="bookmark-o" size={25} />
        </TouchableHighlight>
      </View>
      <ScrollView style={styles.contain}>
        <View style={styles.innerContain}>
        {recipe.image && <Image source={{uri: recipe.image}} style={styles.image} />}
        <View style={styles.body}>
          {recipe.title && <Text style={styles.title}>{recipe.title}</Text>}
          <View style={styles.titleSubrow}>
            {recipe.course &&
              <View style={styles.courseTag}>
                <Text style={styles.course}>{recipe.course}</Text>
              </View>
            }
            {recipe.cuisine && <Text style={styles.cuisine}>{recipe.cuisine} Cuisine</Text>}
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
            {recipe.nutrition && recipe.nutrition.calories &&
              <View style={styles.bottomItem}>
                <Text style={styles.statText}>{recipe.nutrition.calories}</Text>
                <Text style={styles.statSpan}>Calories</Text>
              </View>
            }
          </View>
          {recipe.description &&
            <View style={styles.descContain}>
              <Text style={styles.sectionTitle}>Description</Text>
              <Text>{recipe.description}</Text>
            </View>
          }
          {recipe.ingredients &&
            <View style={styles.descContain}>
              <Text style={styles.sectionTitle}>Ingredients</Text>
              {recipe.ingredients.map((item, i) => (
                <View key={i} style={styles.listItem}>
                  <View style={styles.bullet}></View>
                  <Text style={styles.listItemText}>{item}</Text>
                </View>
              ))}
            </View>
          }
          {recipe.directions &&
            <View style={styles.descContain}>
              <Text style={styles.sectionTitle}>Directions</Text>
              {recipe.directions.map((item, i) => (
                <View key={i} style={styles.listItem}>
                  <View style={styles.step}>
                    <Text style={styles.stepNum}>{i}</Text>
                  </View>
                  <Text style={styles.listItemText}>{item}</Text>
                </View>
              ))}
            </View>
          }
        </View>
      </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  headerTitle: {
    fontSize: 16
  },
  touchable: {
    paddingVertical: 20,
    paddingHorizontal: 25
  },
  contain: {
    height: '100%'
  },
  innerContain: {
    height: '100%',
    paddingBottom: 50
  },
  image: {
    width: '100%',
    height: 200
  },
  body: {
    paddingVertical: 20,
    paddingHorizontal: 25
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
  bottomRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-between'
  },
  bottomItem: {
    flex: 1,
    flexGrow: 1,
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingTop: 10,
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
    fontSize: 14
  },
  descContain: {
    paddingBottom: 20,
    paddingTop: 0
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5
  },
  listItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingBottom: 5
  },
  listItemText: {
    margin: 0,
    padding: 0,
    fontSize: 14,
    lineHeight: 16,
    flex: 1
  },
  bullet: {
    height: 5,
    width: 5,
    borderRadius: 2.5,
    margin: 5,
    marginRight: 10,
    backgroundColor: '#2c6'
  },
  step: {
    height: 15,
    width: 15,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
    marginRight: 7.5,
    borderRadius: 7.5,
    backgroundColor: '#2c6'
  },
  stepNum: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '900'
  }
})

export default Recipe;
