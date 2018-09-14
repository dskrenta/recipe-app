import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-navigation';

import SearchWrap from '../Common/SearchWrap';
import RecipeCard from '../Common/RecipeCard';

const Recommended = ({ navigation }) => (
  <SafeAreaView>
    <SearchWrap navigation={navigation}>
      <View style={styles.carouselContain}>
        <ScrollView
          style={styles.scrollView}
          showsHorizontalScrollIndicator={false}
          horizontal
          pagingEnabled
        >
          <RecipeCard />
        </ScrollView>
      </View>
    </SearchWrap>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  carouselContain: {
    flex: 1
  },
  scrollView: {
    flex: 1
  }
})

export default Recommended;