import React from 'react';
import { View, Text, StyleSheet, AppRegistry } from 'react-native';
import { NativeRouter, Route, Link } from "react-router-native";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './pages/home';
import Login from './pages/login';
import Video from './pages/jitsi';
import Daily from './pages/daily';
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const App = () => {
  return (
    <Video />
    // <NavigationContainer>
    //   <Stack.Navigator initialRouteName="Video">
    //     <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
    //     <Stack.Screen name="/testdiario" component={Daily} options={{ title: 'Declaración diaria' }} />
    //     <Stack.Screen name="Home" component={Home} options={{ title: 'Home' }} />
    //     <Stack.Screen name="Video" component={Video} options={{ title: 'Video' }} />
    //   </Stack.Navigator>
    // </NavigationContainer>
    // <NavigationContainer>
    //   <Tab.Navigator>
    //     <Tab.Screen name="Login" component={Login} />
    //     <Tab.Screen name="Home" component={Home} />
    //     <Tab.Screen name="Daily" component={Daily} />
    //   </Tab.Navigator>
    // </NavigationContainer>
  )
}

// AppRegistry.registerComponent("MyApp", () => App);
export default App;