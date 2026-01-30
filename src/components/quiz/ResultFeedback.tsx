import React from "react";
import { Text, Image } from "react-native";
import Animated, { ZoomIn } from "react-native-reanimated";
import { ILLUSTRATIONS } from "../../constants/images";
import { styles } from "../../styles/QuizScreenStyles";

interface ResultFeedbackProps {
  isCorrect: boolean;
}

export const ResultFeedback: React.FC<ResultFeedbackProps> = ({
  isCorrect,
}) => {
  return (
    <Animated.View entering={ZoomIn} style={styles.resultInfo}>
      <Text style={styles.resultText}>
        {isCorrect
          ? "That's the right Answer! +10 Coins"
          : "Oops! Wrong Answer"}
      </Text>
      <Image source={ILLUSTRATIONS.coinMedium} style={styles.resultCoinIcon} />
    </Animated.View>
  );
};
