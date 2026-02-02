import "react-native-gesture-handler";
import React, { useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AppNavigator } from "./src/navigation/AppNavigator";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { View } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { initDatabase } from "./src/services/DatabaseService";
import { LanguageProvider } from "./src/context/LanguageContext";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    "Gilroy-SemiBold": require("./assets/fonts/gilroy-semibold.ttf"),
    "Gilroy-Medium": require("./assets/fonts/Gilroy-Medium.ttf"),
    "Gilroy-Bold": require("./assets/fonts/Gilroy-Bold.ttf"),
  });

  if (fontError) {
    // Handle font error quietly or with specific error boundary
  }

  const [dbInitialized, setDbInitialized] = React.useState(false);

  React.useEffect(() => {
    const init = async () => {
      try {
        await initDatabase();
      } catch (e) {
        // Error initializing DB
      } finally {
        setDbInitialized(true);
      }
    };
    init();
  }, []);

  // Force hide splash screen when ready
  React.useEffect(() => {
    if (fontsLoaded && dbInitialized) {
      SplashScreen.hideAsync().catch(() => {});
    }
  }, [fontsLoaded, dbInitialized]);

  if (!fontsLoaded || !dbInitialized) {
    // Return a temporary view instead of null to allow view mounting if needed,
    // though null is valid for React, having a view ensures we aren't completely blank if logic hangs
    return <View style={{ flex: 1, backgroundColor: "#FFFFFF" }} />;
  }

  // ...

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <LanguageProvider>
          <StatusBar style="light" backgroundColor="transparent" translucent />
          <AppNavigator />
        </LanguageProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
