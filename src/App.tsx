import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View } from "react-native";

import LaunchListScreen from "./screens/LaunchListScreen";

export default function App() {
  return (
    <View style={styles.container}>
      <LaunchListScreen></LaunchListScreen>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
