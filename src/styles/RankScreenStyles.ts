import { StyleSheet } from "react-native";
import { COLORS } from "../constants/colors";
import { FONT } from "../constants/fontfamily";

export const styles = StyleSheet.create({
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
