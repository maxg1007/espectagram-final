import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  TextInput,
  Platform,
  StatusBar,
  SafeAreaView,
  Button,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { RFValue } from "react-native-responsive-fontsize";
import firebase from "firebase";

export default class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      previewImage: "image1",
      dropDownHeight: 40,
      light_theme: true,
    };
  }
  componentDidMount() {
    this.fetchUser();
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

  async addPost() {
    if (this.state.caption) {
      let postData = {
        preview_image: this.state.previewImage,
        caption: this.state.caption,
        author: firebase.auth().currentUser.displayName,
        created_on: new Date(),
        author_uid: firebase.auth().currentUser.uid,
        likes: 0,
      };
      await firebase
        .database()
        .ref("/posts/" + Math.random().toString(36).slice(2))
        .set(postData)
        .then(function (snapshot) {
          alert("Ok");
          console.log(postData);
        })
        .catch((error) => alert(error.message));
      //this.props.setUpdateToTrue();

      this.props.navigation.navigate("Feed");
    } else {
      alert(
        "Error",
        "Todos os campos são obrigatorios",
        [{ text: "ok", onPress: () => console.log("Ok Pressionado") }],
        { cancelable: false }
      );
    }
  }

  render() {
    let preview_images = {
      image1: require("../assets/image_1.jpg"),
      image2: require("../assets/image_2.jpg"),
      image3: require("../assets/image_3.jpg"),
      image4: require("../assets/image_4.jpg"),
      image5: require("../assets/image_5.jpg"),
      image6: require("../assets/image_6.jpg"),
      image7: require("../assets/image_7.jpg"),
    };
    return (
      <View
        style={
          this.state.light_theme ? styles.containerLight : styles.container
        }
      >
        <SafeAreaView style={styles.droidSafeArea} />
        <View style={styles.appTitle}>
          <View style={styles.appIcon}>
            <Image
              source={require("../assets/logo.png")}
              style={styles.iconImage}
            />
          </View>
          <View style={styles.appTitleTextContainer}>
            <Text style={styles.appTitleText}>Novo Post</Text>
          </View>
        </View>
        <View style={styles.fieldsContainer}>
          <ScrollView>
            <Image
              source={preview_images[this.state.previewImage]}
              style={styles.previewImage}
            />
            <View style={{ height: RFValue(this.state.dropDownHeight) }}>
              <DropDownPicker
                items={[
                  { label: "Image1", value: "image1" },
                  { label: "Image2", value: "image2" },
                  { label: "Image3", value: "image3" },
                  { label: "Image4", value: "image4" },
                  { label: "Image5", value: "image5" },
                ]}
                defaultValue={this.state.previewImage}
                open={this.state.dropDownHeight === 170 ? true : false}
                onOpen={() => {
                  this.setState({ dropDownHeight: 170 });
                }}
                onClose={() => {
                  this.setState({ dropDownHeight: 40 });
                }}
                placeholder={this.state.previewImage}
                //obsoleto
                // onSelectItem={(item) => {
                //   this.setState({ previewImage: item.value });
                // }}
                onChangeItem={(item) => {
                  this.setState({ previewImage: item.value });
                }}
                arrowIconStyle={{ color: "white" }}
                style={{
                  backgroundColor: "transparent",
                  borderWidth: 1,
                  borderColor: "white",
                  color: "white",
                }}
              />
            </View>
            <TextInput
              style={
                this.state.light_theme
                  ? styles.inputFontLight
                  : styles.inputFont
              }
              onChangeText={(caption) => {
                this.setState({ caption: caption });
                console.log(!this.state.caption);
              }}
              placeholder={"legenda"}
              placeholderTextColor="white"
            />

            <View style={{ alignSelf: "center", marginTop: 20 }}>
              <Button title="Enviar" onPress={() => this.addPost()}></Button>
            </View>
          </ScrollView>
        </View>
        <View style={{ flex: 0.08 }} />
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
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center",
  },
  iconImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  appTitleTextContainer: {
    flex: 0.7,
    justifyContent: "center",
  },
  appTitleText: {
    color: "white",
    fontSize: RFValue(28),
  },
  fieldsContainer: {
    flex: 0.85,
  },
  previewImage: {
    width: "93%",
    height: RFValue(250),
    alignSelf: "center",
    borderRadius: RFValue(10),
    marginVertical: RFValue(10),
    resizeMode: "contain",
  },
  inputFont: {
    height: RFValue(40),
    borderColor: "white",
    borderWidth: RFValue(1),
    borderRadius: RFValue(10),
    paddingLeft: RFValue(10),
    color: "white",
  },
  inputFontLight: {
    height: RFValue(40),
    borderColor: "black",
    borderWidth: RFValue(1),
    borderRadius: RFValue(10),
    paddingLeft: RFValue(10),
    color: "black",
  },
});
