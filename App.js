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
    // <NativeRouter>
    //   <Route exact path="/" component={Login} />
    //   <Route path="/Daily" component={Daily} />
    // </NativeRouter>
    // <NavigationContainer>
    //   <Tab.Navigator>
    //     <Tab.Screen name="Login" component={Login} />
    //     <Tab.Screen name="Home" component={Home} />
    //     <Tab.Screen name="Daily" component={Daily} />
    //   </Tab.Navigator>
    // </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f2f2f2"
  },
  header: {
    fontSize: 20
  },
  nav: {
    flexDirection: "row",
    justifyContent: "space-around"
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    padding: 10
  },
  subNavItem: {
    padding: 5
  },
  topic: {
    textAlign: "center",
    fontSize: 15
  }
});


// AppRegistry.registerComponent("MyApp", () => App);
export default App;