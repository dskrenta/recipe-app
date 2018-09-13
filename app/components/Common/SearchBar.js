import React from 'react';
import { View, Text, TouchableHighlight, StyleSheet, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class SearchBar extends React.Component {
  state = {
    value: ''
  }

  render() {
    const { navigation, autoFocus = false } = this.props;
    return (
      <View style={styles.contain}>
        <View
          style={styles.searchBar}
        >
          <Icon name="search" color="#2dc364" size={20} style={styles.icon}/>
          <TextInput 
            placeholder="Search Recipes"
            style={styles.input}
            value={this.state.value}
            onChangeText={(value) => {this.setState({ value })}} 
            autoFocus={autoFocus}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  contain: {
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
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2
  },
  icon: {
    marginRight: 15,
    marginLeft: 20
  },
  input: {
    flex: 1,
    height: 50
  }
});

export default SearchBar;