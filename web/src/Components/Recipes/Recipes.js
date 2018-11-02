import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Swiper from 'react-id-swiper';
import 'react-id-swiper/src/styles/css/swiper.css';

import TabBar from '../Common/TabBar';
import SearchWrap from '../Common/SearchWrap';
import RecipeCard from '../Common/RecipeCard';
import styles from './Recipes.module.css'; 

class Recipes extends React.Component {
  render() {
    const { navigation } = this.props;
    const params = {
      shouldSwiperUpdate: true,
      wrapperClass: `${styles.wrapper}`
    }
    return (
      <SearchWrap>
        <Query
          query={RECIPES_QUERY}
          variables={{
            pagination: {
              offset: 0,
              limit: 10
            }
          }}
        >
          {({ loading, error, data }) => {
            if (loading) return `Loading`;
            if (error) return `Error!: ${error}`;
            return (
              <div className={styles.contain}>
                <Swiper {...params}>
                  {data.recommendedRecipes && data.recommendedRecipes.results.map((recipe, i) => (
                    <RecipeCard key={i} recipe={recipe} navigation={navigation} />
                  ))}
                </Swiper>
              </div>
            )
          }}
        </Query>
        <TabBar navigation={navigation} />
      </SearchWrap>
    )
  }
}

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
/*
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
*/
export default Recipes;
