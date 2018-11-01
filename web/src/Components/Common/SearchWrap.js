import React from 'react';
import { FaSearch, FaArrowLeft, FaTimesCircle } from 'react-icons/fa';

import styles from './SearchWrap.module.css';

class SearchWrap extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      showSearch: false,
      showResults: false
    }
  }

  handleChange = (e) => {
    this.setState({ value: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ showSearch: true, showResults: true });
  }

  handleFocus = () => {
    this.setState({ showSearch: true });
  }

  handleBack = () => {
    this.setState({ showSearch: false, showResults: false, value: '' })
  }

  handleClear = () => {
    this.setState({ value: '' })
  }

  render() {
    const { children } = this.props;
    return (
      <div className={styles.contain}>
        <form onSubmit={this.handleSubmit}>
          <div className={styles.searchContain}>
            {this.state.showSearch
              ? <button
                  onClick={this.handleBack}
                  className={styles.backButton}
                >
                  <FaArrowLeft color="#2c6" size={20} />
                </button>
              : <button className={styles.backButton}>
                  <FaSearch color="#2c6" size={20} />
                </button>
            }
            <input
              className={styles.searchBar}
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
              onFocus={this.handleFocus}
              placeholder="Search Recipes"
            />
            <button
              onClick={this.handleClear}
              className={styles.clearButton}
              style={{ opacity: this.state.value !== '' ? 1 : 0 }}
            >
              <FaTimesCircle />
            </button>
          </div>
        </form>
        {this.state.showSearch &&
          <div className={styles.resultsContainer}>
            SEARCH
            {this.state.showResults &&
              <div className={styles.resultsContain}>RESULTS</div>
            }
          </div>
        }
        <div className={styles.children}>
          {children}
        </div>
      </div>
    )
  }
}

export default SearchWrap
