import React, { useState, useEffect, useRef } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  Image,
  useWindowDimensions,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated";

import { RootStackParamList } from "../types";
import { COLORS, GRADIENTS } from "../constants/colors";
import { ICONS } from "../constants/images";
import { useQuiz } from "../hooks/useQuiz";
import { saveQuizHistory } from "../services/DatabaseService";
import { styles } from "../styles/QuizScreenStyles";

import { QuizHeader } from "../components/quiz/QuizHeader";
import { QuestionSection } from "../components/quiz/QuestionSection";
import { AnswerList } from "../components/quiz/AnswerList";
import { ResultFeedback } from "../components/quiz/ResultFeedback";

type QuizScreenNavigationProp = StackNavigationProp<RootStackParamList, "Quiz">;
type QuizScreenRouteProp = RouteProp<RootStackParamList, "Quiz">;

interface QuizScreenProps {
  navigation: QuizScreenNavigationProp;
  route: QuizScreenRouteProp;
}

export const QuizScreen: React.FC<QuizScreenProps> = ({
  navigation,
  route,
}) => {
  const { category, quizzes } = route.params;
  const { userProgress, addCoins, addScore } = useQuiz();
  const { width } = useWindowDimensions();
  const isTablet = width > 768;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const currentQuiz = quizzes[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quizzes.length - 1;

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setTimeLeft(10);
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [currentQuestionIndex]);

  const handleTimeUp = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setShowResult(true);
    setIsAnswerCorrect(false);
    setSelectedAnswer(null);
  };

  const handleAnswerSelect = (answerId: string) => {
    if (showResult) return;
    if (intervalRef.current) clearInterval(intervalRef.current);
    setSelectedAnswer(answerId);
    setShowResult(true);
    const isCorrect = answerId === currentQuiz.correctAnswer;
    setIsAnswerCorrect(isCorrect);
    if (isCorrect) {
      const earnedPoints = currentQuiz.points || 10;
      addCoins(earnedPoints);
      addScore(earnedPoints);
      setTotalScore((prev) => prev + earnedPoints);
    }
  };

  const handleNextQuestion = async () => {
    if (isLastQuestion) {
      await saveQuizHistory(category.id, totalScore, quizzes.length);
      navigation.navigate("Home");
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setIsAnswerCorrect(false);
    }
  };

  const getAnswerState = (
    answerText: string,
  ): "correct" | "wrong" | "default" | "disabled" | "hidden" => {
    const isSelected = selectedAnswer === answerText;
    const isCorrectAnswer = answerText === currentQuiz.correctAnswer;
    if (showResult) {
      if (isAnswerCorrect) {
        return isCorrectAnswer ? "correct" : "hidden";
      } else {
        if (isSelected) return "wrong";
        return isCorrectAnswer ? "correct" : "hidden";
      }
    }
    return "default";
  };

  const displayedAnswers = currentQuiz.answers
    .map((ans) => ({
      id: ans.id,
      text: ans.text,
      state: getAnswerState(ans.text),
      isCorrectAnswer: ans.text === currentQuiz.correctAnswer,
    }))
    .filter((ans) => ans.state !== "hidden")
    .sort((a, b) => {
      if (a.isCorrectAnswer && !b.isCorrectAnswer) return -1;
      if (!a.isCorrectAnswer && b.isCorrectAnswer) return 1;
      return 0;
    });

  return (
    <LinearGradient colors={[...GRADIENTS.background]} style={styles.container}>
      <QuizHeader
        isTablet={isTablet}
        onClose={() => navigation.goBack()}
        fillPercentage={(timeLeft / 10) * 100}
        timeLeft={timeLeft}
        coins={userProgress.coins}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View
          style={[
            styles.contentWrapper,
            isTablet && styles.contentWrapperTablet,
          ]}
        >
          <Animated.View
            key={currentQuestionIndex}
            entering={FadeInRight.duration(500)}
            exiting={FadeOutLeft.duration(200)}
            style={styles.animatedContainer}
          >
            <QuestionSection
              isTablet={isTablet}
              image={currentQuiz.image}
              currentQuestionIndex={currentQuestionIndex}
              totalQuestions={quizzes.length}
              question={currentQuiz.question}
            />

            <View
              style={[styles.bottomSection, isTablet && styles.gridAnswers]}
            >
              <AnswerList
                answers={displayedAnswers}
                isTablet={isTablet}
                onAnswerSelect={handleAnswerSelect}
                disabled={showResult}
              />
              {showResult && <ResultFeedback isCorrect={isAnswerCorrect} />}
            </View>
          </Animated.View>
        </View>
      </ScrollView>

      {showResult && (
        <Animated.View
          entering={FadeInRight}
          style={styles.nextButtonContainer}
        >
          <Text style={styles.nextButtonText}>NEXT</Text>
          <TouchableOpacity
            style={styles.nextButton}
            onPress={handleNextQuestion}
          >
            <Image source={ICONS.nextArrow} style={styles.nextButtonIcon} />
          </TouchableOpacity>
        </Animated.View>
      )}
    </LinearGradient>
  );
};
