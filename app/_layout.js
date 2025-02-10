import { StyleSheet, Text, View } from "react-native";
import { Stack } from "expo-router";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Platform } from "react-native";

const _layout = () => {
  return (
    <SafeAreaProvider style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F1F5F4" />
      <Stack
        screenOptions={{
          animation: Platform.OS === "ios" ? "default" : "fade_from_bottom",
          animationDuration: 100,
          presentation: "card",
          headerShown: false,
          animation: Platform.select({
            ios: "slide_from_right",
            // android: "fade", // Using fade animation for Android
          }),
          // These additional options help prevent the blank screen
          // animationTypeForReplace: "pop",
          gestureEnabled: true,
          gestureDirection: "horizontal",
          contentStyle: {
            backgroundColor: "white", // Match your app's background color
          },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="screens/main"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="screens/Reports"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="screens/BookTests"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="screens/Appointments"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="screens/Notifications"
          options={{
            headerShown: false,
          }}
        />
        {/* <Stack.Screen name='screens/home' options={{
          headerShown: false
        }}/>
        <Stack.Screen name='screens/doctorListings' options={{
          headerShown: false
        }}/>
        <Stack.Screen name='screens/settings' options={{
          headerShown: false
        }}/> */}
      </Stack>
    </SafeAreaProvider>
  );
};

export default _layout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F5F4", // This ensures the SafeAreaProvider also has the same background
  },
});
