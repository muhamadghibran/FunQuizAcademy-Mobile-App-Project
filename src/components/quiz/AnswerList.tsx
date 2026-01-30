import React from "react";
import { View } from "react-native";
import { AnswerButton } from "../AnswerButton";
import { styles } from "../../styles/QuizScreenStyles";

interface AnswerItem {
  id: string;
  text: string;
  state: "correct" | "wrong" | "default" | "disabled" | "hidden";
  isCorrectAnswer: boolean;
}

interface AnswerListProps {
  answers: AnswerItem[];
  isTablet: boolean;
  onAnswerSelect: (text: string) => void;
  disabled: boolean;
}

export const AnswerList: React.FC<AnswerListProps> = ({
  answers,
  isTablet,
  onAnswerSelect,
  disabled,
}) => {
  return (
    <View
      style={[styles.answersContainer, isTablet && styles.gridAnswersContainer]}
    >
      {answers.map((answer) => (
        <View key={answer.id} style={isTablet ? styles.gridItem : null}>
          <AnswerButton
            text={answer.text}
            state={answer.state}
            onPress={() => onAnswerSelect(answer.text)}
            disabled={disabled}
          />
        </View>
      ))}
    </View>
  );
};
