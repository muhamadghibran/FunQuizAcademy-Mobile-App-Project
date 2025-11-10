export const COLORS = {
  primary: "#644A94",
  primaryDark: "#5D458D",

  background: "#2B2356",
  homeBackground: "#FFFFFF",
  white: "#FFFFFF",
  text: "#FFFFFF",
  textDark: "#1A1A1A",
  textGray: "#A0AEC0",

  correct: "#48BB78",
  incorrect: "#F56565",
  cardBg: "#FFFFFF",
  shadow: "rgba(0, 0, 0, 0.1)",

  categories: {
    math: "#927AFF",
    science: "#4FABFD",
    animals: "#7EC665",
    sport: "#F9A825",
    other: "#FC6049",
  },
};

export const GRADIENTS = {
  background: ["#644A94", "#5D458D", "#2B2356"] as const, // Digunakan di QuizScreen, RankScreen, dll.
};
