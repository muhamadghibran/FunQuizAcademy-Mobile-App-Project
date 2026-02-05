import * as SQLite from "expo-sqlite";
import { QUIZZES, CATEGORIES } from "../data/quizData";
import { Category, Quiz, Answer } from "../types";

const dbName = "funquiz.db";

let dbInstance: SQLite.SQLiteDatabase | null = null;

export const getDBConnection = async () => {
  if (dbInstance) {
    return dbInstance;
  }
  dbInstance = await SQLite.openDatabaseAsync(dbName);
  return dbInstance;
};

export const initDatabase = async () => {
  const db = await getDBConnection();
  try {
    await db.execAsync(`
      PRAGMA foreign_keys = ON;

      CREATE TABLE IF NOT EXISTS categories (
        id TEXT PRIMARY KEY,
        name TEXT,
        description TEXT,
        color TEXT,
        total_questions INTEGER
      );

      CREATE TABLE IF NOT EXISTS questions (
        id TEXT PRIMARY KEY,
        category_id TEXT,
        question TEXT,
        image_key TEXT,
        correct_answer TEXT,
        difficulty TEXT,
        points INTEGER,
        FOREIGN KEY (category_id) REFERENCES categories(id)
      );

      CREATE TABLE IF NOT EXISTS answers (
        id TEXT PRIMARY KEY,
        question_id TEXT,
        text TEXT,
        FOREIGN KEY (question_id) REFERENCES questions(id)
      );

      CREATE TABLE IF NOT EXISTS history (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        category_id TEXT,
        score INTEGER,
        total_questions INTEGER,
        date TEXT
      );

      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY DEFAULT 1,
        json_data TEXT
      );
    `);

    const result = await db.getAllAsync<{ count: number }>(
      "SELECT count(*) as count FROM categories"
    );
    if (result && result[0] && result[0].count === 0) {
      await seedDatabase(db);
    }
  } catch (error) {
    console.error("Error initializing database:", error);
  }
};

export const saveUserProfile = async (data: any) => {
  const db = await getDBConnection();
  const json = JSON.stringify(data);
  const existing = await db.getFirstAsync("SELECT id FROM users WHERE id = 1");
  if (existing) {
    await db.runAsync("UPDATE users SET json_data = ? WHERE id = 1", [json]);
  } else {
    await db.runAsync("INSERT INTO users (id, json_data) VALUES (1, ?)", [
      json,
    ]);
  }
};

export const getUserProfile = async () => {
  const db = await getDBConnection();
  const result = await db.getFirstAsync<{ json_data: string }>(
    "SELECT json_data FROM users WHERE id = 1"
  );
  if (result) {
    return JSON.parse(result.json_data);
  }
  return null;
};

const seedDatabase = async (db: SQLite.SQLiteDatabase) => {
  try {
    for (const cat of CATEGORIES) {
      await db.runAsync(
        "INSERT OR IGNORE INTO categories (id, name, description, color, total_questions) VALUES (?, ?, ?, ?, ?)",
        [cat.id, cat.name, cat.description || "", cat.color, cat.totalQuestions]
      );

      const questions = QUIZZES[cat.id];
      if (questions) {
        for (const q of questions) {
          await db.runAsync(
            "INSERT OR IGNORE INTO questions (id, category_id, question, image_key, correct_answer, difficulty, points) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [
              q.id,
              cat.id,
              q.question,
              "",
              q.correctAnswer,
              q.difficulty,
              q.points,
            ]
          );

          for (const ans of q.answers) {
            await db.runAsync(
              "INSERT OR IGNORE INTO answers (id, question_id, text) VALUES (?, ?, ?)",
              [ans.id, q.id, ans.text]
            );
          }
        }
      }
    }
  } catch (e) {
    console.error("Error seeding database:", e);
  }
};

export const getQuestionsByCategory = async (
  categoryId: string
): Promise<Quiz[]> => {
  const db = await getDBConnection();
  const questions = await db.getAllAsync<any>(
    "SELECT * FROM questions WHERE category_id = ?",
    [categoryId]
  );

  const result: Quiz[] = [];

  const staticQuestions = QUIZZES[categoryId] || [];

  for (const q of questions) {
    const answers = await db.getAllAsync<Answer>(
      "SELECT id, text FROM answers WHERE question_id = ?",
      [q.id]
    );

    const staticQ = staticQuestions.find((sq) => sq.id === q.id);
    const imageSource = staticQ ? staticQ.image : null;

    result.push({
      id: q.id,
      category: categoryId,
      categoryIcon: "",
      question: q.question,
      image: imageSource,
      answers: answers,
      correctAnswer: q.correct_answer,
      difficulty: q.difficulty,
      points: q.points,
    });
  }
  return result;
};

export const saveQuizHistory = async (
  categoryId: string,
  score: number,
  totalQuestions: number
) => {
  const db = await getDBConnection();
  const date = new Date().toISOString();
  await db.runAsync(
    "INSERT INTO history (category_id, score, total_questions, date) VALUES (?, ?, ?, ?)",
    [categoryId, score, totalQuestions, date]
  );
};

export const getQuizHistory = async () => {
  const db = await getDBConnection();
  return await db.getAllAsync("SELECT * FROM history ORDER BY date DESC");
};
