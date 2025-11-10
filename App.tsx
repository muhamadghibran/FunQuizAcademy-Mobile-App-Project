import React, { useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AppNavigator } from "./src/navigation/AppNavigator";
import "react-native-gesture-handler";
import { View } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    "Gilroy-SemiBold": require("./assets/fonts/gilroy-semibold.ttf"),
    "Gilroy-Medium": require("./assets/fonts/Gilroy-Medium.ttf"),
    "Gilroy-Bold": require("./assets/fonts/Gilroy-Bold.ttf"),
  });
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <SafeAreaProvider>
        <StatusBar style="light" backgroundColor="transparent" translucent />
        <AppNavigator />
      </SafeAreaProvider>
    </View>
  );
}
