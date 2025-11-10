import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, { Circle } from "react-native-svg";

interface CircularProgressProps {
  size: number;
  strokeWidth: number;
  progress: string;
  color: string;
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
  size,
  strokeWidth,
  progress,
  color,
}) => {
  const percentage = parseInt(progress, 10) || 0;

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progressOffset = circumference - (circumference * percentage) / 100;

  return (
    <View style={{ width: size, height: size }}>
      <Svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={styles.svg}
      >
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#E5E7EB"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={progressOffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </Svg>
      <View style={styles.textContainer}>
        <Text style={[styles.progressText, { color: color }]}>{progress}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  svg: {
    transform: [{ scaleX: -1 }],
  },
  textContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
  },
  progressText: {
    fontSize: 13,
    fontWeight: "bold",
  },
});
