//api key 2bb89e1f651526ef3b9dbca8f97d114f
//http://api.weatherstack.com/current?access_key=2bb89e1f651526ef3b9dbca8f97d114f&query=New%20York

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  Button,
  View,
  Text,
  StatusBar,
} from 'react-native';

export default class Home extends React.Component {
  state = {
    text: '',
  };
  onChangeText = (text) => {
    this.setState({text});
  };
  render() {
    const {navigate} = this.props.navigation;

    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <View>
            <TextInput
              multiline
              placeholder={'Enter country'}
              style={styles.textInput}
              numberOfLines={4}
              onChangeText={(text) => this.onChangeText(text)}
              value={this.state.text}
            />
            <View style={styles.btn}>
              <Button
                disabled={!this.state.text.length > 0}
                onPress={() => navigate('Country', {country: this.state.text})}
                title="Get Country"
              />
            </View>
          </View>
        </SafeAreaView>
      </>
    );
  }
}
const styles = StyleSheet.create({
  btnText: {
    fontWeight: 'bold',
    color: 'green',
  },
  btn: {
    backgroundColor: 'orange',
    display: 'flex',
    borderRadius: 20,
    justifyContent: 'center', // height:40,
    width: 200,
    alignSelf: 'center',
    marginTop: 50,
    padding: 5,
  },
  textInput: {
    marginTop: 50,
    alignSelf: 'center',
    width: 200,
    textAlign: 'center',
    height: 50,
    borderRadius: 10,
    //elevation: 5,
    backgroundColor: 'white',
    shadowColor: 'white',
    shadowRadius: 5,
    shadowOpacity: 1,
  },
});
