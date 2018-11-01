import React from 'react';
import { FaBookmark } from 'react-icons/fa';

import styles from './RecipeCard.module.css';
import recipeImage from '../../utils/recipeImage';
import recipeHash from '../../utils/recipeHash';

class RecipeCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      saved: false
    }
  }

  checkSaved = async () => {
    let saved, value = false;
    // const value = await AsyncStorage.getItem(recipeHash(this.props.recipe));
    if (value !== null) saved = JSON.parse(value);
    this.setState({ saved });
  }
  
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
      <div className={styles.bottomItem}>
        <span className={styles.statText}>{difficulty}</span>
        <span className={styles.statSpan}>Difficulty</span>
      </div>
    )
  }

  toggleSave = async () => {
    // const value = await AsyncStorage.getItem(recipeHash(this.props.recipe));
    let value;
    if (value === 'true') {
      this.setState({ saved: false });
      //await AsyncStorage.removeItem(recipeHash(this.props.recipe));
    }
    else {
      this.setState({ saved: true });
      //await AsyncStorage.setItem(recipeHash(this.props.recipe), 'true');
    }
  }

  render() {
    const { navigation, recipe } = this.props;
    return (
      <div className={styles.contain}>
        <div className={styles.overflow}>
          {recipe.image &&
            <div className={styles.imageContain}>
              <img src={recipeImage(recipe.image)} className={styles.image} />
              <button 
                className={styles.saveContain}
                onClick={() => {this.toggleSave()}}
              >
                <div>
                  {this.state.saved == true
                    ? <FaBookmark size={30} color="#4da6ff" className={styles.savedIcon} />
                    : <FaBookmark size={30} color="#fff" className={styles.saveIcon} />
                  }
                </div>
              </button>
              {recipe.rating &&
                <div className={styles.ratingContain}>
                  <div className={styles.ratingRow}>
                    <FaBookmark name="star" size={25} color="orange" />
                    <span className={styles.ratingText}>{recipe.rating}</span>
                  </div>
                </div>
              }
            </div>
          }
          <div className={styles.titleContain}>
            <span className={styles.title}>{recipe.title}</span>
            <div className={styles.titleSubrow}>
              {recipe.course &&
                <div className={styles.courseTag}>
                  <span className={styles.course}>{recipe.course}</span>
                </div>
              }
              {recipe.cuisine &&
                <span className={styles.cuisine}>{recipe.cuisine} Cuisine</span>
              }
            </div>
          </div>
          <div className={styles.bottomRow}>
            {recipe.totalTime &&
              <div className={styles.bottomItem}>
                <span className={styles.statText}>{recipe.totalTime}</span>
                <span className={styles.statSpan}>Minutes</span>
              </div>
            }
            {recipe.servings &&
              <div className={styles.bottomItem}>
                <span className={styles.statText}>{recipe.servings}</span>
                <span className={styles.statSpan}>Servings</span>
              </div>
            }
            {recipe.nutrition 
              ? recipe.nutrition.calories &&
                  <div className={styles.bottomItem}>
                    <span className={styles.statText}>{recipe.nutrition.calories}</span>
                    <span className={styles.statSpan}>Calories</span>
                  </div>
              : this.renderDifficulty(recipe)
            }
          </div>
          {recipe.description &&
            <div className={styles.descContain}>
              <span className={styles.descTitle}>Description</span>
              <span numberOfLines={3} className={styles.descText}>{recipe.description}</span>
            </div>
          }
        </div>
      </div>
    )
  }
}

export default RecipeCard;