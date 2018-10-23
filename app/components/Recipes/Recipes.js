import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableHighlight, Animated, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import SearchWrap from '../Common/SearchWrap';
import RecipeCard from '../Common/RecipeCard';
import Loading from '../Common/Loading';
import NoResults from '../Common/NoResults';

const width = Dimensions.get('window').width;

class Recipes extends React.Component {
  animValue = new Animated.Value(0)

  shouldLoadMore = ({ fetchMore, recommendedRecipes, scrollPos }) => {
    if (scrollPos > 0.7 * recommendedRecipes.results.length * width) {
      fetchMore({
        variables: {
          offset: recommendedRecipes.results.length
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          return Object.assign({}, prev, {
            recommendedRecipes: [...prev.recommendedRecipes, ...fetchMoreResult.recommendedRecipes]
          })
        }
      })
    }
    console.log("Scroll: ", scrollPos)
  }

  getScrollPos = ( e, data, fetchMore ) => {
    const currentOffset = Math.floor(e.nativeEvent.contentOffset.x);
    const currentIndex = Math.ceil(currentOffset / width);

    if (currentIndex > data.length - 4) {
      console.log("TRIGGERED")
      console.log(fetchMore)
      console.log(data)
      fetchMore({
        variables: {
          offset: data.length
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          console.log("PREV: ", prev)
          console.log("FETCHED: ", fetchMoreResult)
          const data = Object.assign({}, prev, {
            recommendedRecipes: {
              total: prev.recommendedRecipes.total,
              results: [...prev.recommendedRecipes.results, ...fetchMoreResult.recommendedRecipes.results],
              __typename: prev.recommendedRecipes.__typename
            }
          })
          console.log("NEW DATA: ", data)
          return data
        }
      })
    }

    console.log(currentIndex)
  }

  render() {
    const { navigation, data: { loading, error, recommendedRecipes, fetchMore } } = this.props;
    /*if (!loading) {
      const scrollPos = this.animValue.interpolate({
        inputRange: [0, recommendedRecipes.results.length * width],
        outputRange: [0, recommendedRecipes.results.length],
        extrapolate: 'clamp'
      });
      () => {this.shouldLoadMore({ fetchMore, recommendedRecipes, scrollPos })};
    }*/
    // console.log("FETCHMORE: ", fetchMore)
    console.log("DATA: ", recommendedRecipes)
    return (
      <SafeAreaView>
        <SearchWrap navigation={navigation}>
        { loading 
          ? <Loading />
          : error 
          ? <NoResults />
          : <View style={styles.carouselContain}>
              <ScrollView
                style={styles.scrollView}
                showsHorizontalScrollIndicator={false}
                horizontal
                pagingEnabled
                scrollEventThrottle={300}
                onScrollEndDrag={(e) => {this.getScrollPos(e, recommendedRecipes.results, fetchMore)}}
              >
                {recommendedRecipes.results.map((recipe, i) => (
                  <TouchableHighlight
                    onPress={() => {navigation.navigate('Recipe', { recipe })}}
                    underlayColor="transparent"
                    key={i}
                  >
                    <RecipeCard recipe={recipe} navigation={navigation} />
                  </TouchableHighlight>
                ))}
              </ScrollView>
            </View>
          }
        </SearchWrap>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  carouselContain: {
    flex: 1
  },
  scrollView: {
    flex: 1
  }
})

const RECIPES_QUERY = gql`
  query recommendedRecipes($pagination: Pagination) {
    recommendedRecipes(pagination: $pagination) {
      total
      results {
        image
        rating
        title
        course
        cuisine
        totalTime
        servings
        nutrition {
          calories
        }
        description
        ingredients
        directions
      }
    }
  }
`

export default graphql(RECIPES_QUERY, {
  options() {
    return {
      variables: {
        pagination: {
          offset: 0,
          limit: 10
        }
      }
    };
  }
})(Recipes);
