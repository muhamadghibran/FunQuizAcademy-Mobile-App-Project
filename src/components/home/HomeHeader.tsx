import React from "react";
import { View, Text, Image } from "react-native";
import { ICONS } from "../../constants/images";
import { styles } from "../../styles/HomeScreenStyles";
import { useLanguage } from "../../context/LanguageContext";

interface HomeHeaderProps {
  userName: string;
  coins: number;
}

export const HomeHeader: React.FC<HomeHeaderProps> = ({ userName, coins }) => {
  const { t } = useLanguage();

  return (
    <View style={styles.header}>
      <View style={styles.headerTextWrapper}>
        <Text style={styles.greeting}>
          {t("hello")}, {userName}!
        </Text>
        <Text style={styles.subGreeting}>{t("playGreeting")}</Text>
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
