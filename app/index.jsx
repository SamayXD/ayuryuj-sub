import {
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

const handleSplash = () => {
  router.navigate("/screens/home");
};

const index = () => {
  useEffect(() => {
    const timer = setTimeout(handleSplash, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <StatusBar style="auto" />

      <View
        style={{
          height: "100%",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Splash Screen</Text>
      </View>
    </SafeAreaView>
  );
};

export default index;

const styles = StyleSheet.create({});
