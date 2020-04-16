import * as React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import CountryList from './src/components/CountryList';
import Home from './src/components/Home';
import Weather from './src/components/Weather';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Country" component={CountryList} />
        <Stack.Screen name="City" component={Weather} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
