import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import SearchWrap from '../Common/SearchWrap';

list = [
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
]

class ShoppingList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      list: list,
      checks: Array(list.length).fill(0)
    }
  }

  toggleCheck = (i) => {
    const newChecks = this.state.checks;
    newChecks[i] = !newChecks[i];
    this.setState({ checks: newChecks });
  }

  delete = (i) => {
    const newChecks = this.state.checks;
    const newList = this.state.list;
    newChecks.splice(i,i);
    newList.splice(i,i);
    this.setState({ checks: newChecks, list: newList });
  }

  render() {
    const { navigation } = this.props;
    return (
      <SafeAreaView>
        <SearchWrap>
          <View style={styles.contain}>
            <View style={styles.titleContain}>
              <Text style={styles.title}>Shopping List</Text>
            </View>
            <ScrollView style={styles.scrollView}>
              {this.state.list.map((item, i) => (
                <View key={i} style={styles.item}>
                  <TouchableHighlight
                    onPress={() => {this.toggleCheck(i)}}
                    underlayColor="transparent"
                    style={styles.checkbox}
                  >
                    <Icon 
                      name={this.state.checks[i] ? "checkbox-marked" : "checkbox-blank-outline"} 
                      color={this.state.checks[i] ? '#2c6' : '#333'} 
                      size={20} 
                    />
                  </TouchableHighlight>
                  <View style={styles.itemTextContain}>
                    <Text style={styles.itemText}>{item}</Text>
                  </View>
                  <TouchableHighlight
                    onPress={() => {this.delete(i)}}
                    underlayColor="transparent"
                    style={styles.delete}
                  >
                    <Icon name="close" color="#aaa" size={15} />
                  </TouchableHighlight>
                </View>
              ))}
            </ScrollView>
          </View>
        </SearchWrap>
      </SafeAreaView>
    )
  }
};

const styles = StyleSheet.create({
  contain: {
    paddingTop: 10,
    flex: 1
  },
  titleContain: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 20,
    paddingHorizontal: 20
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  scrollView: {
    paddingTop: 10
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  checkbox: {
    paddingRight: 15,
    paddingLeft: 20
  },
  itemTextContain: {
    flex: 1,
  },
  itemText: {
    fontSize: 16,
    lineHeight: 19
  },
  delete: {
    paddingLeft: 15,
    paddingVertical: 2.5,
    paddingRight: 20
  }
});

export default ShoppingList;