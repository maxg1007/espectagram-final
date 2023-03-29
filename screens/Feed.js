import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { FlatList } from "react-native-gesture-handler";
import PostCard from "./PostCard";

import firebase from "firebase";

let posts = require("./temp_posts.json");

export default class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      light_theme: true,
      posts: [],
    };
  }

  renderItem = ({ item: post }) => {
    return <PostCard post={post} navigation={this.props.navigation} />;
  };

  keyExtractor = (item, index) => index.toString();

  componentDidMount() {
    this.fetchUser();
    this.fetchPosts();
  }

  async fetchUser() {
    let theme;
    await firebase
      .database()
      .ref("/users/" + firebase.auth().currentUser.uid)
      .on("value", (data) => {
        theme = data.val().current_theme;
        this.setState({
          light_theme: theme == "light",
        });
      });
  }

  fetchPosts = () => {
    firebase
      .database()
      .ref("/posts/")
      .on(
        "value",
        (snapshot) => {
          let posts = [];
          if (snapshot.val()) {
            Object.keys(snapshot.val()).forEach(function (key) {
              posts.push({
                key: key,
                value: snapshot.val()[key],
              });
            });
          }
          console.log("codigo passou por aqui");
          this.setState({ posts: posts });
          console.log(this.state.posts);
          // this.props.setUpdateToFalse();
        },
        function (errorObject) {
          console.log("A leitura falhou: " + errorObject.code);
        }
      );
  };

  render() {
    return (
      <View
        style={
          this.state.light_theme ? styles.containerLight : styles.container
        }
      >
        <SafeAreaView style={styles.droidSafeArea} />
        <View style={styles.appTitle}>
          <View styles={styles.appIcon}>
            <Image
              source={require("../assets/logo.png")}
              style={styles.iconImage}
            />
          </View>
          <View style={styles.appTitleTextContainer}>
            <Text
              style={
                this.state.light_theme
                  ? styles.appTitleTextLight
                  : styles.appTitleText
              }
            >
              Espectagrama
            </Text>
          </View>
        </View>

        {!this.state.posts[0] ? (
          <View>
            <Text>nenhum post disponivel</Text>
          </View>
        ) : (
          <View style={styles.cardContainer}>
            <FlatList
              keyExtractor={this.keyExtractor}
              data={this.state.posts}
              renderItem={this.renderItem}
            />
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  containerLight: {
    flex: 1,
    backgroundColor: "white",
  },
  droidSafeArea: {
    marginTop:
      Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35),
  },
  appTitle: {
    flex: 0.07,
    flexDirection: "row",
  },
  appIcon: {
    flex: 0.2,
    justifyContent: "center",
    alignItems: "center",
  },
  iconImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  appTitleTextContainer: {
    flex: 0.8,
    justifyContent: "center",
  },
  appTitleText: {
    color: "white",
    fontSize: RFValue(28),
  },
  appTitleTextLight: {
    color: "black",
    fontSize: RFValue(28),
  },
  cardContainer: {
    flex: 0.85,
  },
});
