import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  TouchableOpacity,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import Ionicons from "react-native-vector-icons/Ionicons";
import firebase from "firebase";

export default class PostCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      light_theme: true,
      post_id: this.props.post.key,
      post_data: this.props.post.value,
    };
  }

  componentDidMount() {
    this.fetchUser();
  }
  async fetchUser() {
    let theme;
    await firebase
      .database()
      .ref("/users/" + firebase.auth().currentUser.uid + "/")
      .on("value", (data) => {
        theme = data.val().current_theme;
        this.setState({
          light_theme: theme == "light",
        });
      });
  }

  render() {
    let post = this.state.post_data;
    let images = {
      image1: require("../assets/image_1.jpg"),
      image2: require("../assets/image_2.jpg"),
      image3: require("../assets/image_3.jpg"),
      image4: require("../assets/image_4.jpg"),
      image5: require("../assets/image_5.jpg"),
      image6: require("../assets/image_6.jpg"),
      image7: require("../assets/image_7.jpg"),
    };
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          this.props.navigation.navigate("PostScreen", {
            post: post,
            post_id: this.state.post_id,
          });
        }}
      >
        <View
          style={
            this.state.light_theme
              ? styles.cardContainerLight
              : styles.cardContainer
          }
        >
          <View style={styles.authorContainer}>
            <View style={styles.authorImageContainer}>
              <Image
                source={require("../assets/profile_img.png")}
                style={styles.profileImage}
              ></Image>
            </View>
            <View style={styles.authorNameContainer}>
              <Text style={styles.authorNameText}>{post.author}</Text>
            </View>
          </View>
          <Image source={images[post.preview_image]} style={styles.postImage} />
          <View style={styles.captionContainer}>
            <Text
              style={
                this.state.light_theme
                  ? styles.captionTextLight
                  : styles.captionText
              }
            >
              {post.caption}
            </Text>
          </View>
          <View style={styles.actionContainer}>
            <View style={styles.likeButton}>
              <Ionicons name={"heart"} size={RFValue} color={"white"} />
              <Text style={styles.likeText}>12k</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContainer: {
    margin: RFValue(13),
    backgroundColor: "black",
    borderRadius: RFValue(20),
    padding: RFValue(20),
    shadowColor: "white",
    shadowOffset: { width: 5, height: 5 },
    shadowRadius: 10,
  },
  cardContainerLight: {
    margin: RFValue(13),
    backgroundColor: "white",
    borderRadius: RFValue(20),
    padding: RFValue(20),
    shadowColor: "black",
    shadowOffset: { width: 5, height: 5 },
    shadowRadius: 10,
  },
  authorContainer: {
    flex: 0.1,
    flexDirection: "row",
  },
  authorImageContainer: {
    flex: 0.15,
    justifyContent: "center",
    alignItems: "center",
  },
  profileImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    borderRadius: RFValue(100),
  },
  authorNameContainer: {
    flex: 0.85,
    justifyContent: "center",
  },
  authorNameText: {
    color: "white",
    fontSize: RFValue(20),
  },
  postImage: {
    marginTop: RFValue(20),
    resizeMode: "contain",
    width: "100%",
    alignSelf: "center",
    height: RFValue(275),
  },
  captionContainer: {},
  captionText: {
    fontSize: 13,
    color: "white",
    paddingTop: RFValue(10),
  },
  captionTextLight: {
    fontSize: 13,
    color: "black",
    paddingTop: RFValue(10),
  },
  actionContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: RFValue(10),
  },
  likeButton: {
    width: RFValue(160),
    height: RFValue(40),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#eb3948",
    borderRadius: RFValue(30),
  },
  likeText: {
    color: "white",
    fontSize: RFValue(25),
    marginLeft: RFValue(5),
  },
});
