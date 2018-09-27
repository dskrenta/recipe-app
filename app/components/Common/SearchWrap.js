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
import { iPhoneStyle } from '../../utils/iPhoneStyle';

class SearchWrap extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      showSearch: false,
      backIcon: false,
      fade: new Animated.Value(0)
    }
  }

  onFocus = () => {
    this.setState({ showSearch: true, backIcon: true });
    Animated.timing(this.state.fade, {
      toValue: 1,
      duration: 500
    }).start();
  }

  endSearch = () => {
    this.searchBar.blur();
    this.setState({ backIcon: false });
    Animated.timing(this.state.fade, {
      toValue: 0,
      duration: 500
    }).start(() => {
      this.setState({ showSearch: false })
    });
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
          <ScrollView style={styles.filterScroll}>
            <SearchFilters />
          </ScrollView>
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
  }
});

export default SearchWrap;
