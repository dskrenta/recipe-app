import React from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableHighlight,
  StyleSheet,
  TextInput,
  Animated,
  Slider
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { iPhoneStyle } from '../../utils/iPhoneStyle';

class SearchWrap extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      showSearch: false,
      backIcon: false,
      fade: new Animated.Value(0),
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
              <Slider minimumValue={0} maximumValue={2000} />
            </View>
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
  filterContain: {
    flex: 1,
    height: '100%',
    padding: 20,
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
    marginHorizontal: -20,
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
