import React, { useState, useEffect } from "react";
import { Alert } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  GoogleSignin,
  statusCodes,
  isErrorWithCode,
} from "@react-native-google-signin/google-signin";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { auth } from "../config/firebase";
import { RootStackParamList } from "../types";
import { initializeUserProgress } from "../utils/storage";
import { LoginBackground } from "../components/login/LoginBackground";
import { MainLoginView } from "../components/login/MainLoginView";
import { NameInputView } from "../components/login/NameInputView";

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Login"
>;

interface LoginScreenProps {
  navigation: LoginScreenNavigationProp;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [showNameInput, setShowNameInput] = useState(false);
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        "872676563356-v3qcfb1aa5gljoegp6a9a2fpb9s99bnq.apps.googleusercontent.com",
      offlineAccess: true,
      forceCodeForRefreshToken: true,
    });
  }, []);

  const handleGoogleLogin = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const idToken = userInfo.data?.idToken;

      if (!idToken) throw new Error("Google ID Token missing.");

      const googleCredential = GoogleAuthProvider.credential(idToken);
      await handleFirebaseSignIn(googleCredential);
    } catch (error: any) {
      setIsLoading(false);
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.SIGN_IN_CANCELLED:
            break;
          case statusCodes.IN_PROGRESS:
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            Alert.alert("Error", "Google Play Services unavailable");
            break;
          default:
            console.error("Native Error:", error);
            Alert.alert("Login Failed", error.message || "Unknown error");
        }
      } else {
        Alert.alert("Error", "System error");
        console.error(error);
      }
    }
  };

  const handleFirebaseSignIn = async (credential: any) => {
    try {
      const userCredential = await signInWithCredential(auth, credential);
      await initializeUserProgress(userCredential.user.displayName || "User");
      setIsLoading(false);
      navigation.replace("Home");
    } catch (error: any) {
      console.error("Firebase Auth Error:", error);
      Alert.alert("Login Failed", error.message);
      setIsLoading(false);
    }
  };

  const handleGetStarted = async () => {
    if (name.trim().length < 2) {
      Alert.alert("Invalid Name", "Min 2 characters");
      return;
    }
    try {
      await initializeUserProgress(name.trim());
      navigation.replace("Home");
    } catch (error) {
      console.error("Error initializing user:", error);
      Alert.alert("Error", "Failed to create profile.");
    }
  };

  return (
    <LoginBackground>
      {showNameInput ? (
        <NameInputView
          name={name}
          setName={setName}
          onSubmit={handleGetStarted}
        />
      ) : (
        <MainLoginView
          onGoogleLogin={handleGoogleLogin}
          onManualLogin={() => setShowNameInput(true)}
        />
      )}
    </LoginBackground>
  );
};
