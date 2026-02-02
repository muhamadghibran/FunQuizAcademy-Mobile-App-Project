import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types";
import { COLORS } from "../constants/colors";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { getUserProgress, getUserName } from "../utils/storage";
import { getQuizHistory } from "../services/DatabaseService";
import { BottomNavigation } from "../components/home/BottomNavigation";
import { Ionicons } from "@expo/vector-icons";
import { useLanguage } from "../context/LanguageContext";
import { styles } from "../styles/ProfileScreenStyles";

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Profile"
>;

export const ProfileScreen = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const [activeTab, setActiveTab] = useState("profile");
  const { t } = useLanguage();
  const [user, setUser] = useState({
    userName: "User",
    level: 1,
    score: 0,
    quizzesPlayed: 0,
  });

  useFocusEffect(
    React.useCallback(() => {
      loadData();
    }, []),
  );

  const loadData = async () => {
    try {
      const storedName = await getUserName();
      const userData = await getUserProgress();
      const history = await getQuizHistory();

      const displayScore = userData?.score || 0;
      const displayLevel = userData?.level || 1;
      const displayName = storedName || userData?.userName || "User";

      setUser({
        userName: displayName,
        level: displayLevel,
        score: displayScore,
        quizzesPlayed: history ? history.length : 0,
      });
    } catch (e) {}
  };

  const menuItems = [
    {
      id: "settings",
      title: t("settings"),
      icon: "settings-outline",
      onPress: () => navigation.navigate("Settings"),
    },
    {
      id: "stats",
      title: t("myStatistics"),
      icon: "bar-chart-outline",
      onPress: () => navigation.navigate("Statistics"),
    },
    {
      id: "logout",
      title: t("logOut"),
      icon: "log-out-outline",
      color: "#EF4444",
      onPress: () => {
        navigation.reset({ index: 0, routes: [{ name: "Login" }] });
      },
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{t("profileTitle")}</Text>
        </View>

        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Image
              source={require("../../assets/images/illustrations/illust_onboarding_main.png")}
              style={styles.avatar}
            />
          </View>
          <Text style={styles.userName}>{user.userName}</Text>
          <Text style={styles.userLevel}>
            {t("level")} {user.level} {t("quizzer")}
          </Text>
        </View>

        <View style={styles.statsCard}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{user.quizzesPlayed}</Text>
            <Text style={styles.statLabel}>{t("quizzes")}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{user.score}</Text>
            <Text style={styles.statLabel}>{t("points")}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>
              #{Math.max(1, 10 - user.level)}
            </Text>
            <Text style={styles.statLabel}>{t("rank")}</Text>
          </View>
        </View>

        <View style={styles.menuContainer}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={item.onPress}
              activeOpacity={0.7}
            >
              <View
                style={[
                  styles.menuIconContainer,
                  item.color ? { backgroundColor: item.color + "20" } : {},
                ]}
              >
                <Ionicons
                  name={item.icon as any}
                  size={22}
                  color={item.color || COLORS.primary}
                />
              </View>
              <Text
                style={[
                  styles.menuTitle,
                  item.color ? { color: item.color } : {},
                ]}
              >
                {item.title}
              </Text>
              <Ionicons
                name="chevron-forward"
                size={20}
                color="#C4C4C4"
                style={styles.menuArrow}
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <BottomNavigation
        activeTab={activeTab}
        onNavigateHome={() => navigation.navigate("Home")}
        onNavigateProfile={() => {}}
        onNavigateRank={() => navigation.navigate("RankScreen")}
      />
    </SafeAreaView>
  );
};
