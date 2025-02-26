import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import LoginForm from './components/LoginForm';
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import CreatePage from "./components/CreatePage";
import LessonPage from "./components/LessonPage";
import QuizPage from "./components/QuizPage";
import CoursesPage from "./components/CoursesPage";
import CoursePage from "./components/CoursePage";
import RegisterForm from "./components/RegisterForm";

function App() {
  return (
    <AuthProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/lesson/:id" element={<LessonPage />} />
          <Route path="/quiz/:id" element={<QuizPage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/course/:id" element={<CoursePage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
