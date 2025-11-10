import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  StatusBar,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { LinearGradient } from "expo-linear-gradient";
import { RootStackParamList } from "../types";
import { ILLUSTRATIONS } from "../constants/images";
import { FONT } from "../constants/fontfamily";
import { COLORS } from "../constants/colors";

type WelcomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Welcome"
>;

interface WelcomeScreenProps {
  navigation: WelcomeScreenNavigationProp;
}

const { width, height } = Dimensions.get("window");

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  decorativeContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  togaTop: {
    position: "absolute",
    width: 130,
    height: 130,
    top: 30,
    left: 0,
    opacity: 1,
  },
  coinTopCenter: {
    position: "absolute",
    width: 60,
    height: 60,
    top: height * 0.07,
    left: "38%",
    opacity: 1,
  },
  coinTopRight: {
    position: "absolute",
    width: 130,
    height: 130,
    top: 0,
    right: 0,
    opacity: 1,
  },
  coinBottomLeft: {
    position: "absolute",
    width: 60,
    height: 60,
    bottom: height * 0.4,
    left: "10%",
    opacity: 1,
  },
  coinMidRight: {
    position: "absolute",
    width: 50,
    height: 50,
    top: height * 0.29,
    right: "16%",
    opacity: 1,
  },
  pinkBookBottom: {
    position: "absolute",
    width: 130,
    height: 80,
    bottom: height * 0.36,
    right: "5%",
    opacity: 1,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: height * 0.12,
    paddingBottom: height * 0.08,
    paddingHorizontal: 30,
  },
  illustrationWrapper: {
    width: width * 0.9,
    height: height * 0.45,
    alignItems: "center",
    justifyContent: "center",
    marginTop: height * 0.03,
  },
  illustration: {
    width: "100%",
    height: "100%",
  },
  textWrapper: {
    bottom: height * 0.02,
  },
  title: {
    fontSize: 35,
    color: COLORS.white,
    textAlign: "left",
    lineHeight: 40,
    fontFamily: FONT.medium,
  },
  subtitle: {
    fontSize: 18,
    color: COLORS.white,
    marginTop: 12,
    opacity: 0.92,
    lineHeight: 22,
    fontFamily: FONT.medium,
  },
  boldText: {
    fontFamily: FONT.bold,
  },
  button: {
    backgroundColor: COLORS.white,
    paddingVertical: 20,
    paddingHorizontal: 120,
    borderRadius: 30,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: FONT.semiBold,
    color: COLORS.textDark,
    letterSpacing: 0.8,
  },
});
