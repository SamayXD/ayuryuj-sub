import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React from "react";
import ReactNativeModal from "react-native-modal";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { responsive } from "../utils/basicUtils";
import { Feather } from "@expo/vector-icons";
import { colors } from "../utils/colors";

const menuItems = [
  { id: 1, title: "Home", icon: "home", route: "home" },
  { id: 2, title: "Doctors", icon: "briefcase", route: "doctorListings" },
  { id: 3, title: "Book a Test", icon: "book", route: "booktests" },
  { id: 4, title: "Settings", icon: "settings", route: "settings" },
  { id: 5, title: "Profile", icon: "user", route: "profile" },
  { id: 6, title: "Logout", icon: "log-out", route: "logout" },
];

const Sidebar = ({ isVisible, onClose, onChange, activeScreen }) => {
  const insets = useSafeAreaInsets();

  const handleMenuPress = (route) => {
    if (route === "logout") {
      // Handle logout
      onClose();
      return;
    }
    onChange(route);
  };

  return (
    <ReactNativeModal
      isVisible={isVisible}
      style={[styles.modal]}
      animationIn="slideInLeft"
      animationOut="slideOutLeft"
      deviceWidth={responsive.window.width}
      deviceHeight={responsive.window.height}
      hideModalContentWhileAnimating={true}
      useNativeDriver
      backdropTransitionOutTiming={0}
      statusBarTranslucent={false}
      onBackdropPress={onClose}
      backdropOpacity={0.4}
      animationInTiming={300}
      animationOutTiming={300}
      swipeDirection={"left"}
      onSwipeComplete={onClose}
    >
      <View style={[styles.container]}>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          {/* <Image
            source={require("../assets/default-avatar.png")}
            style={styles.profileImage}
          /> */}
          <Text style={styles.profileName}>John Doe</Text>
          <Text style={styles.profileEmail}>john@example.com</Text>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {menuItems.map((item) => {
            const isActive = activeScreen === item.route;

            return (
              <TouchableOpacity
                key={item.id}
                style={[styles.menuItem, isActive && styles.menuItemActive]}
                onPress={() => handleMenuPress(item.route)}
              >
                <Feather
                  name={item.icon}
                  size={responsive.wp(5)}
                  color={isActive ? colors.primary : colors.text}
                />
                <Text
                  style={[styles.menuText, isActive && styles.menuTextActive]}
                >
                  {item.title}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </ReactNativeModal>
  );
};

export default Sidebar;

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    width: responsive.wp(100),
    height: responsive.hp(100),
    justifyContent: "flex-start", // Align to left side
  },
  container: {
    backgroundColor: colors.surface,
    borderRadius: 0,
    left: 0,
    flex: 1,
    height: "100%",
    width: responsive.wp(70),
    position: "absolute",
    // Add shadow for better visual feedback
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  profileSection: {
    height: responsive.hp(25),
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: colors.background,
  },
  profileImage: {
    width: responsive.wp(20),
    height: responsive.wp(20),
    borderRadius: responsive.wp(10),
    marginBottom: responsive.hp(1),
  },
  profileName: {
    fontSize: responsive.wp(4.5),
    fontWeight: "600",
    color: colors.text,
    marginBottom: responsive.hp(0.5),
  },
  profileEmail: {
    fontSize: responsive.wp(3.5),
    color: colors.text,
  },
  menuContainer: {
    paddingTop: responsive.hp(2),
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: responsive.hp(2),
    paddingHorizontal: responsive.wp(6),
    borderBottomWidth: 1,
    borderBottomColor: colors.background,
  },
  menuItemActive: {
    backgroundColor: colors.primaryAlpha(0.1),
  },
  menuText: {
    marginLeft: responsive.wp(4),
    fontSize: responsive.wp(4),
    color: colors.text,
    fontWeight: "500",
  },
  menuTextActive: {
    color: colors.primary,
    fontWeight: "600",
  },
});
