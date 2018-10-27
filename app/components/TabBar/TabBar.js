import React from 'react';
import { View, TouchableHighlight, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import { iPhoneStyle } from '../../utils/iPhoneStyle';

const tabs = [
  {
    name: 'Recipes',
    icon: 'clipboard-list'
  },
  {
    name: 'ShoppingList',
    icon: 'shopping-cart'
  },
  {
    name: 'Saved',
    icon: 'bookmark'
  }
];

/*
  {
    name: 'Random',
    icon: 'question-circle'
  }, 
*/

const TabBar = ({ navigation }) => {
  const activeRoute = navigation.state.routes[navigation.state.index].routeName;
  return (
    <View style={styles.contain}>
      {tabs.map((tab, i) => (
        <TouchableHighlight
          key={i}
          onPress={() => (navigation.navigate(tab.name))}
          underlayColor="transparent"
          style={{width: '33%'}}
        >
          <View
            style={styles.tab}
          >
            {i === 2
              ? <Icon
                  name={tab.icon}
                  color={activeRoute === tab.name ? '#2c6' : '#aaa'}
                  size={33}
                  style={{marginBottom: 3}}
                />
              : <Icon5
                  name={tab.icon}
                  color={activeRoute === tab.name ? '#2c6' : '#aaa'}
                  size={30}
                  style={{marginBottom: 3}}
                />
            }
          </View>
        </TouchableHighlight>
      ))}
    </View>
  );
};

{/*<Text style={{color: activeRoute === tab.name ? '#2c6' : '#aaa'}}>{tab.name}</Text>*/}

const styles = StyleSheet.create({
  contain: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: 60,
    marginBottom: iPhoneStyle(20, 5, 5),
    paddingHorizontal: 0
  },
  tab: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default TabBar;
