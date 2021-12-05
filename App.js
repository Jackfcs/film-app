import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { Button, StyleSheet, Text, View, TextInput, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Welcome" }}
        />
        <Stack.Screen name="Second" component={SecondScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}



const HomeScreen = ({ navigation }) => {
  const [text, setText] = useState("test");
  const [filmName, setFilmName] = useState("");
  const [filmRating, setFilmRating] = useState("");
  const [posterPath, setPosterPath] = useState("");
  console.log(text);

  useEffect(() => {
    async function getMovieName() {
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/550?api_key=56bce8568267276dd96b80ba56983a16"
      );
      const data = await response.json();
      console.log(data.poster_path);
      setFilmName(data.title);
      setPosterPath(data.poster_path);
    }
    getMovieName();

    async function getMovieRating() {
      const response = await fetch(
        "https://api.themoviedb.org/4/movie/550?api_key=56bce8568267276dd96b80ba56983a16"
      );
      const data = await response.json();
      setFilmRating(data.encoded.rating);
    }
    getMovieRating();
  });

  return (
    <View>
      <Text>Home Screen</Text>
      <Button
        title="Go to second screen"
        onPress={() => navigation.navigate("Second", { name: "second screen" })}
      />
      <TextInput onChangeText={(e) => setText(e)} />
      <Text>{text}</Text>
      <Text>Film Title: {filmName}</Text>
      <Text>Film Rating: {filmRating}</Text>
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/original${posterPath}`,
          
        }}
        style={styles.poster}
      />
    </View>
  );
};

const SecondScreen = ({ navigation, route }) => {
  return <Text>This is the {route.params.name}</Text>;
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  poster: {
    width: 200,
    height: 400,
  }
});
