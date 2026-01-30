import React, { useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AppNavigator } from "./src/navigation/AppNavigator";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { View } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { initDatabase } from "./src/services/DatabaseService";
import "react-native-gesture-handler"; // Ensure side effects

SplashScreen.preventAutoHideAsync();

console.log("App rendering...");

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    "Gilroy-SemiBold": require("./assets/fonts/gilroy-semibold.ttf"),
    "Gilroy-Medium": require("./assets/fonts/Gilroy-Medium.ttf"),
    "Gilroy-Bold": require("./assets/fonts/Gilroy-Bold.ttf"),
  });

  if (fontError) {
    console.error("Font Load Error:", fontError);
  }

  const [dbInitialized, setDbInitialized] = React.useState(false);
  console.log(
    `Render: fontsLoaded=${fontsLoaded}, dbInitialized=${dbInitialized}`,
  );

  console.log(
    `Render: fontsLoaded=${fontsLoaded}, dbInitialized=${dbInitialized}`,
  );

  React.useEffect(() => {
    const init = async () => {
      try {
        console.log("Initializing DB...");
        await initDatabase();
        console.log("DB Initialized");
      } catch (e) {
        console.error("DB Init failed:", e);
      } finally {
        setDbInitialized(true);
      }
    };
    init();
  }, []);

  // Force hide splash screen when ready
  React.useEffect(() => {
    if (fontsLoaded && dbInitialized) {
      console.log("Conditions met. Hiding splash screen via useEffect...");
      SplashScreen.hideAsync().catch((e: unknown) =>
        console.warn("Hide splash failed:", e),
      );
    }
  }, [fontsLoaded, dbInitialized]);

  if (!fontsLoaded || !dbInitialized) {
    // Return a temporary view instead of null to allow view mounting if needed,
    // though null is valid for React, having a view ensures we aren't completely blank if logic hangs
    return <View style={{ flex: 1, backgroundColor: "#FFFFFF" }} />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar style="light" backgroundColor="transparent" translucent />
        <AppNavigator />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
