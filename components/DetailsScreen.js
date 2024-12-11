// components/DetailsScreen.js
import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Button,
  TouchableOpacity,
  Linking,
} from "react-native";

function DetailsScreen({ route, navigation }) {
  const { show, lastscreen } = route.params || {}; // Handeling case of direct navigation to details screen :-
  console.log("checking the show details---", show.url);

  if (!show) {
    // Handeling case of direct navigation to details screen one very first render/mount of page:-
    return (
      <View style={styles.container}>
        <Text>Show details not available.</Text>
        <Button title="Home" onPress={() => navigation.navigate("Home")} />
      </View>
    );
  }
  function stripHtmlTags(html) {
    return html.replace(/<[^>]*>/g, ""); // Regular expression to remove HTML tags
  }

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        onPress={() => Linking.openURL(show?.url)} // Open the URL when the image is clicked
      >
        <Image
          source={{
            uri: show.image ? show.image.original : "DummyURL",
          }}
          style={styles.thumbnail}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <Text style={{ fontWeight: "bold", color: "red" }}>
        Click the Image to Visit official site
      </Text>
      <Text style={styles.title}>{show.name} </Text>
      <Text style={styles.summary}>
        <Text>{stripHtmlTags(show.summary)}</Text>
      </Text>
      <TouchableOpacity style={styles.buttonContainer}>
        {lastscreen === "homescreen" ? (
          <Button title="GoBack" onPress={() => navigation.navigate("Home")} />
        ) : lastscreen === "searchscreen" ? (
          <Button
            title="GoBack"
            onPress={() => navigation.navigate("Search")}
          />
        ) : (
          <Button title="GoBack" onPress={() => navigation.goBack()} />
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#FFFFE0",
  },
  thumbnail: {
    width: "100%",
    height: 500,
    borderRadius: 30,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  summary: {
    fontSize: 16,
    lineHeight: 22,
    color: "#555",
  },
  buttonContainer: {
    width: "20%",
    bottom: 0,
    left: 0,
  },
});

export default DetailsScreen;
