import React from "react";
import { View, Text } from "react-native";
import { styles } from "../../styles/LoginScreenStyles";

export const WelcomeText: React.FC = () => {
  return (
    <View style={styles.textWrapper}>
      <Text style={styles.title}>Welcome</Text>
      <Text style={styles.title}>
        to <Text style={styles.boldText}>FunQuiz</Text> Academy!
      </Text>
      <Text style={styles.subtitle}>
        Play, Learn, and Explore with Exciting Quizzes!
      </Text>
    </View>
  );
};
