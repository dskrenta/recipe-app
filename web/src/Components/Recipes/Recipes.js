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
  constructor(props) {
    super(props);
    this.swiper = null;
  }

  shouldLoadMore = (data, fetchMore) => {
    const len = data.recommendedRecipes.results.length - 1;
    const active = this.swiper.activeIndex;

    if (active > len - 4) {
      console.log("triggered")
      console.log(len, active)
      console.log(fetchMore)
      fetchMore({
        variables: {
          offset: len
        },
        updateQuery: (prev, { newset }) => {
          if (!newset) return prev;
          console.log("PREV: ", prev)
          console.log("FETCHED: ", newset)
          const data = Object.assign({}, prev, {
            recommendedRecipes: {
              total: prev.recommendedRecipes.total,
              results: [...prev.recommendedRecipes.results, ...newset.recommendedRecipes.results],
              __typename: prev.recommendedRecipes.__typename
            }
          })
          console.log("NEW DATA: ", data)
          return data
        }
      })
    }
  }

  render() {
    const { navigation } = this.props;
    const params = {
      shouldSwiperUpdate: true,
      // rebuildOnUpdate: true,
      wrapperClass: `${styles.wrapper}`,
      on: {
        'slideChange': () => {this.shouldLoadMore()}
      },
      ref: (node) => {if (node) this.swiper = node.swiper}
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
          fetchPolicy="cache-and-network"
        >
          {({ loading, error, data, fetchMore }) => {
            if (loading) return `Loading`;
            if (error) return `Error!: ${error}`;
            return (
              <div className={styles.contain}>
                <Swiper {...params} on={{'slideChange': () => {this.shouldLoadMore(data, fetchMore)}}}>
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
