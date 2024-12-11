// App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "./components/SplashScreen";
import Home from "./components/Home";
import DetailsScreen from "./components/DetailsScreen";
import SearchScreen from "./components/SearchScreen ";
import { ShowProvider } from "./context/ShowContext";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <ShowProvider>
        <Tab.Navigator>
          <Tab.Screen
            name="Splash"
            component={SplashScreen}
            options={{ headerShown: false }}
          />
          <Tab.Screen
            name="Home"
            component={Home}
            options={{ title: "Home" }}
          />
          <Tab.Screen
            name="Search"
            component={SearchScreen}
            options={{ title: "Search" }}
          />
          <Tab.Screen
            name="Details"
            component={DetailsScreen}
            options={{ title: "Details" }}
          />
        </Tab.Navigator>
      </ShowProvider>
    </NavigationContainer>
  );
}

export default App;
