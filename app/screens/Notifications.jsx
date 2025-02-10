import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { colors } from "../utils/colors";
import { responsive } from "../utils/basicUtils";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Platform } from "react-native";
import { router } from "expo-router";
const NotificationItem = ({ type, title, message, time, read, onPress }) => (
  <TouchableOpacity
    style={[styles.notificationItem, !read && styles.unreadNotification]}
    onPress={onPress}
  >
    <View style={[styles.iconContainer, styles[`${type}Icon`]]}>
      <Feather
        name={
          type === 'appointment' ? 'calendar' :
            type === 'test' ? 'file-text' :
              type === 'payment' ? 'credit-card' : 'bell'
        }
        size={responsive.wp(5)}
        color={
          type === 'appointment' ? colors.primary :
            type === 'test' ? colors.accent :
              type === 'payment' ? colors.text : colors.primary
        }
      />
    </View>
    <View style={styles.notificationContent}>
      <Text style={styles.notificationTitle}>{title}</Text>
      <Text style={styles.notificationMessage}>{message}</Text>
      <Text style={styles.notificationTime}>{time}</Text>
    </View>
    {!read && <View style={styles.unreadDot} />}
  </TouchableOpacity>
);

const Notifications = () => {
  const insets = useSafeAreaInsets();

  const notifications = [
    {
      id: 1,
      type: 'appointment',
      title: 'Appointment Reminder',
      message: 'Your appointment with Dr. Smith is tomorrow at 10:00 AM',
      time: '2 hours ago',
      read: false,
    },
    {
      id: 2,
      type: 'test',
      title: 'Test Results Available',
      message: 'Your blood test results are now ready to view',
      time: '1 day ago',
      read: true,
    },
    {
      id: 3,
      type: 'payment',
      title: 'Payment Successful',
      message: 'Payment of ₹599 for Blood Test has been processed',
      time: '2 days ago',
      read: true,
    },
    // Add more notifications as needed
  ];

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <View style={{
          flexDirection: "row"
        }}>
          <TouchableOpacity
            style={{
              paddingHorizontal: 10,
            }}
            onPress={() => {
              router.back();
            }}
          >
            <Feather
              name="chevron-left"
              size={responsive.wp(6)}
              color={colors.text}
            />
          </TouchableOpacity>

          <Text style={styles.title}>Notifications</Text>
        </View>
        <TouchableOpacity
          style={styles.clearButton}
          onPress={() => console.log('Clear all')}
        >
          <Text style={styles.clearButtonText}>Clear all</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {notifications.map(notification => (
          <NotificationItem
            key={notification.id}
            {...notification}
            onPress={() => console.log('Notification pressed:', notification.id)}
          />
        ))}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: responsive.wp(4),
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.background,
  },
  title: {
    fontSize: responsive.wp(5),
    fontWeight: '600',
    color: colors.text,
  },
  clearButton: {
    padding: responsive.wp(2),
  },
  clearButtonText: {
    fontSize: responsive.wp(3.5),
    color: colors.primary,
    fontWeight: '500',
  },
  content: {
    flex: 1,
    padding: responsive.wp(4),
  },
  notificationItem: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: responsive.wp(3),
    padding: responsive.wp(4),
    marginBottom: responsive.hp(2),
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  unreadNotification: {
    backgroundColor: colors.primaryAlpha(0.05),
    borderLeftWidth: 3,
    borderLeftColor: colors.primary,
  },
  iconContainer: {
    width: responsive.wp(10),
    height: responsive.wp(10),
    borderRadius: responsive.wp(5),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: responsive.wp(3),
  },
  appointmentIcon: {
    backgroundColor: colors.primaryAlpha(0.1),
  },
  testIcon: {
    backgroundColor: colors.accentAlpha(0.1),
  },
  paymentIcon: {
    backgroundColor: colors.background,
  },
  notificationContent: {
    flex: 1,
    marginRight: responsive.wp(2),
  },
  notificationTitle: {
    fontSize: responsive.wp(3.5),
    fontWeight: '600',
    color: colors.text,
    marginBottom: responsive.hp(0.5),
  },
  notificationMessage: {
    fontSize: responsive.wp(3.2),
    color: colors.text,
    opacity: 0.7,
    marginBottom: responsive.hp(0.5),
  },
  notificationTime: {
    fontSize: responsive.wp(3),
    color: colors.text,
    opacity: 0.5,
  },
  unreadDot: {
    width: responsive.wp(2),
    height: responsive.wp(2),
    borderRadius: responsive.wp(1),
    backgroundColor: colors.primary,
    alignSelf: 'flex-start',
    marginTop: responsive.hp(0.5),
  },
});

export default Notifications;