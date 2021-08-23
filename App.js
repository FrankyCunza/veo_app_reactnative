import React from 'react';
import { View, Text, StyleSheet, AppRegistry } from 'react-native';
import { NativeRouter, Route, Link } from "react-router-native";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Home from './pages/home';
import Login from './pages/login';
import Video from './pages/jitsi';
import Daily from './pages/daily';
import Profile from './pages/profile';
import Protocols from './pages/prococols';
import SliderProtocols from './pages/sliderProtocols';
import Informed from './pages/informed';
import categoriesInformed from './pages/categoriesInformed';
import contentInformed from './pages/contentInformed';
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const App = () => {
  return (
    // <Video />
    <NavigationContainer>
      <SafeAreaProvider>
        <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown: false}}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="/testdiario" component={Daily} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="/consulta" component={Video} />
          <Stack.Screen name="/profile" component={Profile} />
          <Stack.Screen name="/protocols" component={Protocols} />
          <Stack.Screen name="/sliderprotocols" component={SliderProtocols} />
          <Stack.Screen name="/getinformed" component={Informed} />
          <Stack.Screen name="/categoriesgetinformed" component={categoriesInformed} />
          <Stack.Screen name="/contentInformed" component={contentInformed} />
        </Stack.Navigator>
      </SafeAreaProvider>
    </NavigationContainer>
    // <NavigationContainer>
    //   <Tab.Navigator>
    //     <Tab.Screen name="Login" component={Login} options={{ headerShown: false }}  />
    //     <Tab.Screen name="Home" component={Home} />
    //     <Tab.Screen name="Daily" component={Daily} />
    //   </Tab.Navigator>
    // </NavigationContainer>
  )
}

// AppRegistry.registerComponent("MyApp", () => App);
export default App;