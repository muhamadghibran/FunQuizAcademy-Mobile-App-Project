import React from "react";
import { View, Text, Image } from "react-native";
import { ICONS } from "../../constants/images";
import { styles } from "../../styles/HomeScreenStyles";

interface HomeHeaderProps {
  userName: string;
  coins: number;
}

export const HomeHeader: React.FC<HomeHeaderProps> = ({ userName, coins }) => {
  return (
    <View style={styles.header}>
      <View style={styles.headerTextWrapper}>
        <Text style={styles.greeting}>Hello, {userName}!</Text>
        <Text style={styles.subGreeting}>
          What would you like to play today?
        </Text>
      </View>
      <View style={styles.coinContainer}>
        <Text style={styles.coinText}>{coins}</Text>
        <View style={styles.coinIconWrapper}>
          <Image source={ICONS.coinScore} style={styles.coinIcon} />
        </View>
      </View>
    </View>
  );
};
