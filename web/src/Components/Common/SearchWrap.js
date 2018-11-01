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
    this.setState({ showResults: true });
    e.preventDefault();
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
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className={styles.searchContain}>
            {this.state.showSearch
              ? <button
                  onClick={this.handleBack}
                  className={styles.searchButton}
                >
                  <FaArrowLeft />
                </button>
              : <button className={styles.searchButton}>
                  <FaSearch />
                </button>
            }
            <input
              className={styles.searchBar}
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
              onFocus={this.handleFocus}
            />
            {this.state.value !== '' &&
              <button
                onClick={this.handleClear}
                className={styles.searchButton}
              >
                <FaTimesCircle />
              </button>
            }
          </div>
        </form>
        <div>
          {this.state.showSearch &&
            <div>
              SEARCH
              {this.state.showResults &&
                <div>RESULTS</div>
              }
            </div>
          }
        </div>
        <div className={styles.children}>
          {children}
        </div>
      </div>
    )
  }
}

export default SearchWrap
