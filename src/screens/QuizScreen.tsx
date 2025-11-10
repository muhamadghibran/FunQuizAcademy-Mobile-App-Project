import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { RootStackParamList, QuizResult } from "../types";
import { COLORS, GRADIENTS } from "../constants/colors";
import { AnswerButton } from "../components/AnswerButton";
import { useQuiz } from "../hooks/useQuiz";
import { FONT } from "../constants/fontfamily";
import { ICONS, ILLUSTRATIONS } from "../constants/images";
import { AnimatedCircularProgress } from "react-native-circular-progress";

type QuizScreenNavigationProp = StackNavigationProp<RootStackParamList, "Quiz">;
type QuizScreenRouteProp = RouteProp<RootStackParamList, "Quiz">;

interface QuizScreenProps {
  navigation: QuizScreenNavigationProp;
  route: QuizScreenRouteProp;
}

const { width } = Dimensions.get("window");

export const QuizScreen: React.FC<QuizScreenProps> = ({
  navigation,
  route,
}) => {
  const { category, quizzes } = route.params;
  const { userProgress, addCoins, addScore } = useQuiz();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);

  const [timeLeft, setTimeLeft] = useState(10);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const currentQuiz = quizzes[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quizzes.length - 1;

  const handleTimeUp = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setShowResult(true);
    setIsAnswerCorrect(false);
    setSelectedAnswer(null);
  };

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setTimeLeft(10);

    intervalRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(intervalRef.current!);
          handleTimeUp();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [currentQuestionIndex]);

  const handleAnswerSelect = (answerId: string) => {
    if (showResult) return;
    if (intervalRef.current) clearInterval(intervalRef.current);

    setSelectedAnswer(answerId);
    setShowResult(true);

    const isCorrect = answerId === currentQuiz.correctAnswer;
    setIsAnswerCorrect(isCorrect);

    if (isCorrect) {
      const earnedPoints = 10;
      addCoins(earnedPoints);
      addScore(earnedPoints);
    }
  };

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      navigation.navigate("Home");
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setIsAnswerCorrect(false);
    }
  };

  const getAnswerState = (answer: {
    id: string;
    text: string;
  }): "correct" | "wrong" | "default" | "disabled" | "hidden" => {
    const isSelected = selectedAnswer === answer.text;
    const isCorrectAnswer = answer.text === currentQuiz.correctAnswer;

    if (showResult) {
      if (isAnswerCorrect) {
        if (isCorrectAnswer) return "correct";
        else return "hidden";
      } else {
        if (isSelected) return "wrong";
        else if (isCorrectAnswer) return "correct";
        else return "hidden";
      }
    }
    return "default";
  };

  const displayedAnswers = currentQuiz.answers
    .map((answer) => ({
      ...answer,
      state: getAnswerState(answer),
      isCorrectAnswer: answer.text === currentQuiz.correctAnswer,
    }))
    .filter((answer) => answer.state !== "hidden")
    .sort((a, b) => {
      if (a.isCorrectAnswer && !b.isCorrectAnswer) return -1;
      if (!a.isCorrectAnswer && b.isCorrectAnswer) return 1;
      return 0;
    });

  const fillPercentage = (timeLeft / 10) * 100;

  return (
    <LinearGradient colors={[...GRADIENTS.background]} style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.closeIcon}>✕</Text>
        </TouchableOpacity>
        <View style={styles.timerWrapper}>
          <AnimatedCircularProgress
            size={56}
            width={3}
            fill={fillPercentage}
            tintColor={COLORS.white}
            backgroundColor="rgba(255,255,255,0.15)"
            rotation={0}
            duration={950}
          >
            {() => (
              <Text style={styles.timerText}>
                {String(timeLeft).padStart(2, "0")}
              </Text>
            )}
          </AnimatedCircularProgress>
        </View>
        <View style={styles.coinDisplay}>
          <Text style={styles.coinText}>{userProgress.coins}</Text>
          <View style={styles.coinIconWrapper}>
            <Image source={ICONS.coinScore} style={styles.coinIcon} />
          </View>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.contentWrapper}>
          <View style={styles.topSection}>
            {currentQuiz.image && (
              <View style={styles.imageContainer}>
                <Image
                  source={currentQuiz.image}
                  style={styles.image}
                  resizeMode="cover"
                />
              </View>
            )}
            <Text style={styles.questionNumber}>
              Question {currentQuestionIndex + 1} of {quizzes.length}
            </Text>
            <Text style={styles.question}>{currentQuiz.question}</Text>
          </View>

          <View style={styles.bottomSection}>
            <View style={styles.answersContainer}>
              {displayedAnswers.map((answer) => (
                <AnswerButton
                  key={answer.id}
                  text={answer.text}
                  state={answer.state}
                  onPress={() => handleAnswerSelect(answer.text)}
                  disabled={showResult}
                />
              ))}
            </View>

            {showResult && (
              <View style={styles.resultInfo}>
                <Text style={styles.resultText}>
                  {isAnswerCorrect
                    ? "That's the right Answer! +10 Coins"
                    : "Oops! Wrong Answer"}
                </Text>
                <Image
                  source={ILLUSTRATIONS.coinMedium}
                  style={styles.resultCoinIcon}
                />
              </View>
            )}
          </View>
        </View>
      </ScrollView>
      {showResult && (
        <View style={styles.nextButtonContainer}>
          <Text style={styles.nextButtonText}>NEXT</Text>
          <TouchableOpacity
            style={styles.nextButton}
            onPress={handleNextQuestion}
          >
            <Image source={ICONS.nextArrow} style={styles.nextButtonIcon} />
          </TouchableOpacity>
        </View>
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 50,
    paddingBottom: 15,
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    left: 20,
    top: 50,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  closeIcon: {
    fontSize: 22,
    color: COLORS.white,
    fontWeight: "600",
  },
  timerWrapper: {
    position: "absolute",
    top: 50,
    left: "50%",
    transform: [{ translateX: -28 }, { scaleX: -1 }],
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  timerText: {
    position: "absolute",
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.white,
    fontFamily: FONT.semiBold,
    transform: [{ scaleX: -1 }],
  },
  coinDisplay: {
    position: "absolute",
    right: 20,
    top: 50,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    paddingLeft: 14,
    paddingRight: 6,
    paddingVertical: 6,
    borderRadius: 20,
    zIndex: 1,
  },
  coinText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#272052",
    marginRight: 6,
  },
  coinIconWrapper: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#927AFF",
    alignItems: "center",
    justifyContent: "center",
  },
  coinIcon: {
    width: 18,
    height: 18,
  },
  scrollContent: {
    flexGrow: 1,
  },
  contentWrapper: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  topSection: {
    paddingTop: 70,
  },
  bottomSection: {},
  imageContainer: {
    width: "100%",
    height: 200,
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 20,
    backgroundColor: "rgba(0,0,0,0.1)",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  questionNumber: {
    fontSize: 16,
    color: COLORS.white,
    marginBottom: 12,
    opacity: 0.85,
    fontFamily: FONT.medium,
  },
  question: {
    fontSize: 28,
    color: COLORS.white,
    lineHeight: 38,
    marginBottom: 30,
    fontFamily: FONT.semiBold,
  },
  answersContainer: {
    marginBottom: 20,
  },

  resultInfo: {
    paddingVertical: 10,
    alignItems: "center",
  },
  resultText: {
    fontSize: 18,
    color: COLORS.white,
    fontFamily: FONT.semiBold,
    textAlign: "center",
    marginBottom: 15,
  },
  resultCoinIcon: {
    width: 80,
    height: 80,
    resizeMode: "contain",
  },

  nextButtonContainer: {
    position: "absolute",
    bottom: 30,
    right: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  nextButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  nextButtonText: {
    color: COLORS.white,
    fontFamily: FONT.bold,
    fontSize: 16,
    marginRight: 12,
    letterSpacing: 0.5,
  },
  nextButtonIcon: {
    width: 28,
    height: 28,
    tintColor: "#8B7BE8",
    resizeMode: "contain",
  },
});
