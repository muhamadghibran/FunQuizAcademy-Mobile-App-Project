import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useFocusEffect } from "@react-navigation/native";
import { RootStackParamList, Category } from "../types";
import { COLORS } from "../constants/colors";
import { CATEGORIES, QUIZZES } from "../data/quizData";
import { ICONS, IMAGES } from "../constants/images";
import { useQuiz } from "../hooks/useQuiz";
import { getUserName } from "../utils/storage";
import { CircularProgress } from "../components/CircularProgress";

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.56;
const CARD_MARGIN = 16;
const SNAP_INTERVAL = CARD_WIDTH + CARD_MARGIN;

const MATH_ID = "math";
const SCIENCE_ID = "science";
const ANIMALS_ID = "animals";
const SPORT_ID = "sport";
const OTHER_ID = "other";

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { userProgress, loading, loadProgress } = useQuiz();
  const [userName, setUserName] = useState("User");
  const [activeTab, setActiveTab] = useState("home");
  const [activeSlideIndex, setActiveSlideIndex] = useState(0); // <-- Ditambahkan

  useEffect(() => {
    loadUserName();
  }, []);

  useFocusEffect(
    useCallback(() => {
      setActiveTab("home");
      if (loadProgress) {
        loadProgress();
      }
    }, [loadProgress])
  );

  const loadUserName = async () => {
    const name = await getUserName();
    if (name) {
      setUserName(name);
    }
  };

  const handleCategoryPress = (category: Category) => {
    if (category.id === OTHER_ID) {
      console.log("Other Quiz diklik");
      return;
    }

    const categoryQuizzes = QUIZZES[category.id] || [];
    navigation.navigate("Quiz", {
      category,
      quizzes: categoryQuizzes,
    });
  };

  const desiredOrder: { [key: string]: number } = {
    [MATH_ID]: 1,
    [SCIENCE_ID]: 2,
    [ANIMALS_ID]: 3,
    [SPORT_ID]: 4,
  };

  const progressColors: { [key: string]: string } = {
    [MATH_ID]: "#927AFF",
    [SCIENCE_ID]: "#4FABFD",
    [ANIMALS_ID]: "#7EC665",
    [SPORT_ID]: "#F9A825",
    [OTHER_ID]: COLORS.categories.other,
  };

  const progressData: { [key: string]: string } = {
    [MATH_ID]: "60%",
    [SCIENCE_ID]: "40%",
    [ANIMALS_ID]: "60%",
    [SPORT_ID]: "20%",
    [OTHER_ID]: "40%",
  };

  const sortedCategories = [...CATEGORIES].sort((a, b) => {
    const orderA = desiredOrder[a.id] || 99;
    const orderB = desiredOrder[b.id] || 99;
    return orderA - orderB;
  });

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  const categoryImages = [IMAGES.quizSport, IMAGES.quizScience];
  const carouselCategories = CATEGORIES.slice(0, 2);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / (CARD_WIDTH + 16));
    setActiveSlideIndex(index);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <View style={styles.headerTextWrapper}>
            <Text style={styles.greeting}>Hello, {userName}!</Text>
            <Text style={styles.subGreeting}>
              What would you like to play today?
            </Text>
          </View>
          <View style={styles.coinContainer}>
            <Text style={styles.coinText}>{userProgress.coins}</Text>
            <View style={styles.coinIconWrapper}>
              <Image source={ICONS.coinScore} style={styles.coinIcon} />
            </View>
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryScrollContent}
          snapToInterval={CARD_WIDTH + 16}
          decelerationRate="fast"
          onScroll={handleScroll}
          scrollEventThrottle={16}
        >
          {CATEGORIES.slice(0, 2).map((category, index) => (
            <TouchableOpacity
              key={category.id}
              style={[styles.categoryCard, index === 0 && { marginLeft: 20 }]}
              onPress={() => handleCategoryPress(category)}
              activeOpacity={0.9}
            >
              <View style={styles.categoryImageContainer}>
                <Image
                  source={categoryImages[index]}
                  style={styles.categoryImage}
                  resizeMode="cover"
                />
              </View>
              <View style={styles.categoryContent}>
                <Text style={styles.categoryTitle}>{category.name}</Text>
                <View style={styles.progressRow}>
                  <Text style={styles.categoryQuestions}>
                    {category.totalQuestions} Questions
                  </Text>
                  <View style={styles.progressBarContainer}>
                    <View
                      style={[
                        styles.progressBar,
                        {
                          width: index === 0 ? "60%" : "40%",
                          backgroundColor: index === 0 ? "#6366F1" : "#EF4444",
                        },
                      ]}
                    />
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.paginationDots}>
          {carouselCategories.map((_, index) => (
            <View
              key={`dot-${index}`}
              style={[
                styles.dot,
                activeSlideIndex === index && styles.dotActive,
              ]}
            />
          ))}
          <View style={styles.dot} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Unfinished Games</Text>
          {sortedCategories.map((category) => {
            const color = progressColors[category.id];
            const progress = progressData[category.id];
            if (!color || !progress) return null;
            return (
              <TouchableOpacity
                key={category.id}
                style={styles.gameCard}
                onPress={() => handleCategoryPress(category)}
                activeOpacity={0.8}
              >
                <View
                  style={[
                    styles.gameIconContainer,
                    { backgroundColor: category.color },
                  ]}
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
                    progress={progress}
                    color={color}
                  />
                </View>
              </TouchableOpacity>
            );
          })}

          <TouchableOpacity
            style={styles.gameCard}
            activeOpacity={0.8}
            onPress={() =>
              handleCategoryPress({
                id: OTHER_ID,
                name: "Other Quiz",
                icon: ICONS.listOther,
                color: COLORS.categories.other,
                totalQuestions: 20,
                isLocked: false,
                description: "Lainnya",
              })
            }
          >
            <View
              style={[
                styles.gameIconContainer,
                { backgroundColor: COLORS.categories.other },
              ]}
            >
              <Image source={ICONS.listOther} style={styles.gameIcon} />
            </View>
            <View style={styles.gameInfo}>
              <Text style={styles.gameTitle}>Other Quiz</Text>
              <Text style={styles.gameQuestions}>20 Questions</Text>
            </View>
            <View style={styles.progressCircleContainer}>
              <CircularProgress
                size={52}
                strokeWidth={5}
                progress={"40%"}
                color={COLORS.categories.other}
              />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>

      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => setActiveTab("home")}
        >
          <Image
            source={ICONS.tabHome}
            style={[
              styles.navIcon,
              activeTab === "home" && { tintColor: "#6366F1" },
            ]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => setActiveTab("quiz")}
        >
          <Image
            source={ICONS.tabQuiz}
            style={[
              styles.navIcon,
              activeTab === "quiz" && { tintColor: "#6366F1" },
            ]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("RankScreen")}
        >
          <Image
            source={ICONS.tabRank}
            style={[
              styles.navIcon,
              activeTab === "rank" && { tintColor: "#6366F1" },
            ]}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.homeBackground,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: COLORS.homeBackground,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    fontSize: 18,
    color: COLORS.textDark,
    fontWeight: "600",
  },
  scrollContent: {
    paddingTop: 60,
    paddingBottom: 100,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  headerTextWrapper: {
    flex: 1,
    marginRight: 10,
  },
  greeting: {
    fontSize: 18,
    fontWeight: "500",
    color: "#46557B",
    marginBottom: 5,
  },
  subGreeting: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#46557B",
    lineHeight: 30,
  },
  coinContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#927AFF",
    paddingLeft: 14,
    paddingRight: 6,
    paddingVertical: 6,
    borderRadius: 20,
    flexShrink: 0,
  },
  coinText: {
    fontSize: 15,
    fontWeight: "bold",
    color: COLORS.white,
    marginRight: 6,
  },
  coinIconWrapper: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
  },
  coinIcon: {
    width: 18,
    height: 18,
  },
  categoryScrollContent: {
    paddingRight: 20,
  },
  categoryCard: {
    width: CARD_WIDTH,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    overflow: "hidden",
    marginRight: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  categoryImageContainer: {
    width: "100%",
    height: 140,
    alignItems: "center",
    justifyContent: "center",
  },
  categoryImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  categoryContent: {
    padding: 16,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#46557B",
    marginBottom: 8,
  },
  categoryQuestions: {
    fontSize: 13,
    color: "#46557B",
  },
  progressBarContainer: {
    height: 6,
    backgroundColor: "#E5E7EB",
    borderRadius: 3,
    overflow: "hidden",
    flex: 1,
    marginLeft: 12,
  },
  progressRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  progressBar: {
    height: "100%",
    borderRadius: 3,
  },
  paginationDots: {
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingLeft: 20,
    alignItems: "center",
    marginTop: 15,
    marginBottom: 25,
    gap: 4,
  },
  dot: {
    width: 24,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#E0E7FF",
  },
  dotActive: {
    width: 24,
    backgroundColor: "#6366F1",
  },
  section: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#46557B",
    marginBottom: 15,
  },
  gameCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  gameIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  gameIcon: {
    width: 50,
    height: 50,
  },
  gameIconText: {
    fontSize: 22,
  },
  gameInfo: {
    flex: 1,
  },
  gameTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#46557B",
    marginBottom: 3,
  },
  gameQuestions: {
    fontSize: 12,
    color: "#46557B",
  },
  progressCircleContainer: {
    marginLeft: 10,
    width: 52,
    height: 52,
  },
  bottomSpacing: {
    height: 20,
  },
  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
    paddingVertical: 10,
    paddingHorizontal: 40,
    justifyContent: "space-around",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 5,
  },
  navItem: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  navIcon: {
    width: 30,
    height: 30,
    tintColor: "#9CA3AF",
  },
});
