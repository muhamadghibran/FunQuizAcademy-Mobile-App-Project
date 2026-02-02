<div align="center">

  <h1>🎓 FunQuiz Academy</h1>
  
  <p>
    <strong>Play, Learn, and Explore with Exciting Quizzes!</strong>
  </p>

  <p>
    <a href="https://reactnative.dev"><img src="https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React Native" /></a>
    <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" /></a>
    <a href="https://expo.dev"><img src="https://img.shields.io/badge/Expo-1B1F23?style=for-the-badge&logo=expo&logoColor=white" alt="Expo" /></a>
    <a href="https://firebase.google.com/"><img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" alt="Firebase" /></a>
    <a href="https://sqlite.org/"><img src="https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white" alt="SQLite" /></a>
  </p>

  <p>
    <i>An engaging, interactive, and beautifully designed mobile learning application built with modern React Native technologies.</i>
  </p>

  <br />

</div>

---

## 📱 About The Project

**FunQuiz Academy** is a vibrant educational mobile application designed to make learning fun for users of all ages. It combines the excitement of gaming with educational content across various categories like **Mathematics**, **Science**, **Sports**, and **Animals**.

The app is built with a focus on **Clean Code**, **Performance**, and a **Premium User Experience (UX)**. It features smooth animations (Reanimated), offline capabilities (SQLite), and secure authentication (Firebase & Google Sign-In).

## ✨ Key Features

- **🎨 Stunning UI/UX**: Immersive Glassmorphism effects, smooth gradients, and interactive animations using `react-native-reanimated`.
- **🔐 Secure Authentication**:
  - **Google Sign-In**: Seamless one-tap login.
  - **Guest Mode**: Quick access with manual name entry.
- **📚 Diverse Categories**:
  - **🔢 Math**: Sharpen your calculation skills.
  - **🔬 Science**: Explore the wonders of the universe.
  - **🦁 Animals**: Learn about wildlife.
  - **⚽ Sports**: Test your athletic knowledge.
- **💾 Offline First**: Built with `expo-sqlite` to store questions, user progress, and history locally. Play anywhere, anytime!
- **🏆 Leaderboard & Statistics**: Track your growth with detailed performance analytics and compare scores on the global leaderboard.
- **🌍 Multi-Language Support**: Fully localized for **English** and **Indonesian (Bahasa Indonesia)**.
- **⚙️ Customizable Settings**: Dark mode support, sound toggles, and notification preferences.

## 🛠️ Tech Stack

- **Framework**: [React Native](https://reactnative.dev/) (Expo SDK 52)
- **Language**: TypeScript
- **Navigation**: React Navigation (Stack)
- **State Management**: React Context API
- **Styling**: StyleSheet (Modularized & Clean), Expo Constants for safe areas.
- **Database**: Expo SQLite (Local), MockAPI (Leaderboard).
- **Backend / Auth**: Firebase Authentication.
- **Assets**: Expo Fonts (`Gilroy`), Expo Image, Expo AV.

## � Screenshots

|                             Welcome Screen                              |                            Home Screen                            |                          Quiz Interface                           |
| :---------------------------------------------------------------------: | :---------------------------------------------------------------: | :---------------------------------------------------------------: |
| <img src="./assets/screenshots/welcome.png" alt="Welcome" width="200"/> | <img src="./assets/screenshots/home.png" alt="Home" width="200"/> | <img src="./assets/screenshots/quiz.png" alt="Quiz" width="200"/> |

|                            Leaderboard                            |                                 Profile                                 |                             Statistics                              |
| :---------------------------------------------------------------: | :---------------------------------------------------------------------: | :-----------------------------------------------------------------: |
| <img src="./assets/screenshots/rank.png" alt="Rank" width="200"/> | <img src="./assets/screenshots/profile.png" alt="Profile" width="200"/> | <img src="./assets/screenshots/stats.png" alt="Stats" width="200"/> |

> _Note: Add your actual screenshots to an `assets/screenshots` folder to display them here._

## 🚀 Getting Started

Follow these steps to set up the project locally on your machine.

### Prerequisites

- Node.js (LTS version recommended)
- npm or yarn
- Expo Go app on your mobile device (iOS/Android)

### Installation

1.  **Clone the repository**

    ```bash
    git clone https://github.com/yourusername/FunQuizAcademy.git
    cd FunQuizAcademy
    ```

2.  **Install dependencies**

    ```bash
    npm install
    ```

3.  **Start the development server**

    ```bash
    npx expo start
    ```

4.  **Run on Device**
    - Scan the QR code with **Expo Go** (Android) or the Camera app (iOS).

## 📂 Project Structure

The project follows a strict **Clean Architecture** to ensure scalability and maintainability.

```
src/
├── components/      # Reusable UI components (Buttons, Cards, Headers)
├── config/          # Configuration files (Firebase, Env)
├── constants/       # Global constants (Colors, Fonts, Images, Translations)
├── context/         # React Context (Language, Theme)
├── data/            # Static data (Quiz Content)
├── hooks/           # Custom React Hooks (useQuiz, useVoiceInput)
├── navigation/      # Navigation configuration (AppNavigator)
├── screens/         # Main Screen Logic (View Controllers)
├── services/        # Business Logic & API Calls (Database, Auth)
├── styles/          # Separated StyleSheets for Screens
├── types/           # TypeScript Definitions
└── utils/           # Helper functions (Storage, Formatting)
```

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<div align="center">
  <p>Made with ❤️ by <strong>Muhamad Ghibran</strong></p>
</div>
