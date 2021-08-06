import React from 'react';
import { View, Text, StyleSheet, AppRegistry, ScrollView } from 'react-native';
import { NativeRouter, Route, Link } from "react-router-native";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './pages/home';
import Daily from './pages/daily';
import Login from './pages/login';
import Jitsi from './pages/jitsi';
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const App = () => {
  return (
    <View>
      <Text>Hello</Text>
      <ScrollView>
        <Jitsi />
      </ScrollView>
    </View>
    // <NavigationContainer>
    //   <Stack.Navigator initialRouteName="Jitsi">
    //     <Stack.Screen name="Login" component={Login} options={{ title: 'Iniciar Sesión' }} />
    //     <Stack.Screen name="/testdiario" component={Daily} options={{ title: 'Declaración diaria' }} />
    //     <Stack.Screen name="Home" component={Home} options={{ title: 'Home' }} />
    //     <Stack.Screen name="Jitsi" component={Jitsi} options={{ title: 'Jitsi' }} />
    //   </Stack.Navigator>
    // </NavigationContainer>
    // <NativeRouter>
    //   <View style={styles.container}>
    //     <View style={styles.nav}>
    //       <Link to="/" underlayColor="#f0f4f7" style={styles.navItem}>
    //         <Text>Login</Text>
    //       </Link>
    //       <Link
    //         to="/Daily"
    //         underlayColor="#f0f4f7"
    //         style={styles.navItem}>
    //         <Text>Daily</Text>
    //       </Link>
    //       <Link
    //         to="/Jitsi"
    //         underlayColor="#f0f4f7"
    //         style={styles.navItem}>
    //         <Text>Jitsi</Text>
    //       </Link>
    //     </View>

    //     <Route exact path="/" component={Login} />
    //     <Route path="/Daily" component={Daily} />
    //     <Route path="/Jitsi" component={Jitsi} />
    //   </View>
    // </NativeRouter>
    // <NavigationContainer>
    //   <Tab.Navigator>
    //     <Tab.Screen name="Login" component={Login} />
    //     <Tab.Screen name="Home" component={Home} />
    //     <Tab.Screen name="/testdiario" component={Daily} />
    //     <Tab.Screen name="Jitsi" component={Jitsi} />
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