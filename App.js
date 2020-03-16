/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text, TextInput,
  StatusBar, Button
} from 'react-native';
import SignIn from './SignIn'
import {
  Colors
} from 'react-native/Libraries/NewAppScreen';
import SignUp from './SignUp'
import Home from './Home'

const Stack = createStackNavigator();
const App: () => React$Node = () => {
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignIn">
        <Stack.Screen name="SignIn" options={{title:'Sign In'}} component={SignIn} />
        <Stack.Screen name="Home" options={{title:'Send Email'}} component={Home} />
        <Stack.Screen name="SignUp" options={{title:'Sign Up'}} component={SignUp} />
      </Stack.Navigator>
    </NavigationContainer>
     
  );
};
 
const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  }
});

export default App;
