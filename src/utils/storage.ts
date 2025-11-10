import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserProgress } from "../types";

const STORAGE_KEYS = {
  USER_PROGRESS: "@funquiz_user_progress",
  USER_NAME: "@funquiz_user_name",
  FIRST_TIME: "@funquiz_first_time",
};

export const saveUserProgress = async (
  progress: UserProgress
): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(progress);
    await AsyncStorage.setItem(STORAGE_KEYS.USER_PROGRESS, jsonValue);
  } catch (error) {
    console.error("Error saving user progress:", error);
  }
};

export const getUserProgress = async (): Promise<UserProgress | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEYS.USER_PROGRESS);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error("Error getting user progress:", error);
    return null;
  }
};

export const saveUserName = async (name: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.USER_NAME, name);
  } catch (error) {
    console.error("Error saving user name:", error);
  }
};

export const getUserName = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(STORAGE_KEYS.USER_NAME);
  } catch (error) {
    console.error("Error getting user name:", error);
    return null;
  }
};

export const isFirstTimeUser = async (): Promise<boolean> => {
  try {
    const value = await AsyncStorage.getItem(STORAGE_KEYS.FIRST_TIME);
    if (value === null) {
      await AsyncStorage.setItem(STORAGE_KEYS.FIRST_TIME, "false");
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error checking first time user:", error);
    return true;
  }
};

export const initializeUserProgress = async (
  userName: string
): Promise<UserProgress> => {
  const defaultProgress: UserProgress = {
    userName,
    coins: 0,
    completedQuizzes: [],
    score: 0,
    level: 1,
  };

  await saveUserProgress(defaultProgress);
  await saveUserName(userName);

  return defaultProgress;
};
