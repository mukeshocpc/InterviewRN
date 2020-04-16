//api key 2bb89e1f651526ef3b9dbca8f97d114f
//http://api.weatherstack.com/current?access_key=2bb89e1f651526ef3b9dbca8f97d114f&query=New%20York

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Image,
  TextInput,
  Dimensions,
  FlatList,
  TouchableHighlight,
  View,
  Text,
  StatusBar,
} from 'react-native';
const {height, width} = Dimensions.get('window');
//https://restcountries.eu/rest/v2/name/india

export default class CountryList extends React.Component {
  state = {
    selected_country: '',
    country: [],
    error: '',
  };

  componentDidMount = async () => {
    const {country} = this.props.route.params;
    this.setState({selected_country: country});
    let repsonse = await this.fetchCountry(country);
    if ('message' in repsonse) {
      this.setState({error: repsonse.message});
    } else {
      this.setState({country: repsonse});
    }

    //console.log(repsonse.status);
  };

  fetchCountry = async (country) => {
    const response = await fetch(
      'https://restcountries.eu/rest/v2/name/' + country,
      {},
    );
    const json = await response.json();
    return json;
  };

  onItemClick = (item, index) => {
    const {navigate} = this.props.navigation;
    navigate('City', {city: item.capital});
  };

  render() {
    const {country, error} = this.state;
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <View>{error !== '' && <Text>{error}</Text>}</View>
          <FlatList
            data={country}
            style={{height: 700}}
            renderItem={({item, index}) => (
              <TouchableHighlight
                underlayColor="orange"
                style={styles.itemContainer}
                onPress={(item) => this.onItemClick(item, index)}>
                <>
                  <Image
                    style={{width: 100, height: 100, resizeMode: 'stretch'}}
                    source={{uri: item.flag}}
                  />
                  <View>
                    <Text style={styles.title}>Name :{item.name}</Text>
                    <Text style={styles.title}>
                      Population : {item.population}
                    </Text>

                    <Text style={styles.title}>
                      Capital :<Text style={styles.url}> {item.capital} </Text>
                    </Text>
                    <Text style={styles.title}>
                      Latlng :
                      <Text style={styles.url}> {item.latlng.toString()} </Text>
                    </Text>
                  </View>
                </>
              </TouchableHighlight>
            )}
            keyExtractor={(item, index) => String(index)}
            ListHeaderComponent={this.renderHeader}
            ListFooterComponent={this.renderFooter}
            onEndReached={this.retrieveMore}
            onEndReachedThreshold={5}
            refreshing={this.state.refreshing}
            //stickyHeaderIndices={[0]}
          />
        </SafeAreaView>
      </>
    );
  }
}

// Styles
const styles = StyleSheet.create({
  container: {
    height: height,
    width: width,
  },
  headerText: {
    fontFamily: 'System',
    fontSize: 36,
    fontWeight: '600',
    color: '#000',
    marginLeft: 12,
    marginBottom: 12,
    marginTop: 20,
  },

  itemContainer: {
    padding: 10,
    margin: 10,
    display: 'flex',

    justifyContent: 'space-between',
    flexDirection: 'row',
    fontSize: 22,
    fontWeight: 'bold',
    backgroundColor: '#eee',
    textAlign: 'center',
    color: 'red',
    borderRadius: 10,
    borderColor: 'red',
  },
  text: {
    fontFamily: 'System',
    fontSize: 17,
    fontWeight: '400',
    color: '#000',
  },
  title: {
    fontFamily: 'System',
    fontWeight: 'bold',
    fontSize: 14,
    fontWeight: '700',
    color: '#000',
  },
  url: {
    fontFamily: 'System',
    fontWeight: 'bold',
    fontSize: 14,
    fontWeight: '700',
    color: 'blue',
  },
  header: {
    display: 'flex',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    flexDirection: 'row',
    fontFamily: 'System',
    fontWeight: 'bold',
    fontSize: 14,
    fontWeight: '700',
    color: '#000',
  },

  btnText: {
    fontWeight: 'bold',
    color: 'green',
  },
  btn: {
    display: 'flex',
    justifyContent: 'center',
    // height:40,
    marginTop: 20,
    padding: 20,
  },
  textInput: {
    alignSelf: 'center',
    width: 140,
    textAlign: 'center',
    height: 40,
    borderRadius: 10,
    elevation: 5,
    backgroundColor: 'white',
    shadowColor: 'white',
    shadowRadius: 10,
    shadowOpacity: 1,
  },
});
