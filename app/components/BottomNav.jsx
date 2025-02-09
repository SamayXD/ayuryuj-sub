import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import React from "react";
import { responsive } from "../utils/basicUtils";
import { colors } from "../utils/colors";
import { Feather } from "@expo/vector-icons";

const navItems = [
  { id: 1, icon: "home", screen: "home", label: "Home" },
  { id: 2, icon: "briefcase", screen: "doctorListings", label: "Doctors" },
  { id: 3, icon: "user", screen: "profile", label: "Profile" },
  { id: 4, icon: "settings", screen: "settings", label: "Settingss" },
];

const BottomNav = ({ onNavPress, activeScreen }) => {
  const handlePress = (screen) => {
    onNavPress?.(screen);
  };

  return (
    <View style={styles.container}>
      {navItems.map((item) => {
        const isSelected = activeScreen === item.screen;

        return (
          <TouchableOpacity
            key={item.id}
            style={styles.itemContainer}
            onPress={() => handlePress(item.screen)}
          >
            <View
              style={[styles.navItem, isSelected && styles.selectedNavItem]}
            >
              <Feather
                name={item.icon}
                size={responsive.wp(6)}
                color={isSelected ? colors.primary : colors.text}
              />
            </View>
            <Text style={[styles.label, isSelected && styles.selectedLabel]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default BottomNav;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    width: responsive.window.width,
    height: responsive.hp(12),
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: colors.background,
    paddingVertical: responsive.hp(1.5),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    paddingBottom: responsive.hp(2),
  },
  itemContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: responsive.hp(0.5),
    zIndex: 1,
  },
  navItem: {
    width: responsive.wp(12),
    height: responsive.wp(11),
    borderRadius: responsive.wp(3),
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  selectedNavItem: {
    backgroundColor: colors.primaryAlpha(0.1),
  },
  label: {
    fontSize: responsive.wp(3),
    color: colors.text,
    fontWeight: "500",
    zIndex: 2,
  },
  selectedLabel: {
    color: colors.primary,
    fontWeight: "600",
  },
});
