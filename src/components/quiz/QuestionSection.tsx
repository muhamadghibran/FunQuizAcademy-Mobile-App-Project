import React from "react";
import { View, Text, Image } from "react-native";
import { styles } from "../../styles/QuizScreenStyles";
import { useLanguage } from "../../context/LanguageContext";

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
  const { t } = useLanguage();
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
        {t("questionOf")} {currentQuestionIndex + 1} {t("of")} {totalQuestions}
      </Text>
      <Text style={[styles.question, isTablet && styles.questionTablet]}>
        {question}
      </Text>
    </View>
  );
};
