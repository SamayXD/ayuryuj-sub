import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Sidebar from "../components/Sidebar";
import { responsive } from "../utils/basicUtils";
import { router } from "expo-router";
import BottomNav from "../components/BottomNav";
import Home from "./Home";
import DoctorListings from "./DoctorListings";
import Settings from "./Settings";
import Profile from "./Profile";
import BookTests from "./BookTests";

const main = () => {
  const [modalActive, setModalActive] = useState(false);
  const [activeScreen, setActiveScreen] = useState("home");

  const toggleSidebar = () => {
    setModalActive(!modalActive);
  };

  const handleSidebarNav = (screenName) => {
    setModalActive(false);
    setActiveScreen(screenName);
    // handleScreenChange(screenName);
  };

  const handleScreenChange = (screen) => {
    setActiveScreen(screen);
  };

  const renderScreen = () => {
    switch (activeScreen) {
      case "home":
        return <Home toggleSidebar={toggleSidebar} />;
      case "doctorListings":
        return <DoctorListings />;
      case "profile":
        return <Profile />;
      case "settings":
        return <Settings />;
      case "booktests":
        return <BookTests />;
      default:
        return <Text style={styles.title}>Home Screen</Text>;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {renderScreen()}
        {/* <TouchableOpacity
          style={styles.button}
          onPress={() => setModalActive(!modalActive)}
        >
          <Text style={styles.buttonText}>Open Menu</Text>
        </TouchableOpacity> */}
      </View>

      <Sidebar
        isVisible={modalActive}
        onClose={() => setModalActive(false)}
        onChange={handleSidebarNav}
        activeScreen={activeScreen}
      />

      <BottomNav onNavPress={handleScreenChange} activeScreen={activeScreen} />
    </SafeAreaView>
  );
};

export default main;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    backgroundColor: "#f0f0f0",
    height: responsive.hp(100),
    padding: responsive.wp(4),
    paddingBottom: responsive.hp(15), // Add padding for bottom nav
  },
  title: {
    fontSize: responsive.wp(6),
    fontWeight: "bold",
    marginBottom: responsive.hp(2),
  },
  button: {
    backgroundColor: "#007AFF",
    padding: responsive.wp(3),
    borderRadius: responsive.wp(2),
    width: responsive.wp(40),
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: responsive.wp(4),
    fontWeight: "600",
  },
});
