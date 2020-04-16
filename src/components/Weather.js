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

export default class Weather extends React.Component {
  state = {
    city: '',
    weather: null,
    error: '',
  };

  componentDidMount = async () => {
    const {city} = this.props.route.params;
    this.setState({city});
    let repsonse = await this.fetchWeather(city);
    if ('message' in repsonse) {
      this.setState({error: repsonse.message});
    } else {
      this.setState({weather: repsonse.current});
    }

    //console.log(repsonse.status);
  };

  fetchWeather = async (city) => {
    const response = await fetch(
      'http://api.weatherstack.com/current?access_key=2bb89e1f651526ef3b9dbca8f97d114f&query=' +
        city,
      {},
    );
    console.log(response.json());
    const json = await response.json();
    return json;
  };

  render() {
    const {city, error, weather} = this.state;
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <View>{error !== '' && <Text>{error}</Text>}</View>
          <Text>City :{city}</Text>
          {weather != null && (
            <>
              <Text>Temperature :{weather.temperature.toString()}</Text>
              <Text>Wind_speed: {weather.wind_speed.toString()}</Text>
              <Text>Precip: {weather.precip.toString()}</Text>
            </>
          )}
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
