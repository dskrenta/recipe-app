import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight, ScrollView } from 'react-native';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import Loading from './Loading';
import NoResults from './NoResults';
import RecipeCard from './RecipeCard';

const SearchResults = ({ navigation, query, data: { loading, error, searchRecipes }}) => {
  if (loading) return <Loading />
  if (error) return <NoResults />
  console.log(searchRecipes)
  return (
    <ScrollView
      style={styles.scrollView}
      showsHorizontalScrollIndicator={false}
      horizontal
      pagingEnabled
    >
      {searchRecipes.results.map((recipe, i) => (
        <TouchableHighlight
          key={i}
          onPress={() => {navigation.navigate('Recipe', { recipe })}}
          underlayColor="transparent"
        >
          <RecipeCard recipe={recipe} />
        </TouchableHighlight>
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1
  }
})

const SEARCH_QUERY = gql`
  query searchRecipes($query: String!, $pagination: Pagination) {
    searchRecipes(query: $query, pagination: $pagination) {
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
`;

export default graphql(SEARCH_QUERY, {
  options(props) {
    return {
      variables: {
        query: props.query,
        pagination: {
          offset: 0,
          limit: 10
        }
      }
    };
  }
})(SearchResults);