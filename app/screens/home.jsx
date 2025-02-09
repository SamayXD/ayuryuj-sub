import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Image,
} from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";

import { responsive } from "../utils/basicUtils";
import { colors } from "../utils/colors";

const HomeCard = ({ icon, title, subtitle, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <View style={styles.cardIcon}>
      <Feather name={icon} size={responsive.wp(6)} color={colors.primary} />
    </View>
    <Text style={styles.cardTitle}>{title}</Text>
    <Text style={styles.cardSubtitle}>{subtitle}</Text>
  </TouchableOpacity>
);

const Home = ({ toggleSidebar }) => {
  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity style={{ padding: 10 }} onPress={toggleSidebar}>
          <Feather name="menu" size={responsive.wp(6)} color={colors.text} />
        </TouchableOpacity>

        <View
          style={[
            styles.locationContainer,
            { flex: 1, paddingLeft: responsive.wp(4) },
          ]}
        >
          {/* <Feather
            name="map-pin"
            size={responsive.wp(4)}
            color={colors.primary}
          /> */}
          <View>
            <Text style={[styles.locationText, { fontSize: 12 }]}>
              Your location
            </Text>
            <Text style={styles.locationText}>Mumbai</Text>
          </View>
        </View>

        <View style={styles.topBarRight}>
          <TouchableOpacity style={styles.iconButton}>
            <Feather
              name="credit-card"
              size={responsive.wp(6)}
              color={colors.text}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <View>
              <Feather
                name="bell"
                size={responsive.wp(6)}
                color={colors.text}
              />
              <View style={styles.notificationDot} />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.greeting}>Hello, Samay 👋</Text>
        <Text style={styles.subtitle}>How are you feeling today?</Text>

        <View style={styles.cardGrid}>
          <HomeCard
            icon="user"
            title="Consult Doctor"
            subtitle="Talk to a doctor now"
            onPress={() => {}}
          />
          <HomeCard
            icon="clipboard"
            title="Book Tests"
            subtitle="Book lab tests"
            onPress={() => {}}
          />
          <HomeCard
            icon="calendar"
            title="Appointments"
            subtitle="View your schedule"
            onPress={() => {}}
          />
          <HomeCard
            icon="file-text"
            title="Reports"
            subtitle="Check your reports"
            onPress={() => {}}
          />
        </View>
        <Image
          source={require("../../assets/homeAd-1.png")}
          style={{
            marginTop: responsive.hp(2),
            borderRadius: 15,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.1,
            shadowRadius: 3.84,
            elevation: 5,
            height: responsive.hp(15),
            width: responsive.wp(92),
          }}
          resizeMode="stretch"
        />
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    // backgroundColor: colors.background,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: responsive.wp(4),
    paddingVertical: responsive.hp(2),
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: colors.background,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: responsive.wp(1),
  },
  locationText: {
    fontSize: responsive.wp(3.5),
    color: colors.text,
    fontWeight: "500",
  },
  topBarRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: responsive.wp(4),
  },
  iconButton: {
    padding: responsive.wp(2),
  },
  notificationDot: {
    position: "absolute",
    top: 0,
    right: 0,
    width: responsive.wp(2),
    height: responsive.wp(2),
    borderRadius: responsive.wp(1),
    backgroundColor: colors.accent,
  },
  content: {
    flex: 1,
    padding: responsive.wp(4),
    // backgroundColor: "black",
  },
  greeting: {
    fontSize: responsive.wp(6),
    fontWeight: "bold",
    color: colors.text,
    marginBottom: responsive.hp(1),
  },
  subtitle: {
    fontSize: responsive.wp(4),
    color: colors.text,
    marginBottom: responsive.hp(3),
  },
  cardGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: responsive.wp(4),
  },
  card: {
    width: responsive.wp(43),
    padding: responsive.wp(4),
    backgroundColor: colors.surface,
    borderRadius: responsive.wp(3),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardIcon: {
    width: responsive.wp(12),
    height: responsive.wp(12),
    borderRadius: responsive.wp(6),
    backgroundColor: colors.primaryAlpha(0.1),
    justifyContent: "center",
    alignItems: "center",
    marginBottom: responsive.hp(1),
  },
  cardTitle: {
    fontSize: responsive.wp(4),
    fontWeight: "600",
    color: colors.text,
    marginBottom: responsive.hp(0.5),
  },
  cardSubtitle: {
    fontSize: responsive.wp(3),
    color: colors.text,
    opacity: 0.7,
  },
});
