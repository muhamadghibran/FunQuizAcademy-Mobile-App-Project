import React from "react";
import { TouchableOpacity, Text, StyleSheet, Image, View } from "react-native";
import { COLORS } from "../constants/colors";
import { ICONS } from "../constants/images";
import { FONT } from "../constants/fontfamily";

type AnswerState = "default" | "correct" | "wrong" | "disabled" | "hidden";

interface AnswerButtonProps {
  text: string;
  state: AnswerState;
  onPress: () => void;
  disabled?: boolean;
}

const SHADOW_COLORS = {
  default: "#BABABA",
  correct: "#BABABA",
  wrong: "#B71C1C",
  disabled: "#9E9E9E",
};

export const AnswerButton: React.FC<AnswerButtonProps> = ({
  text,
  state,
  onPress,
  disabled = false,
}) => {
  let topLayerStyle = styles.topLayerDefault;
  let bottomLayerStyle = styles.bottomLayerDefault;
  let textStyle = styles.darkText;
  let showIcon = false;
  let iconSource = ICONS.checkmarkGreen;
  let iconTintColor: string | undefined = undefined;

  switch (state) {
    case "correct":
      topLayerStyle = styles.topLayerDefault;
      bottomLayerStyle = styles.bottomLayerDefault;
      textStyle = styles.correctText;
      showIcon = true;
      iconSource = ICONS.checkmarkGreen;
      iconTintColor = undefined;
      break;
    case "wrong":
      topLayerStyle = styles.topLayerWrong;
      bottomLayerStyle = styles.bottomLayerWrong;
      textStyle = styles.lightText;
      showIcon = true;
      iconSource = ICONS.close;
      iconTintColor = COLORS.white;
      break;
    case "disabled":
      topLayerStyle = styles.topLayerDisabled;
      bottomLayerStyle = styles.bottomLayerDisabled;
      textStyle = styles.disabledText;
      break;
    case "default":
    default:
      break;
  }

  if (state === "hidden") {
    return null;
  }

  return (
    <View style={[styles.bottomLayer, bottomLayerStyle]}>
      <TouchableOpacity
        style={[styles.topLayer, topLayerStyle]}
        onPress={onPress}
        disabled={disabled || state !== "default"}
        activeOpacity={1}
      >
        <View style={styles.iconContainer}>
          {showIcon && (
            <Image
              source={iconSource}
              style={[styles.answerIcon, { tintColor: iconTintColor }]}
            />
          )}
        </View>
        <Text style={[styles.text, textStyle]}>{text}</Text>
        <View style={styles.iconContainer} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomLayer: {
    borderRadius: 35,
    marginBottom: 15,
  },
  bottomLayerDefault: {
    backgroundColor: SHADOW_COLORS.default,
  },
  bottomLayerCorrect: {
    backgroundColor: SHADOW_COLORS.correct,
  },
  bottomLayerWrong: {
    backgroundColor: SHADOW_COLORS.wrong,
  },
  bottomLayerDisabled: {
    backgroundColor: SHADOW_COLORS.disabled,
  },

  topLayer: {
    bottom: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 22,
    paddingHorizontal: 25,
    borderRadius: 35,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.05)",
  },
  topLayerDefault: {
    backgroundColor: COLORS.white,
  },
  topLayerCorrect: {
    backgroundColor: COLORS.white,
  },
  topLayerWrong: {
    backgroundColor: COLORS.incorrect,
  },
  topLayerDisabled: {
    backgroundColor: "#E0E0E0",
    bottom: 4,
  },

  text: {
    fontSize: 22,
    textAlign: "center",
    fontFamily: FONT.semiBold,
    flex: 1,
  },
  darkText: {
    color: COLORS.textDark,
  },
  lightText: {
    color: COLORS.white,
  },
  disabledText: {
    color: "#9E9E9E",
  },
  correctText: {
    color: COLORS.correct,
    fontFamily: FONT.semiBold,
  },

  iconContainer: {
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  answerIcon: {
    width: 28,
    height: 28,
    resizeMode: "contain",
  },
});
