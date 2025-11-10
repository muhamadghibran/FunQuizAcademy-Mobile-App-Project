import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { LinearGradient } from "expo-linear-gradient";
import { RootStackParamList } from "../types";
import { COLORS, GRADIENTS } from "../constants/colors";
import { FONT } from "../constants/fontfamily";
import { ICONS } from "../constants/images";

const MOCKAPI_URL = "https://690ef118bd0fefc30a062389.mockapi.io/leaderboard";

type RankScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "RankScreen"
>;

interface RankScreenProps {
  navigation: RankScreenNavigationProp;
}

type UserScore = {
  id: string;
  name: string;
  score: number;
  avatar: string;
};

export const RankScreen: React.FC<RankScreenProps> = ({ navigation }) => {
  const [scores, setScores] = useState<UserScore[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(MOCKAPI_URL);
      if (!response.ok) {
        throw new Error("Gagal mengambil data skor");
      }
      const data: UserScore[] = await response.json();
      const sortedData = data.sort((a, b) => b.score - a.score);
      setScores(sortedData);
    } catch (e) {
      setError("Terjadi kesalahan. Coba lagi nanti.");
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const renderScoreRow = ({
    item,
    index,
  }: {
    item: UserScore;
    index: number;
  }) => {
    const avatarSource = item.avatar;

    return (
      <View style={styles.scoreCard}>
        <Text style={styles.rankNumber}>{index + 1}</Text>
        <View style={styles.nameContainer}>
          {avatarSource ? (
            <Image source={{ uri: avatarSource }} style={styles.avatar} />
          ) : (
            <View style={styles.avatar} />
          )}
          <Text style={styles.nameText}>{item.name}</Text>
        </View>
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreText}>{item.score}</Text>
          <Image source={ICONS.coinScore} style={styles.coinIcon} />
        </View>
      </View>
    );
  };

  const renderContent = () => {
    if (loading) {
      return (
        <ActivityIndicator
          size="large"
          color={COLORS.white}
          style={styles.centered}
        />
      );
    }
    if (error) {
      return <Text style={[styles.errorText, styles.centered]}>{error}</Text>;
    }

    return (
      <FlatList
        data={scores}
        renderItem={renderScoreRow}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
    );
  };

  return (
    <LinearGradient colors={[...GRADIENTS.background]} style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Text style={styles.closeIcon}>✕</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Leaderboard</Text>
        <View style={styles.headerSpacer} />
      </View>
      {renderContent()}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  closeButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
  headerSpacer: {
    width: 44,
    height: 44,
  },
  closeIcon: {
    fontSize: 22,
    color: COLORS.white,
    fontWeight: "600",
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: FONT.semiBold,
    color: COLORS.white,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  scoreCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 15,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  rankNumber: {
    fontSize: 18,
    fontFamily: FONT.semiBold,
    color: COLORS.textDark,
    width: 30,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E0E7FF",
    marginRight: 15,
  },
  nameContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
  },
  nameText: {
    fontSize: 16,
    fontFamily: FONT.medium,
    color: COLORS.textDark,
  },
  errorText: {
    fontSize: 16,
    fontFamily: FONT.medium,
    color: COLORS.white,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  scoreText: {
    fontSize: 16,
    fontFamily: FONT.semiBold,
    color: COLORS.primary,
    marginRight: 6,
  },
  scoreContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  coinIcon: {
    width: 18,
    height: 18,
  },
});
