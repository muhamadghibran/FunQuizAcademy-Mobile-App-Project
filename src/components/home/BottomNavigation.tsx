import React from "react";
import { View, TouchableOpacity, Image } from "react-native";
import { ICONS } from "../../constants/images";
import { styles } from "../../styles/HomeScreenStyles";

interface BottomNavigationProps {
  activeTab: string;
  onNavigateHome: () => void;
  onNavigateProfile: () => void;
  onNavigateRank: () => void;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  activeTab,
  onNavigateHome,
  onNavigateProfile,
  onNavigateRank,
}) => {
  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity style={styles.navItem} onPress={onNavigateHome}>
        <Image
          source={ICONS.tabHome}
          style={[
            styles.navIcon,
            activeTab === "home" && { tintColor: "#6366F1" },
          ]}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={onNavigateProfile}>
        <Image
          source={ICONS.tabQuiz}
          style={[
            styles.navIcon,
            activeTab === "profile" && { tintColor: "#6366F1" },
          ]}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={onNavigateRank}>
        <Image
          source={ICONS.tabRank}
          style={[
            styles.navIcon,
            activeTab === "rank" && { tintColor: "#6366F1" },
          ]}
        />
      </TouchableOpacity>
    </View>
  );
};
