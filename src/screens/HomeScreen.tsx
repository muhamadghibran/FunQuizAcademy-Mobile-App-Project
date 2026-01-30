import React, { useEffect, useState, useCallback, useMemo } from "react";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useFocusEffect } from "@react-navigation/native";
import { RootStackParamList, Category } from "../types";
import { COLORS } from "../constants/colors";
import { CATEGORIES, QUIZZES } from "../data/quizData";
import { ICONS, IMAGES } from "../constants/images";
import { useQuiz } from "../hooks/useQuiz";
import { useResponsive } from "../hooks/useResponsive";
import { getUserName } from "../utils/storage";
import { getQuestionsByCategory } from "../services/DatabaseService";
import { styles } from "../styles/HomeScreenStyles";
import { HomeHeader } from "../components/home/HomeHeader";
import { CategoryCarousel } from "../components/home/CategoryCarousel";
import { GameCard } from "../components/home/GameCard";
import { BottomNavigation } from "../components/home/BottomNavigation";

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

const MATH_ID = "math";
const SCIENCE_ID = "science";
const ANIMALS_ID = "animals";
const SPORT_ID = "sport";
const OTHER_ID = "other";

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { userProgress, loading, loadProgress } = useQuiz();
  const { width } = useResponsive();
  const [userName, setUserName] = useState("User");
  const [activeTab, setActiveTab] = useState("home");

  useEffect(() => {
    loadUserName();
  }, []);

  useFocusEffect(
    useCallback(() => {
      setActiveTab("home");
      if (loadProgress) loadProgress();
    }, [loadProgress]),
  );

  const loadUserName = async () => {
    const name = await getUserName();
    if (name) setUserName(name);
  };

  const handleCategoryPress = useCallback(
    async (category: Category) => {
      if (category.id === OTHER_ID) {
        console.log("Other Quiz clicked");
        return;
      }
      try {
        const dbQuestions = await getQuestionsByCategory(category.id);
        const quizzesToUse =
          dbQuestions.length > 0 ? dbQuestions : QUIZZES[category.id] || [];
        navigation.navigate("Quiz", {
          category,
          quizzes: quizzesToUse,
        });
      } catch (e) {
        console.error("Failed to load questions from DB", e);
        navigation.navigate("Quiz", {
          category,
          quizzes: QUIZZES[category.id] || [],
        });
      }
    },
    [navigation],
  );

  const desiredOrder: Record<string, number> = useMemo(
    () => ({
      [MATH_ID]: 1,
      [SCIENCE_ID]: 2,
      [ANIMALS_ID]: 3,
      [SPORT_ID]: 4,
    }),
    [],
  );

  const progressColors: { [key: string]: string } = {
    [MATH_ID]: "#927AFF",
    [SCIENCE_ID]: "#4FABFD",
    [ANIMALS_ID]: "#7EC665",
    [SPORT_ID]: "#F9A825",
    [OTHER_ID]: COLORS.categories.other,
  };

  // Static/Mock progress data
  const progressData: { [key: string]: string } = {
    [MATH_ID]: "60%",
    [SCIENCE_ID]: "40%",
    [ANIMALS_ID]: "60%",
    [SPORT_ID]: "20%",
    [OTHER_ID]: "40%",
  };

  const sortedCategories = useMemo(() => {
    return [...CATEGORIES].sort((a, b) => {
      const orderA = desiredOrder[a.id] || 99;
      const orderB = desiredOrder[b.id] || 99;
      return orderA - orderB;
    });
  }, [desiredOrder]);

  const categoryImages = [IMAGES.quizSport, IMAGES.quizScience];
  const carouselCategories = CATEGORIES.slice(0, 2);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  const renderHeader = () => (
    <>
      <HomeHeader userName={userName} coins={userProgress.coins} />
      <CategoryCarousel
        categories={carouselCategories}
        categoryImages={categoryImages}
        screenWidth={width}
        onCategoryPress={handleCategoryPress}
      />
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Unfinished Games</Text>
      </View>
    </>
  );

  const renderItem = ({ item }: { item: Category }) => {
    const color = progressColors[item.id];
    const progress = progressData[item.id];
    if (!color || !progress) return null;

    return (
      <GameCard
        category={item}
        progressColor={color}
        progressData={progress}
        onPress={() => handleCategoryPress(item)}
      />
    );
  };

  const renderFooter = () => (
    <View style={{ paddingHorizontal: 20 }}>
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
            description: "Others",
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
        {/* Mock progress for Other Quiz */}
      </TouchableOpacity>
      <View style={styles.bottomSpacing} />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={sortedCategories}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.scrollContent}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        showsVerticalScrollIndicator={false}
      />
      <BottomNavigation
        activeTab={activeTab}
        onNavigateHome={() => {
          setActiveTab("home");
          navigation.navigate("Home");
        }}
        onNavigateProfile={() => {
          setActiveTab("profile");
          // navigation.navigate("Profile");
        }}
        onNavigateRank={() => {
          setActiveTab("rank");
          navigation.navigate("RankScreen");
        }}
      />
    </View>
  );
};
