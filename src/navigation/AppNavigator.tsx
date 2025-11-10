import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParamList } from "../types";
import { WelcomeScreen } from "../screens/WelcomeScreen";
import { LoginScreen } from "../screens/LoginScreen";
import { HomeScreen } from "../screens/HomeScreen";
import { QuizScreen } from "../screens/QuizScreen";
import { RankScreen } from "../screens/RankScreen";

const Stack = createStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          cardStyleInterpolator: ({ current: { progress } }) => ({
            cardStyle: {
              opacity: progress,
            },
          }),
        }}
      >
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{
            gestureEnabled: false,
          }}
        />

        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            gestureEnabled: false,
          }}
        />

        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            gestureEnabled: false,
          }}
        />

        <Stack.Screen name="Quiz" component={QuizScreen} />
        <Stack.Screen name="RankScreen" component={RankScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
