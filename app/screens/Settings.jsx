import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Switch,
} from "react-native";
import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { colors } from "../utils/colors";
import { responsive } from "../utils/basicUtils";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";

const SettingItem = ({
  icon,
  title,
  subtitle,
  onPress,
  value,
  type = "arrow",
}) => (
  <TouchableOpacity style={styles.settingItem} onPress={onPress}>
    <View style={styles.settingIcon}>
      <Feather name={icon} size={responsive.wp(5)} color={colors.primary} />
    </View>
    <View style={styles.settingInfo}>
      <Text style={styles.settingTitle}>{title}</Text>
      {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
    </View>
    {type === "arrow" && (
      <Feather
        name="chevron-right"
        size={responsive.wp(5)}
        color={colors.text}
      />
    )}
    {type === "switch" && (
      <Switch
        value={value}
        onValueChange={onPress}
        trackColor={{
          false: colors.background,
          true: colors.primaryAlpha(0.2),
        }}
        thumbColor={value ? colors.primary : colors.text}
      />
    )}
    {type === "delete" && (
      <Feather name="trash-2" size={responsive.wp(5)} color={colors.error} />
    )}
  </TouchableOpacity>
);

const SectionHeader = ({ title }) => (
  <Text style={styles.sectionHeader}>{title}</Text>
);

const Settings = () => {
  const insets = useSafeAreaInsets();
  const [notifications, setNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const handleLogout = () => {
    console.log("Logout");
    // Add your logout logic here
  };

  const handleDeleteAccount = () => {
    console.log("Delete Account");
    // Add your account deletion logic here
  };

  return (
    <View style={[styles.container]}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <SectionHeader title="App Preferences" />
        <View style={styles.section}>
          <SettingItem
            icon="bell"
            title="Push Notifications"
            type="switch"
            value={notifications}
            onPress={() => setNotifications(!notifications)}
          />
          <SettingItem
            icon="mail"
            title="Email Notifications"
            type="switch"
            value={emailNotifications}
            onPress={() => setEmailNotifications(!emailNotifications)}
          />
          <SettingItem
            icon="moon"
            title="Dark Mode"
            type="switch"
            value={darkMode}
            onPress={() => setDarkMode(!darkMode)}
          />
        </View>

        <SectionHeader title="Payment & Wallet" />
        <View style={styles.section}>
          <SettingItem
            icon="credit-card"
            title="Payment Methods"
            subtitle="Manage your payment options"
            onPress={() => console.log("Payment Methods")}
          />
          <SettingItem
            icon="file-text"
            title="Transaction History"
            subtitle="View your past transactions"
            onPress={() => console.log("Transaction History")}
          />
        </View>

        <SectionHeader title="Help & Support" />
        <View style={styles.section}>
          <SettingItem
            icon="help-circle"
            title="FAQs"
            onPress={() => console.log("FAQs")}
          />
          <SettingItem
            icon="message-circle"
            title="Contact Support"
            onPress={() => console.log("Contact Support")}
          />
          <SettingItem
            icon="shield"
            title="Privacy Policy"
            onPress={() => console.log("Privacy Policy")}
          />
          <SettingItem
            icon="file"
            title="Terms of Service"
            onPress={() => console.log("Terms of Service")}
          />
        </View>

        <SectionHeader title="About" />
        <View style={styles.section}>
          <SettingItem
            icon="info"
            title="About Us"
            onPress={() => console.log("About Us")}
          />
          <SettingItem
            icon="star"
            title="Rate App"
            onPress={() => console.log("Rate App")}
          />
          <SettingItem
            icon="share-2"
            title="Share App"
            onPress={() => console.log("Share App")}
          />
        </View>

        <View style={styles.section}>
          <SettingItem
            icon="log-out"
            title="Logout"
            onPress={handleLogout}
            type="arrow"
          />
          <SettingItem
            icon="trash-2"
            title="Delete Account"
            subtitle="This action cannot be undone"
            onPress={handleDeleteAccount}
            type="delete"
          />
        </View>

        <Text style={styles.version}>Version 1.0.0</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: responsive.wp(4),
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.background,
  },
  title: {
    fontSize: responsive.wp(5),
    fontWeight: "600",
    color: colors.text,
  },
  content: {
    flex: 1,
  },
  sectionHeader: {
    fontSize: responsive.wp(3.5),
    fontWeight: "600",
    color: colors.text,
    marginHorizontal: responsive.wp(4),
    marginTop: responsive.hp(2),
    marginBottom: responsive.hp(1),
  },
  section: {
    backgroundColor: colors.surface,
    borderRadius: responsive.wp(3),
    marginHorizontal: responsive.wp(4),
    marginBottom: responsive.hp(2),
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: responsive.wp(4),
    borderBottomWidth: 1,
    borderBottomColor: colors.background,
  },
  settingIcon: {
    width: responsive.wp(8),
    height: responsive.wp(8),
    borderRadius: responsive.wp(4),
    backgroundColor: colors.primaryAlpha(0.1),
    justifyContent: "center",
    alignItems: "center",
    marginRight: responsive.wp(3),
  },
  settingInfo: {
    flex: 1,
  },
  settingTitle: {
    fontSize: responsive.wp(3.5),
    color: colors.text,
    fontWeight: "500",
  },
  settingSubtitle: {
    fontSize: responsive.wp(3),
    color: colors.text,
    opacity: 0.7,
    marginTop: responsive.hp(0.3),
  },
  version: {
    fontSize: responsive.wp(3),
    color: colors.text,
    opacity: 0.5,
    textAlign: "center",
    marginVertical: responsive.hp(3),
  },
});

export default Settings;
