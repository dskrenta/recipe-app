import React from 'react';
import { View, Text, ScrollView, TouchableHighlight, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-navigation';

import SearchWrap from '../Common/SearchWrap';

const { width } = Dimensions.get('window');

const Recommended = ({ navigation }) => (
  <SafeAreaView>
    <SearchWrap navigation={navigation}>
      <View style={styles.carouselContain}>
        <ScrollView
          contentContainerStyle={styles.scrollView}
          horizontal={true}
        >
          <Text>Recommended</Text>
          <Text>Recommended</Text>
          <Text>Recommended</Text>
          <Text>Recommended</Text>
          <Text>Recommended</Text>
          <Text>Recommended</Text>
          <Text>Recommended</Text>
          <Text>Recommended</Text>
          <Text>Recommended</Text>
          <Text>Recommended</Text>
          <Text>Recommended</Text>
          <Text>Recommended</Text>
          <Text>Recommended</Text>
          <Text>Recommended</Text>
          <Text>Recommended</Text>
          <Text>Recommended</Text>
          <Text>Recommended</Text>
          <Text>Recommended</Text>
          <Text>Recommended</Text>
          <Text>Recommended</Text>
          <Text>Recommended</Text>
          <Text>Recommended</Text>
          <Text>Recommended</Text>
          <Text>Recommended</Text>
          <Text>Recommended</Text>
          <Text>Recommended</Text>
          <Text>Recommended</Text>
          <Text>Recommended</Text>
          <Text>Recommended</Text>
          <Text>Recommended</Text>
          <Text>Recommended</Text>
          <Text>Recommended</Text>
          <Text>Recommended</Text>
          <Text>Recommended</Text>
          <Text>Recommended</Text>
          <Text>Recommended</Text>
          <Text>Recommended</Text>
          <Text>Recommended</Text>
          <Text>Recommended</Text>
          <Text>Recommended</Text>
          <Text>Recommended</Text>
          <Text>Recommended</Text>
          <Text>Recommended</Text>
          <Text>Recommended</Text>
          <Text>Recommended</Text>
          <Text>Recommended</Text>
          <Text>Recommended</Text>
          <Text>Recommended</Text>
          <Text>Recommended</Text>
          <Text>Recommended</Text>
          <Text>Recommended</Text>
          <Text>Recommended</Text>
        </ScrollView>
      </View>
    </SearchWrap>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  carouselContain: {
    width: '90%',
    height: '100%',
    backgroundColor: 'yellow'
  },
  scrollView: {
    width
  }
})

export default Recommended;