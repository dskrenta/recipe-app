import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Loading = () => (
  <View style={styles.contain}>
    <Icon name="book" size={40} color="#2c6" style={styles.icon} />
    <Text style={styles.text}>Looking through Cookbook...</Text>
  </View>
)

const styles = StyleSheet.create({
  contain: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 100
  },
  icon: {
    marginBottom: 20
  },
  text: {
    fontSize: 20,
    color: "#666"
  }
})

export default Loading;
