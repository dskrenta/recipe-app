import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight, ScrollView, TextInput, AsyncStorage } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFa from 'react-native-vector-icons/FontAwesome';

import SearchWrap from '../Common/SearchWrap';

OLDlist = [
  '10 to 12 cups reduced-sodium or homemade chicken broth*',
  '1 medium onion, chopped (about 1 1/2 cups)',
  '2 1/2 cups risotto rice (see note)',
  '3/4 cup dry white wine',
  '1/2 cup freshly grated parmesan cheese, plus more for serving',
  '1/4 cup chopped flat-leaf parsley'
]

class ShoppingList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [],
      checks: Array(1).fill(0),
      value: ''
    }

    console.log(this.state.list)
  }

  componentDidMount() {
    this.didFocusSubscription = this.props.navigation.addListener(
      'didFocus',
      () => {this.getList()}
    );
  }

  componentWillUnmount() {
    this.didFocusSubscription.remove();
  }

  getList = async () => {
    let list = [];
    let checks = [];
    const [lis, che] = await AsyncStorage.multiGet(['shoppingList', 'shoppingChecks']);
    if (lis !== null && lis[1] !== null) list = JSON.parse(lis[1]);
    if (che !== null && che[1] !== null) checks = JSON.parse(che[1]);
    this.setState({ list: list, checks: checks });
  }

  toggleCheck = async (i) => {
    const newChecks = this.state.checks;
    newChecks[i] = !newChecks[i];
    this.setState({ checks: newChecks });
    await AsyncStorage.setItem('shoppingChecks', JSON.stringify(newChecks), (e) => {console.log(e)})
  }

  delete = async (i) => {
    const newChecks = this.state.checks;
    const newList = this.state.list;
    newChecks.splice(i,1);
    newList.splice(i,1);
    this.setState({ checks: newChecks, list: newList });
    await AsyncStorage.multiSet([
      ['shoppingList', JSON.stringify(newList)], 
      ['shoppingChecks', JSON.stringify(newChecks)]], 
      (e) => {console.log(e)}
    )
  }

  addItem = async () => {
    const newList = [...this.state.list, this.state.value];
    const newChecks = [...this.state.checks, 0];
    this.setState({
      checks: newChecks,
      list: newList,
      value: ''
    });
    console.log(newList);
    await AsyncStorage.setItem('shoppingList', JSON.stringify(newList), (e) => {console.log(e)})
  }

  render() {
    const { navigation } = this.props;
    console.log(this.state.list)
    return (
      <SafeAreaView>
        <SearchWrap>
          <View style={styles.contain}>
            <View style={styles.titleContain}>
              <Text style={styles.title}>Shopping List</Text>
            </View>
            <ScrollView style={styles.scrollView}>
              <View style={styles.innerScroll}>
                {(this.state.list.length > 0) && this.state.list.map((item, i) => (
                  <View key={i} style={styles.item}>
                    <TouchableHighlight
                      onPress={() => {this.toggleCheck(i)}}
                      underlayColor="transparent"
                      style={{flex: 1}}
                    >
                      <View style={styles.checkbox}>
                        <Icon
                          name={this.state.checks[i] ? "checkbox-marked" : "checkbox-blank-outline"}
                          color={this.state.checks[i] ? '#2c6' : '#333'}
                          size={20}
                        />
                        <View style={styles.itemTextContain}>
                          <Text style={[styles.itemText, this.state.checks[i] && {textDecorationLine: 'line-through', color: '#1a5'}]}>{item}</Text>
                        </View>
                      </View>
                    </TouchableHighlight>
                    <TouchableHighlight
                      onPress={() => {this.delete(i)}}
                      underlayColor="transparent"
                      style={styles.delete}
                    >
                      <Icon name="close" color="#888" size={15} />
                    </TouchableHighlight>
                  </View>
                ))}
              </View>
            </ScrollView>
            <View style={styles.inputContain}>
              <View style={styles.searchBox}>
                <TextInput
                  placeholder="Add Ingredient"
                  style={styles.addInput}
                  value={this.state.value}
                  onChangeText={(value) => {this.setState({ value })}}
                  onSubmitEditing={this.addItem}
                  underlineColorAndroid="transparent"
                />
                <TouchableHighlight
                  onPress={this.addItem}
                  underlayColor="transparent"
                >
                  <IconFa name="plus" color="#2c6" size={20} style={styles.add}/>
                </TouchableHighlight>
              </View>
            </View>
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
  innerScroll: {
    paddingTop: 10,
    paddingBottom: 15
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  checkbox: {
    paddingLeft: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  itemTextContain: {
    flex: 1,
    paddingLeft: 20
  },
  itemText: {
    fontSize: 16,
    lineHeight: 19
  },
  delete: {
    paddingLeft: 15,
    paddingVertical: 2.5,
    paddingRight: 20
  },
  inputContain: {
    width: '100%',
    height: 75,
    padding: 15,
    paddingBottom: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee'
  },
  searchBox: {
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
    elevation: 2,
    paddingLeft: 20
  },
  add: {
    marginHorizontal: 25,
    marginVertical: 10
  },
  addInput: {
    flex: 1,
    paddingVertical: 10
  }
});

export default ShoppingList;
