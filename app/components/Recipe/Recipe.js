import React from 'react';
import { View, Text, Image, StyleSheet, TouchableHighlight, ScrollView, Dimensions, AsyncStorage } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import IconMd from 'react-native-vector-icons/MaterialCommunityIcons';

import recipeImage from '../../utils/recipeImage';

class Recipe extends React.Component {
  constructor(props) {
    super(props);
    const recipe = this.props.navigation.getParam('recipe', {});

    if (recipe.ingredients) {
      this.state = {
        checks: Array(recipe.ingredients.length).fill(0),
        modifier: 1
      }
    }
  }

  addToCart = async () => {
    try {
      const recipe = this.props.navigation.getParam('recipe', {});
      const newItems = recipe.ingredients.filter((item, i) => this.state.checks[i]);
      const cart = await AsyncStorage.getItem('shoppingList');

      if (cart !== null) {
        const newCart = JSON.parse(cart).concat(newItems);
        await AsyncStorage.setItem('shoppingList', JSON.stringify(newCart));
      }
      else {
        await AsyncStorage.setItem('shoppingList', JSON.stringify(newItems));
      }
    }
    catch (e) {
      console.error(e);
    }
  }

  toggleCheck = (i) => {
    const newChecks = this.state.checks;
    newChecks[i] = !newChecks[i];
    this.setState({ checks: newChecks });
  }

  directionHeading = ({ item, i }) => {
    this.setState({ modifier: i });
    console.log("MODIFIED");
    return (
      <Text key={i} style={styles.subheading}>{item.substring(1)}:</Text>
    )
  }

  renderDirections = (directions) => {
    let mod = -1;
    let dirs = [];

    directions.map((item, i) => {
      let dir;
      if (item.startsWith('#')) {
        mod = i;
        dir = (
          <Text style={[styles.subheading, i === 0 && {marginTop: 0}]}>{item.substring(1)}</Text>
        );
      }
      else {
        dir = (
          <View key={i} style={styles.listItem}>
            <View style={styles.step}>
              <Text style={styles.stepNum}>{i - mod}</Text>
            </View>
            <Text style={styles.listItemText}>{item}</Text>
          </View>
        );
      }
      dirs.push(dir);
    })

    return dirs
  }

  renderDifficulty = (recipe) => {
    const score = recipe.directions.length + recipe.ingredients.length;
    let difficulty;
    
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

  componentWillReceiveProps() {
    const recipe = this.props.navigation.getParam('recipe', {});
    this.setState({ checks: Array(recipe.ingredients.length).fill(0) });
    this.myScroll && this.myScroll.scrollTo({x: 0, y: 0, animated: false});
  }

  render() {
    const { navigation } = this.props;
    const recipe = navigation.getParam('recipe', {});
    return (
      <SafeAreaView>
        <View style={styles.header}>
          <TouchableHighlight
            onPress={() => {navigation.goBack()}}
            underlayColor="transparent"
            style={styles.touchable}
          >
            <Icon5 name="arrow-left" size={25} color="#666" />
          </TouchableHighlight>
          <Text style={styles.headerTitle}>Recipe Details</Text>
          <TouchableHighlight
            onPress={() => {navigation.goBack()}}
            underlayColor="transparent"
            style={styles.touchable}
          >
            <Icon name="bookmark-o" size={25} color="#666" />
          </TouchableHighlight>
        </View>
        <ScrollView
          style={styles.contain}
          ref={ref => this.myScroll = ref}
        >
          <View style={styles.innerContain}>
            <View style={styles.imageContain}>
              {recipe.image && <Image source={{uri: recipeImage(recipe.image)}} style={styles.image} />}
              {recipe.rating && recipe.image &&
                <View style={styles.ratingContain}>
                  <View style={styles.ratingRow}>
                    <IconMd name="star" size={25} color="orange" />
                    <Text style={styles.ratingText}>{recipe.rating}</Text>
                  </View>
                </View>
              }
            </View>
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
                  <Text style={styles.sectionTitle}>Description</Text>
                  <Text style={styles.desc}>{recipe.description}</Text>
                </View>
              }
              {recipe.ingredients &&
                <View style={styles.descContain}>
                  <Text style={styles.sectionTitlePad}>Ingredients</Text>
                  {recipe.ingredients.map((item, i) => (
                    item.startsWith('#')
                      ? <Text key={i} style={[styles.subheading, i === 0 && {marginTop: 0}]}>{item.substring(1)}</Text>
                      : <TouchableHighlight
                          key={i}
                          onPress={() => {this.toggleCheck(i)}}
                          underlayColor="transparent"
                          style={{flex: 1}}
                        >
                          <View style={styles.checkbox}>
                            <IconMd
                              name={this.state.checks[i] ? "checkbox-marked" : "checkbox-blank-outline"}
                              color={this.state.checks[i] ? '#2c6' : '#555'}
                              size={20}
                            />
                            <View style={styles.itemTextContain}>
                              <Text style={styles.itemText}>{item}</Text>
                            </View>
                          </View>
                        </TouchableHighlight>
                  ))}
                  <TouchableHighlight
                    onPress={this.addToCart}
                    underlayColor="transparent"
                    style={styles.addToCartButton}
                  >
                    <View style={styles.addToCart}>
                      <Text style={styles.buttonText}>Add to Shopping Cart</Text>
                      <Icon name="plus" size={15} color="#fff" />
                    </View>
                  </TouchableHighlight>
                </View>
              }
              {recipe.directions &&
                <View style={styles.descContain}>
                  <Text style={styles.sectionTitlePad}>Directions</Text>
                  {this.renderDirections(recipe.directions)}
                </View>
              }
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
}

const { width, height } = Dimensions.get('window');

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
  imageContain: {
    flex: 1,
    position: 'relative'
  },
  image: {
    width: '100%',
    height: height * 0.4,
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
    paddingBottom: 20
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
  desc: {
    fontSize: 15
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#555'
  },
  sectionTitlePad: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
    marginBottom: 10
  },
  listItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingBottom: 5
  },
  listItemText: {
    marginTop: 2,
    fontSize: 16,
    lineHeight: 19,
    flex: 1
  },
  step: {
    width: 20,
    marginHorizontal: 5
  },
  stepNum: {
    color: '#2c6',
    fontSize: 24,
    fontFamily: 'Cochin',
    fontWeight: '900'
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
  checkbox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 5
  },
  itemTextContain: {
    flex: 1,
    paddingLeft: 10
  },
  itemText: {
    fontSize: 16,
    lineHeight: 19
  },
  addToCartButton: {
    display: 'flex',
    alignItems: 'flex-start',
    paddingTop: 10,
    paddingBottom: 5
  },
  addToCart: {
    flexGrow: 0,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
    backgroundColor: '#2c6',
    flexDirection: 'row',
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginRight: 10,
  },
  subheading: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 10,
    color: '#555'
  }
})

export default Recipe;
