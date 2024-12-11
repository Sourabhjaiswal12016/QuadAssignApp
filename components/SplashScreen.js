import React from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
const MainImage = require("../assets/quadb.png");

function SplashScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={MainImage}
        style={styles.image}
        resizeMode="stretch"
      >
        <View style={styles.imageTextContainer}>
          {/* <Text style={styles.text}>Splash screen</Text> */}
        </View>
        <TouchableOpacity style={styles.buttonContainer}>
          <Button
            title="HomeScreen"
            onPress={() => navigation.navigate("Home")}
          />
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageTextContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    top: "30%", // Adjust this to position the text accordingly
    width: "100%", // Makes sure the text container covers the full width
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  text: {
    fontSize: 24,
    color: "#000", // Assuming the text color is white for contrast
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    left: 10,
  },
});

export default SplashScreen;
