import { useWindowDimensions } from "react-native";
import { useMemo } from "react";

export const useResponsive = () => {
  const { width, height } = useWindowDimensions();

  const isSmallDevice = width < 375;
  const isTablet = width >= 768;

  const wp = (percentage: number) => {
    return (width * percentage) / 100;
  };

  const hp = (percentage: number) => {
    return (height * percentage) / 100;
  };

  return useMemo(
    () => ({
      width,
      height,
      isSmallDevice,
      isTablet,
      wp,
      hp,
    }),
    [width, height],
  );
};
