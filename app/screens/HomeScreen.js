import React from 'react';
import { Button, StyleSheet, Text, View } from "react-native";

const Stack = createNativeStackNavigator();

const HomeScreen = ({ navigation }) => {
    return (
      <View>
        <Text>Home Screen</Text>
        <Button
          title="Go to second screen"
          onPress={() => navigation.navigate("Second", { name: "second screen" })}
        />
      </View>
    );
  };

export default HomeScreen;