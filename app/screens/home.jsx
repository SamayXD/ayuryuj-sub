import {
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import Sidebar from "../components/Sidebar";

const Home = ({ toggleSidebar }) => {
  return (
    <View>
      <Text>home screen</Text>
      <TouchableOpacity
        onPress={() => {
          toggleSidebar();
        }}
      >
        <Text>handleSidebarNav</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
