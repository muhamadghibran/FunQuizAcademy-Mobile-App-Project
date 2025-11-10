import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Dimensions,
  Alert,
  StatusBar,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { LinearGradient } from "expo-linear-gradient";
import { RootStackParamList } from "../types";
import { ICONS, ILLUSTRATIONS } from "../constants/images";
import { initializeUserProgress } from "../utils/storage";
import { FONT } from "../constants/fontfamily";
import { COLORS } from "../constants/colors";

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Login"
>;

interface LoginScreenProps {
  navigation: LoginScreenNavigationProp;
}

const { width, height } = Dimensions.get("window");

export const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [showNameInput, setShowNameInput] = useState(false);
  const [name, setName] = useState("");

  const handleGoogleLoginAlert = () => {
    Alert.alert(
      "Fitur Segera Hadir",
      "Login dengan Google akan tersedia di update berikutnya."
    );
  };

  const handleShowNameInput = () => {
    setShowNameInput(true);
  };

  const handleGetStarted = async () => {
    if (name.trim().length < 2) {
      Alert.alert(
        "Invalid Name",
        "Please enter your name (at least 2 characters)"
      );
      return;
    }

    try {
      await initializeUserProgress(name.trim());
      navigation.replace("Home");
    } catch (error) {
      console.error("Error initializing user:", error);
      Alert.alert("Error", "Failed to create user profile. Please try again.");
    }
  };

  if (showNameInput) {
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
          <Image
            source={ILLUSTRATIONS.coinMedium}
            style={styles.coinTopCenter}
          />
          <Image source={ILLUSTRATIONS.coinLarge} style={styles.coinTopRight} />
          <Image
            source={ILLUSTRATIONS.coinSmall}
            style={styles.coinBottomLeft}
          />
          <Image source={ILLUSTRATIONS.coinSmall} style={styles.coinMidRight} />
          <Image
            source={ILLUSTRATIONS.pinkBook}
            style={styles.pinkBookBottom}
          />
        </View>

        <View style={styles.contentInputName}>
          <View style={styles.textWrapper}>
            <Text style={styles.title}>Welcome</Text>
            <Text style={styles.title}>
              to <Text style={styles.boldText}>FunQuiz</Text> Academy!
            </Text>
            <Text style={styles.subtitle}>
              Play, Learn, and Explore with Exciting Quizzes!
            </Text>
          </View>

          <View style={styles.inputCard}>
            <Text style={styles.cardTitle}>Hello There!</Text>
            <Text style={styles.cardSubtitle}>
              What would you like to play today?
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Enter your name"
              placeholderTextColor={COLORS.textGray}
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
              returnKeyType="done"
              onSubmitEditing={handleGetStarted}
            />

            <TouchableOpacity
              style={styles.getStartedButton}
              onPress={handleGetStarted}
              activeOpacity={0.8}
            >
              <Text style={styles.getStartedText}>GET STARTED</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    );
  }
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

      <View style={styles.loginContent}>
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

        <View style={styles.buttonSection}>
          <TouchableOpacity
            style={styles.googleButton}
            onPress={handleGoogleLoginAlert}
            activeOpacity={0.9}
          >
            <Image source={ICONS.googleG} style={styles.googleIcon} />
            <Text style={styles.googleButtonText} numberOfLines={1}>
              LOGIN WITH GOOGLE
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleShowNameInput}
            style={styles.getStartedLink}
          >
            <Text style={styles.getStartedLinkText}>GET STARTED</Text>
          </TouchableOpacity>
        </View>
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

  loginContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: height * 0.12,
    paddingBottom: height * 0.08,
    paddingHorizontal: 30,
  },
  contentInputName: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
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
    width: "100%",
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
  buttonSection: {
    width: "100%",
    alignItems: "center",
  },
  googleButton: {
    flexDirection: "row",
    backgroundColor: COLORS.white,
    paddingVertical: 20,
    width: "100%",
    borderRadius: 35,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  googleIcon: {
    width: 24,
    height: 24,
    position: "absolute",
    left: 20,
  },
  googleButtonText: {
    fontSize: 16,
    fontFamily: FONT.semiBold,
    color: COLORS.textDark,
    letterSpacing: 0.8,
    textAlign: "center",
    flex: 1,
  },
  getStartedLink: {
    marginTop: 20,
    alignItems: "center",
  },
  getStartedLinkText: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.white,
    textDecorationLine: "underline",
    fontFamily: FONT.semiBold,
  },

  inputCard: {
    backgroundColor: COLORS.white,
    borderRadius: 30,
    padding: 30,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  cardTitle: {
    fontSize: 24,
    fontFamily: FONT.bold,
    color: COLORS.textDark,
    marginBottom: 10,
    textAlign: "center",
  },
  cardSubtitle: {
    fontSize: 14,
    color: COLORS.textDark,
    marginBottom: 20,
    textAlign: "center",
    fontFamily: FONT.medium,
  },
  input: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.primary,
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 20,
    fontSize: 16,
    color: COLORS.textDark,
    marginBottom: 20,
    fontFamily: FONT.medium,
  },
  getStartedButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: "center",
  },
  getStartedText: {
    fontSize: 16,
    color: COLORS.white,
    letterSpacing: 0.5,
    fontFamily: FONT.semiBold,
  },
});
