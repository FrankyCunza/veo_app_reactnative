import React from 'react';
import { View, Text, StyleSheet, AppRegistry } from 'react-native';
import { NativeRouter, Route, Link } from "react-router-native";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './pages/home';
import Daily from './pages/daily';
import Login from './pages/login';
const Tab = createBottomTabNavigator();

const App = () => {
  return (
    // <NativeRouter>
    //   <View style={styles.container}>
    //     <View style={styles.nav}>
    //       <Link to="/" underlayColor="#f0f4f7" style={styles.navItem}>
    //         <Text>Login</Text>
    //       </Link>
    //       <Link
    //         to="/daily"
    //         underlayColor="#f0f4f7"
    //         style={styles.navItem}
    //       >
    //         <Text>Daily</Text>
    //       </Link>
    //     </View>

    //     <Route exact path="/" component={Login} children />
    //     <Route path="/daily" component={Daily} />
    //   </View>
    // </NativeRouter>
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Search" component={Search} />
        <Tab.Screen name="Compare" component={Compare} />
      </Tab.Navigator>
    </NavigationContainer>
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