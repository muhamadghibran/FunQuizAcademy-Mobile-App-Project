import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import { Category } from "../../types";
import { styles } from "../../styles/HomeScreenStyles";

interface CategoryCarouselProps {
  categories: Category[];
  categoryImages: any[];
  screenWidth: number;
  onCategoryPress: (category: Category) => void;
}

export const CategoryCarousel: React.FC<CategoryCarouselProps> = ({
  categories,
  categoryImages,
  screenWidth,
  onCategoryPress,
}) => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const CARD_WIDTH = screenWidth * 0.56;

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const scrollPosition = event.nativeEvent.contentOffset.x;
      const index = Math.round(scrollPosition / (CARD_WIDTH + 16));
      setActiveSlideIndex(index);
    },
    [CARD_WIDTH],
  );

  return (
    <>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryScrollContent}
        snapToInterval={CARD_WIDTH + 16}
        decelerationRate="fast"
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {categories.map((category, index) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryCard,
              { width: CARD_WIDTH },
              index === 0 && { marginLeft: 20 },
            ]}
            onPress={() => onCategoryPress(category)}
            activeOpacity={0.9}
          >
            <View
              style={[
                styles.categoryImageContainer,
                !(category.id === "sport" || category.id === "science") && {
                  backgroundColor: category.color + "25",
                },
              ]}
            >
              <Image
                source={categoryImages[index]}
                style={[
                  styles.categoryImage,
                  !(category.id === "sport" || category.id === "science") && {
                    resizeMode: "center",
                    width: "60%",
                    height: "60%",
                  },
                ]}
                resizeMode={
                  category.id === "sport" || category.id === "science"
                    ? "cover"
                    : "contain"
                }
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
        {categories.map((_, index) => (
          <View
            key={`dot-${index}`}
            style={[styles.dot, activeSlideIndex === index && styles.dotActive]}
          />
        ))}
      </View>
    </>
  );
};
