import React from "react";
import { View, Text, TouchableOpacity, Image, StatusBar } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { LinearGradient } from "expo-linear-gradient";
import { RootStackParamList } from "../types";
import { ILLUSTRATIONS } from "../constants/images";
import { styles } from "../styles/WelcomeScreenStyles";

type WelcomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Welcome"
>;

interface WelcomeScreenProps {
  navigation: WelcomeScreenNavigationProp;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ navigation }) => {
  return (
    <LinearGradient
      colors={["#644A94", "#5D458D", "#2B2356"]}
      locations={[0, 0.5, 1]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.container}
    >
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <View style={styles.decorativeContainer}>
        <Image source={ILLUSTRATIONS.togaBooks} style={styles.togaTop} />
        <Image source={ILLUSTRATIONS.coinMedium} style={styles.coinTopCenter} />
        <Image source={ILLUSTRATIONS.coinLarge} style={styles.coinTopRight} />
        <Image source={ILLUSTRATIONS.coinSmall} style={styles.coinBottomLeft} />
        <Image source={ILLUSTRATIONS.coinSmall} style={styles.coinMidRight} />
        <Image source={ILLUSTRATIONS.pinkBook} style={styles.pinkBookBottom} />
      </View>

      <View style={styles.content}>
        <View style={styles.illustrationWrapper}>
          <Image
            source={ILLUSTRATIONS.onboardingMain}
            style={styles.illustration}
            resizeMode="contain"
          />
        </View>

        <View style={styles.textWrapper}>
          <Text style={styles.title}>Welcome</Text>
          <Text style={styles.title}>
            to <Text style={styles.boldText}>FunQuiz</Text> Academy!
          </Text>
          <Text style={styles.subtitle}>
            Play, Learn, and Explore with Exciting Quizzes!
          </Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Login")}
          activeOpacity={0.85}
        >
          <Text style={styles.buttonText}>GET STARTED</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};
