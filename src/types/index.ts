export interface Quiz {
  id: string;
  category: string;
  categoryIcon: string;
  question: string;
  image?: any;
  answers: Answer[];
  correctAnswer: string;
  difficulty: "easy" | "medium" | "hard";
  points: number;
}

export interface Answer {
  id: string;
  text: string;
}

export interface Category {
  id: string;
  name: string;
  icon: any;
  color: string;
  totalQuestions: number;
  isLocked: boolean;
  description?: string;
}

export interface UserProgress {
  coins: number;
  completedQuizzes: string[];
  score: number;
  level: number;
  userName: string;
}

export interface QuizResult {
  quizId: string;
  isCorrect: boolean;
  earnedCoins: number;
  correctAnswer: string;
  userAnswer: string;
  questionNumber: number;
  totalQuestions: number;
}

export type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Home: undefined;
  Quiz: {
    category: Category;
    quizzes: Quiz[];
  };
  RankScreen: undefined;
  Profile: undefined;
  Settings: undefined;
  Statistics: undefined;
  EditProfile: undefined;
};
