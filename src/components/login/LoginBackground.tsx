import React from "react";
import { View, Image, StatusBar } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ILLUSTRATIONS } from "../../constants/images";
import { styles } from "../../styles/LoginScreenStyles";

export const LoginBackground: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <LinearGradient
      colors={["#644A94", "#5D458D", "#2B2356"]}
      locations={[0, 0.5, 1]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.container}
    >
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <View style={styles.decorativeContainer}>
        <Image source={ILLUSTRATIONS.togaBooks} style={styles.togaTop} />
        <Image source={ILLUSTRATIONS.coinMedium} style={styles.coinTopCenter} />
        <Image source={ILLUSTRATIONS.coinLarge} style={styles.coinTopRight} />
        <Image source={ILLUSTRATIONS.coinSmall} style={styles.coinBottomLeft} />
        <Image source={ILLUSTRATIONS.coinSmall} style={styles.coinMidRight} />
        <Image source={ILLUSTRATIONS.pinkBook} style={styles.pinkBookBottom} />
      </View>
      {children}
    </LinearGradient>
  );
};
