import { StyleSheet, Text, View } from 'react-native'
import { Stack } from 'expo-router'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'

const _layout = () => {
  return (
    <SafeAreaProvider style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Stack 
      >
        <Stack.Screen name='index' options={{
          headerShown: false,
        }}/>
        <Stack.Screen name='screens/main' options={{
          headerShown: false
        }}/>
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
  )
}

export default _layout

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', // This ensures the SafeAreaProvider also has the same background
  }
})