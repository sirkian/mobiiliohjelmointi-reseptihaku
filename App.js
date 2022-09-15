import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
} from "react-native";

export default function App() {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    setError("Fetching..");
    try {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?i=${query}`
      );
      const json = await res.json();
      json.meals === null
        ? setError(`No results found for ${query}`)
        : setError("");
      setRecipes(json.meals);
    } catch (err) {
      setError("Something went wrong. " + err);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.text}>{error}</Text>
      <View style={styles.listContainer}>
        <FlatList
          style={styles.list}
          keyExtractor={(item, index) => index.toString()}
          data={recipes}
          renderItem={({ item }) => (
            <View>
              <Image source={{ uri: item.strMealThumb }} style={styles.img} />
              <Text style={styles.text}>{item.strMeal}</Text>
            </View>
          )}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="search.."
          onChangeText={(text) => setQuery(text)}
        />
        <Button title="Search" onPress={handleSearch} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  listContainer: {
    marginTop: 130,
    width: "100%",
    alignItems: "center",
    backgroundColor: "#ddd",
  },
  list: {
    width: "100%",
  },
  text: {
    textAlign: "center",
  },
  img: {
    width: 220,
    height: 100,
    resizeMode: "cover",
    alignSelf: "center",
    marginTop: 16,
    borderRadius: 4,
  },
  inputContainer: {
    marginBottom: 125,
    textAlign: "center",
    width: 220,
  },
  input: {
    textAlign: "center",
    padding: 5,
  },
});
