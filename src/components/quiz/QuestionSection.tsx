import React from "react";
import { View, Text, Image } from "react-native";
import { styles } from "../../styles/QuizScreenStyles";

interface QuestionSectionProps {
  isTablet: boolean;
  image?: any;
  currentQuestionIndex: number;
  totalQuestions: number;
  question: string;
}

export const QuestionSection: React.FC<QuestionSectionProps> = ({
  isTablet,
  image,
  currentQuestionIndex,
  totalQuestions,
  question,
}) => {
  return (
    <View style={styles.topSection}>
      {image && (
        <View
          style={[
            styles.imageContainer,
            isTablet && styles.imageContainerTablet,
          ]}
        >
          <Image source={image} style={styles.image} resizeMode="cover" />
        </View>
      )}
      <Text style={styles.questionNumber}>
        Question {currentQuestionIndex + 1} of {totalQuestions}
      </Text>
      <Text style={[styles.question, isTablet && styles.questionTablet]}>
        {question}
      </Text>
    </View>
  );
};
