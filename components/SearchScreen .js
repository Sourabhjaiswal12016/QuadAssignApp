import React, { useContext, useEffect, useState } from "react";
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

function SearchScreen({ navigation, route }) {
  const { AllShows } = useContext(ShowContext);
  //   console.log(
  //     "checking query searched and passed in search screen---",
  //     route.params.query
  //   );
  const initialSearch = route?.params?.query || "";
  const [search, setSearch] = useState("");
  useEffect(() => {
    setSearch(initialSearch);
  }, [initialSearch]);

  const filteredShows = search
    ? AllShows.filter((show) =>
        show.show.name.toLowerCase().includes(search.toLowerCase())
      )
    : "";
  //if nothing will be in search then , the results will be empty..

  function stripHtmlTags(html) {
    return html.replace(/<[^>]*>/g, ""); // Regular expression to remove HTML tags
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.buttonContainer}>
        <Button title="Home" onPress={() => navigation.navigate("Home")} />
      </TouchableOpacity>
      <TextInput
        style={styles.searchBar}
        placeholder="Search shows..."
        value={search}
        onChangeText={setSearch}
      />

      <FlatList
        data={filteredShows}
        keyExtractor={(item) => item.show.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Details", {
                show: item.show,
                lastscreen: "searchscreen",
              })
            }
            style={styles.item}
          >
            <View style={styles.imgesummarycontainer}>
              <View style={styles.imageContainer}>
                <Image
                  source={{
                    uri: item.show.image
                      ? item.show.image.medium
                      : "URL_TO_PLACEHOLDER_IMAGE",
                  }}
                  style={styles.thumbnail}
                />
                <Text style={styles.name}>{item.show.name}</Text>
              </View>
              <Text style={styles.summary}>
                {stripHtmlTags(item.show.summary)}
              </Text>
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
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  item: {
    marginBottom: 20,
  },
  thumbnail: {
    width: 100,
    height: 150,
    marginBottom: 5,
  },
  buttonContainer: {
    position: "absolute",
    top: 60,
    zIndex: 999,
    right: 10,
  },
  imgesummarycontainer: {
    flexDirection: "row",
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    elevation: 2, // for shadow effect on Android
  },
  imageContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginRight: 10,
  },
  thumbnail: {
    width: 100,
    height: 150,
    borderRadius: 5,
  },
  name: {
    textAlign: "center",
    fontWeight: "bold",
  },
  summary: {
    flex: 1,
    paddingLeft: 10,
    fontSize: 14,
    color: "#666",
  },
});

export default SearchScreen;
