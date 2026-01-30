import * as SQLite from "expo-sqlite";
import { QUIZZES, CATEGORIES } from "../data/quizData";
import { Category, Quiz, Answer } from "../types";

const dbName = "funquiz.db";

// Helper to get connection
export const getDBConnection = async () => {
  return await SQLite.openDatabaseAsync(dbName);
};

// Initialize Database
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
        image_key TEXT, -- We will store a string key to map to the require() in code
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
        id INTEGER PRIMARY KEY DEFAULT 1, -- Single user for now
        json_data TEXT
      );
    `);

    // Check if seeded
    const result = await db.getAllAsync<{ count: number }>(
      "SELECT count(*) as count FROM categories",
    );
    if (result && result[0] && result[0].count === 0) {
      await seedDatabase(db);
    }
  } catch (error) {
    console.error("Error initializing database:", error);
  }
};

// Users / Progress
export const saveUserProfile = async (data: any) => {
  const db = await getDBConnection();
  const json = JSON.stringify(data);
  // Upsert equivalent
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
    "SELECT json_data FROM users WHERE id = 1",
  );
  if (result) {
    return JSON.parse(result.json_data);
  }
  return null;
};

// Seed function
const seedDatabase = async (db: SQLite.SQLiteDatabase) => {
  console.log("Seeding database...");
  try {
    for (const cat of CATEGORIES) {
      await db.runAsync(
        "INSERT OR IGNORE INTO categories (id, name, description, color, total_questions) VALUES (?, ?, ?, ?, ?)",
        [
          cat.id,
          cat.name,
          cat.description || "",
          cat.color,
          cat.totalQuestions,
        ],
      );

      const questions = QUIZZES[cat.id];
      if (questions) {
        for (const q of questions) {
          // Note: image logic handles static requires. We'll store the path relative or ID if possible.
          // Since requires are resolved at bundle time, we can't easily store 'require(...)' in DB.
          // We will store a placeholder or just keep reading images from static file for now,
          // OR mapped by ID. `quizData.ts` has 'image: require(...)'.
          // We will store 'null' for image_key for now as dealing with static assets dynamically is complex
          // without a mapping table.

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
            ],
          );

          for (const ans of q.answers) {
            await db.runAsync(
              "INSERT OR IGNORE INTO answers (id, question_id, text) VALUES (?, ?, ?)",
              [ans.id, q.id, ans.text],
            );
          }
        }
      }
    }
    console.log("Database seeded successfully.");
  } catch (e) {
    console.error("Error seeding database:", e);
  }
};

// CRUD Operations

export const getQuestionsByCategory = async (
  categoryId: string,
): Promise<Quiz[]> => {
  const db = await getDBConnection();
  const questions = await db.getAllAsync<any>(
    "SELECT * FROM questions WHERE category_id = ?",
    [categoryId],
  );

  const result: Quiz[] = [];

  // Helper to find static data for image hydration
  const staticQuestions = QUIZZES[categoryId] || [];

  for (const q of questions) {
    const answers = await db.getAllAsync<Answer>(
      "SELECT id, text FROM answers WHERE question_id = ?",
      [q.id],
    );

    // Hydrate image from static data if available
    const staticQ = staticQuestions.find((sq) => sq.id === q.id);
    const imageSource = staticQ ? staticQ.image : null;

    result.push({
      id: q.id,
      category: categoryId,
      categoryIcon: "", // Not stored in DB for now
      question: q.question,
      image: imageSource, // Restored image from static mapping
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
  totalQuestions: number,
) => {
  const db = await getDBConnection();
  const date = new Date().toISOString();
  await db.runAsync(
    "INSERT INTO history (category_id, score, total_questions, date) VALUES (?, ?, ?, ?)",
    [categoryId, score, totalQuestions, date],
  );
};

export const getQuizHistory = async () => {
  const db = await getDBConnection();
  return await db.getAllAsync("SELECT * FROM history ORDER BY date DESC");
};
