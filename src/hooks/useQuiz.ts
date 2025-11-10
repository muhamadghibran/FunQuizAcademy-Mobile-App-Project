import { useState, useCallback } from "react";
import { UserProgress } from "../types/index";
import { getUserProgress, saveUserProgress } from "../utils/storage";

export const useQuiz = () => {
  const [userProgress, setUserProgress] = useState<UserProgress>({
    userName: "",
    coins: 0,
    completedQuizzes: [],
    score: 0,
    level: 1,
  });
  const [loading, setLoading] = useState(true);
  const loadProgress = useCallback(async () => {
    try {
      const progress = await getUserProgress();
      if (progress) {
        setUserProgress(progress);
      }
    } catch (error) {
      console.error("Error loading progress:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const addCoins = (amount: number) => {
    setUserProgress((prevProgress) => {
      const newCoins = prevProgress.coins + amount;
      const updatedProgress = { ...prevProgress, coins: newCoins };
      saveUserProgress(updatedProgress);
      return updatedProgress;
    });
  };

  const subtractCoins = (amount: number) => {
    setUserProgress((prevProgress) => {
      const newCoins = Math.max(0, prevProgress.coins - amount);
      const updatedProgress = { ...prevProgress, coins: newCoins };
      saveUserProgress(updatedProgress);
      return updatedProgress;
    });
  };

  const addScore = (points: number) => {
    setUserProgress((prevProgress) => {
      const newScore = prevProgress.score + points;
      const updatedProgress = { ...prevProgress, score: newScore };
      saveUserProgress(updatedProgress);
      return updatedProgress;
    });
  };

  const completeQuiz = (quizId: string) => {
    setUserProgress((prevProgress) => {
      if (prevProgress.completedQuizzes.includes(quizId)) {
        return prevProgress;
      }
      const updatedQuizzes = [...prevProgress.completedQuizzes, quizId];
      const updatedProgress = {
        ...prevProgress,
        completedQuizzes: updatedQuizzes,
      };
      saveUserProgress(updatedProgress);
      return updatedProgress;
    });
  };

  const isQuizCompleted = (quizId: string): boolean => {
    return userProgress.completedQuizzes.includes(quizId);
  };

  const resetProgress = async () => {
    const resetData: UserProgress = {
      userName: userProgress.userName,
      coins: 0,
      completedQuizzes: [],
      score: 0,
      level: 1,
    };
    setUserProgress(resetData);
    await saveUserProgress(resetData);
  };

  return {
    userProgress,
    loading,
    loadProgress,
    addCoins,
    subtractCoins,
    addScore,
    completeQuiz,
    isQuizCompleted,
    resetProgress,
  };
};
