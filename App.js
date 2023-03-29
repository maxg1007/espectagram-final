import * as React from "react";
import DrawerNavigator from "./navigation/DrawerNavigation";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./screens/login";
import RegisterScreen from "./screens/register";
import { createStackNavigator } from "@react-navigation/stack";
import firebase from "firebase";
import { firebaseConfig } from "./config";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

const Stack = createStackNavigator();

const StackNavi = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="dashBoard" component={DrawerNavigator} />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <StackNavi></StackNavi>
    </NavigationContainer>
  );
}
