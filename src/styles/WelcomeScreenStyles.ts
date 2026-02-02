import { StyleSheet, Dimensions } from "react-native";
import { COLORS } from "../constants/colors";
import { FONT } from "../constants/fontfamily";

const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  decorativeContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  togaTop: {
    position: "absolute",
    width: 130,
    height: 130,
    top: 30,
    left: 0,
    opacity: 1,
  },
  coinTopCenter: {
    position: "absolute",
    width: 60,
    height: 60,
    top: height * 0.07,
    left: "38%",
    opacity: 1,
  },
  coinTopRight: {
    position: "absolute",
    width: 130,
    height: 130,
    top: 0,
    right: 0,
    opacity: 1,
  },
  coinBottomLeft: {
    position: "absolute",
    width: 60,
    height: 60,
    bottom: height * 0.4,
    left: "10%",
    opacity: 1,
  },
  coinMidRight: {
    position: "absolute",
    width: 50,
    height: 50,
    top: height * 0.29,
    right: "16%",
    opacity: 1,
  },
  pinkBookBottom: {
    position: "absolute",
    width: 130,
    height: 80,
    bottom: height * 0.36,
    right: "5%",
    opacity: 1,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: height * 0.12,
    paddingBottom: height * 0.08,
    paddingHorizontal: 30,
  },
  illustrationWrapper: {
    width: width * 0.9,
    height: height * 0.45,
    alignItems: "center",
    justifyContent: "center",
    marginTop: height * 0.03,
  },
  illustration: {
    width: "100%",
    height: "100%",
  },
  textWrapper: {
    bottom: height * 0.02,
  },
  title: {
    fontSize: 35,
    color: COLORS.white,
    textAlign: "left",
    lineHeight: 40,
    fontFamily: FONT.medium,
  },
  subtitle: {
    fontSize: 18,
    color: COLORS.white,
    marginTop: 12,
    opacity: 0.92,
    lineHeight: 22,
    fontFamily: FONT.medium,
  },
  boldText: {
    fontFamily: FONT.bold,
  },
  button: {
    backgroundColor: COLORS.white,
    paddingVertical: 20,
    paddingHorizontal: 60,
    borderRadius: 30,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: FONT.semiBold,
    color: COLORS.textDark,
    letterSpacing: 0.8,
  },
});
