import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const home = () => {
  return (
    <SafeAreaView>
      <View
        style={{
          backgroundColor: "#f0f0f0",
          height: "100%",
        }}
      >
        <Text>NEW HOME</Text>
        <TouchableOpacity
          onPress={() => {
            router.back();
          }}
        >
          <Text>TOUCH ME</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default home;

const styles = StyleSheet.create({});
