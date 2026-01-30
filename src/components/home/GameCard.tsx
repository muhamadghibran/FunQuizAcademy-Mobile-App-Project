import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Category } from "../../types";
import { CircularProgress } from "../CircularProgress";
import { styles } from "../../styles/HomeScreenStyles";

interface GameCardProps {
  category: Category;
  progressColor: string;
  progressData: string;
  onPress: () => void;
}

export const GameCard: React.FC<GameCardProps> = ({
  category,
  progressColor,
  progressData,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[styles.gameCard, { marginHorizontal: 20 }]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View
        style={[styles.gameIconContainer, { backgroundColor: category.color }]}
      >
        <Image source={category.icon} style={styles.gameIcon} />
      </View>
      <View style={styles.gameInfo}>
        <Text style={styles.gameTitle}>{category.name}</Text>
        <Text style={styles.gameQuestions}>
          {category.totalQuestions} Questions
        </Text>
      </View>
      <View style={styles.progressCircleContainer}>
        <CircularProgress
          size={52}
          strokeWidth={5}
          progress={progressData}
          color={progressColor}
        />
      </View>
    </TouchableOpacity>
  );
};
