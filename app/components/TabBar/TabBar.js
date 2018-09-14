import React from 'react';
import { View, TouchableHighlight, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { iPhoneStyle } from '../../utils/iPhoneStyle';

const tabs = [
  {
    name: 'Random',
    icon: 'question-circle-o',
    activeIcon: 'question-circle'
  },
  {
    name: 'Recommended',
    icon: 'star-o',
    activeIcon: 'star'
  },
  {
    name: 'Saved',
    icon: 'bookmark-o',
    activeIcon: 'bookmark'
  }
];

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
            <Icon 
              name={activeRoute === tab.name ? tab.activeIcon : tab.icon} 
              color={activeRoute === tab.name ? '#2c6' : '#aaa'}
              size={30}
              style={{marginBottom: 3}}
            />
            <Text style={{color: activeRoute === tab.name ? '#2c6' : '#aaa'}}>{tab.name}</Text>
          </View>
        </TouchableHighlight>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  contain: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: 60,
    marginBottom: iPhoneStyle(20, 0, 0)
  },
  tab: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default TabBar;