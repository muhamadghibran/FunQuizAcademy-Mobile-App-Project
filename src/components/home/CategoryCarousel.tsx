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
// Helper function to get image source if needed, or passed as prop.
// For simplicity, passing images as parallel prop.

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
        {categories.map((_, index) => (
          <View
            key={`dot-${index}`}
            style={[styles.dot, activeSlideIndex === index && styles.dotActive]}
          />
        ))}
        <View style={styles.dot} />
      </View>
    </>
  );
};
