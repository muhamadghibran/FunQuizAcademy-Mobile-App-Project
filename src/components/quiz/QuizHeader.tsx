import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { COLORS } from "../../constants/colors";
import { ICONS } from "../../constants/images";
import { styles } from "../../styles/QuizScreenStyles";

interface QuizHeaderProps {
  isTablet: boolean;
  onClose: () => void;
  fillPercentage: number;
  timeLeft: number;
  coins: number;
}

export const QuizHeader: React.FC<QuizHeaderProps> = ({
  isTablet,
  onClose,
  fillPercentage,
  timeLeft,
  coins,
}) => {
  return (
    <View style={[styles.header, isTablet && styles.headerTablet]}>
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Text style={styles.closeIcon}>✕</Text>
      </TouchableOpacity>
      <View style={styles.timerWrapper}>
        <AnimatedCircularProgress
          size={56}
          width={3}
          fill={fillPercentage}
          tintColor={COLORS.white}
          backgroundColor="rgba(255,255,255,0.15)"
          rotation={0}
          duration={950}
        >
          {() => (
            <Text style={styles.timerText}>
              {String(timeLeft).padStart(2, "0")}
            </Text>
          )}
        </AnimatedCircularProgress>
      </View>
      <View style={styles.coinDisplay}>
        <Text style={styles.coinText}>{coins}</Text>
        <View style={styles.coinIconWrapper}>
          <Image source={ICONS.coinScore} style={styles.coinIcon} />
        </View>
      </View>
    </View>
  );
};
