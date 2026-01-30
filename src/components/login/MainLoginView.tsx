import React from "react";
import { View, Image, TouchableOpacity, Text } from "react-native";
import { ILLUSTRATIONS, ICONS } from "../../constants/images";
import { styles } from "../../styles/LoginScreenStyles";
import { WelcomeText } from "./WelcomeText";

interface MainLoginViewProps {
  onGoogleLogin: () => void;
  onManualLogin: () => void;
}

export const MainLoginView: React.FC<MainLoginViewProps> = ({
  onGoogleLogin,
  onManualLogin,
}) => {
  return (
    <View style={styles.loginContent}>
      <View style={styles.illustrationWrapper}>
        <Image
          source={ILLUSTRATIONS.onboardingMain}
          style={styles.illustration}
          resizeMode="contain"
        />
      </View>

      <WelcomeText />

      <View style={styles.buttonSection}>
        <TouchableOpacity
          style={styles.googleButton}
          onPress={onGoogleLogin}
          activeOpacity={0.9}
        >
          <Image source={ICONS.googleG} style={styles.googleIcon} />
          <Text style={styles.googleButtonText} numberOfLines={1}>
            LOGIN WITH GOOGLE
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onManualLogin} style={styles.getStartedLink}>
          <Text style={styles.getStartedLinkText}>GET STARTED</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
