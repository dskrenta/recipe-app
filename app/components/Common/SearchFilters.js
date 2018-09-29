import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';

class SearchFilters extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      breakfast: false,
      lunch: false,
      dinner: false,
      snacks: false,
      time30: false,
      time60: false,
      time60p: false,
      serves2: false,
      serves4: false,
      serves6: false,
      serves8: false,
      calMin: 0,
      calMax: 2000
    }
  }

  render() {
    return (
      <View style={styles.filterContain}>
        <Text style={styles.filterTitle}>Sort by Course</Text>
        <View style={styles.filterRow}>
          <TouchableHighlight 
            style={[styles.filterToggle, this.state.snacks && {backgroundColor: '#92edb6'}]}
            onPress={() => {this.setState({ snacks: !this.state.snacks })}}
            underlayColor="#bef4d3"
          >
            <Text style={styles.toggleText}>Snacks</Text>
          </TouchableHighlight>
          <TouchableHighlight 
            style={[styles.filterToggle, this.state.breakfast && {backgroundColor: '#7ce9a8'}]}
            onPress={() => {this.setState({ breakfast: !this.state.breakfast })}}
            underlayColor="#bef4d3"
          >
            <Text style={styles.toggleText}>Breakfast</Text>
          </TouchableHighlight>
          <TouchableHighlight 
            style={[styles.filterToggle, this.state.lunch && {backgroundColor: '#66e599'}]}
            onPress={() => {this.setState({ lunch: !this.state.lunch })}}
            underlayColor="#bef4d3"
          >
            <Text style={styles.toggleText}>Lunch</Text>
          </TouchableHighlight>
          <TouchableHighlight 
            style={[styles.filterToggle, this.state.dinner && {backgroundColor: '#51e18b'}]}
            onPress={() => {this.setState({ dinner: !this.state.dinner })}}
            underlayColor="#bef4d3"
          >
            <Text style={styles.toggleText}>Dinner</Text>
          </TouchableHighlight>
        </View>
        <Text style={styles.filterTitle}>Sort by Time</Text>
        <View style={styles.filterRow}>
          <TouchableHighlight 
            style={[styles.filterToggle, this.state.time30 && {backgroundColor: '#92edb6'}]}
            onPress={() => {this.setState({ time30: !this.state.time30 })}}
            underlayColor="#bef4d3"
          >
            <Text style={styles.toggleText}>30 min</Text>
          </TouchableHighlight>
          <TouchableHighlight 
            style={[styles.filterToggle, this.state.time60 && {backgroundColor: '#7ce9a8'}]}
            onPress={() => {this.setState({ time60: !this.state.time60 })}}
            underlayColor="#bef4d3"
          >
            <Text style={styles.toggleText}>60 min</Text>
          </TouchableHighlight>
          <TouchableHighlight 
            style={[styles.filterToggle, this.state.time60p && {backgroundColor: '#66e599'}]}
            onPress={() => {this.setState({ time60p: !this.state.time60p })}}
            underlayColor="#bef4d3"
          >
            <Text style={styles.toggleText}>60+ min</Text>
          </TouchableHighlight>
        </View>
        <Text style={styles.filterTitle}>Sort by Servings</Text>
        <View style={styles.filterRow}>
          <TouchableHighlight 
            style={[styles.filterToggle, this.state.serves2 && {backgroundColor: '#92edb6'}]}
            onPress={() => {this.setState({ serves2: !this.state.serves2 })}}
            underlayColor="#bef4d3"
          >
            <Text style={styles.toggleText}>2</Text>
          </TouchableHighlight>
          <TouchableHighlight 
            style={[styles.filterToggle, this.state.serves4 && {backgroundColor: '#7ce9a8'}]}
            onPress={() => {this.setState({ serves4: !this.state.serves4 })}}
            underlayColor="#bef4d3"
          >
            <Text style={styles.toggleText}>4</Text>
          </TouchableHighlight>
          <TouchableHighlight 
            style={[styles.filterToggle, this.state.serves6 && {backgroundColor: '#66e599'}]}
            onPress={() => {this.setState({ serves6: !this.state.serves6 })}}
            underlayColor="#bef4d3"
          >
            <Text style={styles.toggleText}>6</Text>
          </TouchableHighlight>
          <TouchableHighlight 
            style={[styles.filterToggle, this.state.serves8 && {backgroundColor: '#51e18b'}]}
            onPress={() => {this.setState({ serves8: !this.state.serves8 })}}
            underlayColor="#bef4d3"
          >
            <Text style={styles.toggleText}>8+</Text>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  filterContain: {
    flex: 1,
    height: '100%',
    paddingTop: 20,
    paddingHorizontal: 35,
    paddingBottom: 50,
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
    marginTop: 5,
    color: '#333'
  },
  filterRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch',
    backgroundColor: '#d3f8e2',
    marginHorizontal: -35,
    marginBottom: 15
  },
  filterToggle: {
    flex: 1,
    paddingVertical: 15,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#d3f8e2'
  },
  toggleText: {
    color: '#333'
  }
})

export default SearchFilters;