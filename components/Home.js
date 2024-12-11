// components/Home.js
import React, { useContext, useState } from "react";
import {
  View,
  FlatList,
  Text,
  Image,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import { ShowContext } from "../context/ShowContext";

function Home({ navigation }) {
  const { shows } = useContext(ShowContext);

  //   const filteredShows = search
  //     ? shows.filter((show) =>
  //         show.show.name.toLowerCase().includes(search.toLowerCase())
  //       )
  //     : shows;
  //     const AllShows = shows
  const [search, setSearch] = useState("");

  const redirectSearchScreen = (searchedText) => {
    setSearch(searchedText);
    console.log("Redirecting to SearchScreen with text:", searchedText);

    // Navigate to SearchScreen with the search query as a parameter
    if (searchedText.length > 2)
      navigation.navigate("Search", { query: searchedText });
  };
  //   const filteredShows = search
  //     ? shows.filter((show) =>
  //         show.show.name.toLowerCase().includes(search.toLowerCase())
  //       )
  //     : "";
  console.log("checking hsow in home screen--", shows);
  function stripHtmlTags(html) {
    return html.replace(/<[^>]*>/g, ""); // Regular expression to remove HTML tags
  }
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search shows...put alteast 3 char"
        value={search}
        onChangeText={redirectSearchScreen}
      />
      <FlatList
        data={shows}
        keyExtractor={(item) => item.show.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("Details", { show: item.show })}
          >
            <Image
              source={{
                uri: item.show.image
                  ? item.show.image.medium
                  : "URL_TO_PLACEHOLDER_IMAGE",
              }}
              style={styles.thumbnail}
            />
            <View style={styles.cardContent}>
              <Text style={styles.title}>{item.show.name}</Text>
              <Text>
                Rating :{" "}
                {item.show.rating.average ? item.show.rating.average : 5}
              </Text>
              <Text numberOfLines={2} style={styles.summary}>
                {stripHtmlTags(item.show.summary)}
              </Text>
              <TouchableOpacity style={styles.buttonContainer}>
                <Button
                  title="View Details"
                  onPress={() =>
                    navigation.navigate("Details", {
                      show: item.show,
                      lastscreen: "homescreen",
                    })
                  }
                />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  searchBar: {
    height: 40,
    borderColor: "green",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    elevation: 2, // for shadow effect on Android
  },
  thumbnail: {
    width: 100,
    height: 150,
    borderRadius: 5,
  },
  cardContent: {
    flex: 1,
    paddingLeft: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
  },
  summary: {
    color: "#666",
    fontSize: 14,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    left: 10,
  },
});

export default Home;
