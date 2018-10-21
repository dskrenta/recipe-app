import React from 'react';
import {
  View,
  ScrollView,
  TouchableHighlight,
  StyleSheet,
  TextInput,
  Animated
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import SearchFilters from './SearchFilters';
import RecipeCard from './RecipeCard';
import SearchResults from './SearchResults';
import { iPhoneStyle } from '../../utils/iPhoneStyle';

const samples = [
  {
    title: 'Parmesan Risotto',
    description: `Slowly stirring hot broth into creamy white rice soothes the soul--and the result comforts the body. This parmesan risotto recipe make take some time to prepare but the finished dish will be well worth the effort.`,
    ingredients: [
      '10 to 12 cups reduced-sodium or homemade chicken broth*',
      '2 tablespoons olive oil',
      '2 tablespoons plus 1 tsp. butter, divided',
      '1 medium onion, chopped (about 1 1/2 cups)',
      '2 1/2 cups risotto rice (see note)',
      '3/4 cup dry white wine',
      'About 1/2 tsp. salt',
      '1/2 cup freshly grated parmesan cheese, plus more for serving',
      '1/2 teaspoon freshly ground black pepper',
      '1/4 cup chopped flat-leaf parsley'
    ],
    directions: [
      'Bring chicken broth to a simmer in a medium pot. Keep at a simmer, covered, over low heat.',
      'Heat the olive oil and 2 tbsp. butter over medium heat in a heavy-bottomed 8-qt. pot. Add onion and sauté, stirring occasionally, until translucent and beginning to turn golden, about 10 minutes. Add rice and sauté, stirring constantly, until just the edges of the grains look translucent, about 3 minutes.',
      'Add wine and 1/2 tsp. salt and cook, stirring, until wine is completely absorbed by rice. Add about 1/2 cup hot broth to rice and cook, stirring constantly, until broth is completely absorbed by rice; reduce heat to medium-low if mixture starts to boil. Continue adding broth 1/2 cup at a time, stirring until each addition is absorbed before adding the next, until rice is just tender to the bite (15 to 30 minutes; you will have broth left over). Keep rice at a constant simmer.',
      'Remove rice from heat and stir in parmesan, pepper, parsley, remaining 1 tsp. butter, and salt to taste. For a looser risotto, stir in 1 to 2 cups remaining broth. Serve immediately, with more parmesan on the side for sprinkling.',
      'Risotto\'s characteristic creaminess and chewiness come from the rice itself, and risotto rice is no ordinary rice. It contains two different starches: an amylopectin exterior, which softens faster--especially under the pressure of constant stirring--to create a creamy sensation in the mouth; and an amylose interior, which stays relatively firm during cooking to give you that al dente bite.',
      `Arborio is the starchiest of the three popular risotto types, and it's the most prone to getting gummy as it cooks; inside, the grains tend to be chalky and crumbly. Widely available.`,
      `Our favorite, Carnaroli has longer, narrow grains that cook the most evenly and have the best texture--creamy without being gluey, and a good chewy interior. Find at Whole Foods Markets, A.G. Ferrari Foods (agferrari.com), and gourmet grocery stores.`,
      `Vialone Nano grains are smaller, oval-shaped, and produce a delicate risotto with a nutty flavor. Find at A.G. Ferrari Foods (see above) and specialty stores.`,
      `Surprise: Sushi rice. Medium-grain Nishiki brand is creamy and chewy, and so much like Arborio that half our tasting panel couldn't tell the difference. Plus, it costs less than any Italian risotto rice.`
    ],
    image: 'https://imagesvc.timeincapp.com/v3/mm/image?url=https%3A%2F%2Fcdn-image.myrecipes.com%2Fsites%2Fdefault%2Ffiles%2Fstyles%2Fmedium_2x%2Fpublic%2Fimage%2Frecipes%2Fsu%2F09%2F02%2Fparmesan-risotto-su-1873423-x.jpg%3Fitok%3DA6i8zol2&w=800&q=85',
    totalTime: 50,
    servings: '8-10',
    cuisine: 'Indian',
    course: 'Dinner',
    nutrition: {
      calories: 307,
      caloriesFromFat: 27,
      protein: 10,
      fat: 9.2,
      saturatedFat: 3.7,
      carbohydrates: 46,
      fiber: 4.3,
      sodium: 1008,
      cholesterol: 14
    },
    url: 'https://www.myrecipes.com/recipe/parmesan-risotto',
    rating: 4.9,
    chef: {
      name: 'Chef John',
      avatar: 'https://secureimages.allrecipes.com/userphotos/250x250/2267470.jpg',
      url: 'https://www.allrecipes.com/cook/foodwisheswithchefjohn/'
    }
  },
  {
    title: 'Parmesan Risotto',
    description: `Slowly stirring hot broth into creamy white rice soothes the soul--and the result comforts the body. This parmesan risotto recipe make take some time to prepare but the finished dish will be well worth the effort.`,
    ingredients: [
      '10 to 12 cups reduced-sodium or homemade chicken broth*',
      '2 tablespoons olive oil',
      '2 tablespoons plus 1 tsp. butter, divided',
      '1 medium onion, chopped (about 1 1/2 cups)',
      '2 1/2 cups risotto rice (see note)',
      '3/4 cup dry white wine',
      'About 1/2 tsp. salt',
      '1/2 cup freshly grated parmesan cheese, plus more for serving',
      '1/2 teaspoon freshly ground black pepper',
      '1/4 cup chopped flat-leaf parsley'
    ],
    directions: [
      'Bring chicken broth to a simmer in a medium pot. Keep at a simmer, covered, over low heat.',
      'Heat the olive oil and 2 tbsp. butter over medium heat in a heavy-bottomed 8-qt. pot. Add onion and sauté, stirring occasionally, until translucent and beginning to turn golden, about 10 minutes. Add rice and sauté, stirring constantly, until just the edges of the grains look translucent, about 3 minutes.',
      'Add wine and 1/2 tsp. salt and cook, stirring, until wine is completely absorbed by rice. Add about 1/2 cup hot broth to rice and cook, stirring constantly, until broth is completely absorbed by rice; reduce heat to medium-low if mixture starts to boil. Continue adding broth 1/2 cup at a time, stirring until each addition is absorbed before adding the next, until rice is just tender to the bite (15 to 30 minutes; you will have broth left over). Keep rice at a constant simmer.',
      'Remove rice from heat and stir in parmesan, pepper, parsley, remaining 1 tsp. butter, and salt to taste. For a looser risotto, stir in 1 to 2 cups remaining broth. Serve immediately, with more parmesan on the side for sprinkling.',
      'Risotto\'s characteristic creaminess and chewiness come from the rice itself, and risotto rice is no ordinary rice. It contains two different starches: an amylopectin exterior, which softens faster--especially under the pressure of constant stirring--to create a creamy sensation in the mouth; and an amylose interior, which stays relatively firm during cooking to give you that al dente bite.',
      `Arborio is the starchiest of the three popular risotto types, and it's the most prone to getting gummy as it cooks; inside, the grains tend to be chalky and crumbly. Widely available.`,
      `Our favorite, Carnaroli has longer, narrow grains that cook the most evenly and have the best texture--creamy without being gluey, and a good chewy interior. Find at Whole Foods Markets, A.G. Ferrari Foods (agferrari.com), and gourmet grocery stores.`,
      `Vialone Nano grains are smaller, oval-shaped, and produce a delicate risotto with a nutty flavor. Find at A.G. Ferrari Foods (see above) and specialty stores.`,
      `Surprise: Sushi rice. Medium-grain Nishiki brand is creamy and chewy, and so much like Arborio that half our tasting panel couldn't tell the difference. Plus, it costs less than any Italian risotto rice.`
    ],
    image: 'https://imagesvc.timeincapp.com/v3/mm/image?url=https%3A%2F%2Fcdn-image.myrecipes.com%2Fsites%2Fdefault%2Ffiles%2Fstyles%2Fmedium_2x%2Fpublic%2Fimage%2Frecipes%2Fsu%2F09%2F02%2Fparmesan-risotto-su-1873423-x.jpg%3Fitok%3DA6i8zol2&w=800&q=85',
    totalTime: 50,
    servings: '8-10',
    cuisine: 'Japaneese',
    course: 'Dinner',
    nutrition: {
      calories: 307,
      caloriesFromFat: 27,
      protein: 10,
      fat: 9.2,
      saturatedFat: 3.7,
      carbohydrates: 46,
      fiber: 4.3,
      sodium: 1008,
      cholesterol: 14
    },
    url: 'https://www.myrecipes.com/recipe/parmesan-risotto',
    rating: 4.9,
    chef: {
      name: 'Chef John',
      avatar: 'https://secureimages.allrecipes.com/userphotos/250x250/2267470.jpg',
      url: 'https://www.allrecipes.com/cook/foodwisheswithchefjohn/'
    }
  }
]

class SearchWrap extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      showSearch: false,
      showResults: false,
      backIcon: false,
      fade: new Animated.Value(0)
    }
  }

  onFocus = () => {
    this.setState({ showSearch: true, showResults: false, backIcon: true });
    Animated.timing(this.state.fade, {
      toValue: 1,
      duration: 500
    }).start();
  }

  endSearch = () => {
    this.searchBar.blur();
    this.setState({ backIcon: false, value: '' });
    Animated.timing(this.state.fade, {
      toValue: 0,
      duration: 500
    }).start(() => {
      this.setState({ showSearch: false, showResults: false })
    });
  }

  onSubmit = () => {
    this.setState({ showResults: true })
  }

  render() {
    const { navigation, children } = this.props;
    return (
      <View style={styles.contain}>
        <View style={styles.barContain}>
          <View style={styles.searchBar}>
            {this.state.backIcon
              ? <TouchableHighlight
                  onPress={this.endSearch}
                  underlayColor="transparent"
                >
                  <Icon name="arrow-left" color="#2c6" size={20} style={styles.search}/>
                </TouchableHighlight>
              : <Icon name="search" color="#2c6" size={20} style={styles.search}/>
            }
            <TextInput
              ref={(ref) => {this.searchBar = ref}}
              placeholder="Search Recipes"
              style={styles.input}
              value={this.state.value}
              onChangeText={(value) => {this.setState({ value })}}
              onFocus={this.onFocus}
              onSubmitEditing={this.onSubmit}
              underlineColorAndroid="transparent"
            />
            {this.state.value !== '' &&
              <TouchableHighlight
                onPress={() => {this.setState({ value: '' })}}
                underlayColor="transparent"
              >
                <Icon name="times-circle" size={15} color="#ccc" style={styles.clear} />
              </TouchableHighlight>
            }
          </View>
        </View>
        <Animated.View
          style={[styles.searchResults,
            {
              opacity: this.state.fade,
              zIndex: this.state.showSearch ? 1 : 0
            },
          ]}
        >
          {this.state.showResults && <SearchResults navigation={navigation} query={this.state.value} />}
        </Animated.View>
        <View style={styles.children}>
          {children}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  contain: {
    width: '100%',
    height: '100%'
  },
  barContain: {
    width: '100%',
    height: 80,
    padding: 15
  },
  searchBar: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 2
  },
  search: {
    marginRight: 15,
    marginLeft: 20,
    width: 20,
    height: 20
  },
  input: {
    flex: 1,
    height: 50
  },
  clear: {
    marginRight: 20,
    marginLeft: 10,
    marginVertical: 10
  },
  searchResults: {
    position: 'absolute',
    bottom: 0,
    top: 80,
    right: 0,
    left: 0,
    backgroundColor: 'white'
  },
  filterScroll: {
    flex: 1,
    height: '100%'
  },
  children: {
    position: 'absolute',
    bottom: 0,
    top: 80,
    right: 0,
    left: 0,
    zIndex: 0
  },
  scrollView: {
    flex: 1
  }
});

export default SearchWrap;
