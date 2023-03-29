import React, { Component } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import StackNavigator from "./stackNavigation";
import Profile from "../screens/Profile";
import Logout from "../screens/logout";
import CustonBar from "../screens/CustonBar";
import firebase from "firebase";

const Drawer = createDrawerNavigator();

export default class DrawerNavigator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      light_theme: true,
    };
  }
  componentDidMount() {
    this.fetchUser();
  }
  fetchUser = () => {
    var theme;
    firebase
      .database()
      .ref("/users/" + firebase.auth().currentUser.uid)
      .on("value", (data) => {
        theme = data.val().current_theme;
        this.setState({
          light_theme: theme === "light",
        });
      });
  };
  render() {
    let props = this.props;
    return (
      <Drawer.Navigator
        screenOptions={{ headerShown: true }}
        drawerContentOptions={{
          activeTintColor: "#e91e63",
          inactiveTintColor: this.state.light_theme ? "black" : "white",
          itemStyle: { marginVertical: 5 },
        }}
        drawerContent={(props) => <CustonBar {...props} />}
      >
        <Drawer.Screen
          name="Home"
          component={StackNavigator}
          options={{ unmountOnBlur: true }}
        />
        <Drawer.Screen
          name="Profile"
          component={Profile}
          options={{ unmountOnBlur: true }}
        />
        <Drawer.Screen
          name="logout"
          component={Logout}
          options={{ unmountOnBlur: true }}
        />
      </Drawer.Navigator>
    );
  }
}
