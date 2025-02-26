import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useParams, Link } from "react-router-dom";
import styles from "../css/QuizPage.module.css";

function QuizPage() {
    const { id } = useParams();
    const { addCompleted } = useContext(AuthContext);
    const lessonId = id;
    const [quiz, setQuiz] = useState(null);
    const [lesson, setLesson] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [shuffledQuestion, setShuffledQuestion] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentAnswer, setCurrentAnswer] = useState(null);
    const [points, setPoints] = useState(0);
    const [done, setDone] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const quizRes = await fetch(`${process.env.REACT_APP_API_URL}/api/quiz/quiz/${lessonId}`);
            const quizData = await quizRes.json();
            setQuiz(quizData);

            const lessonRes = await fetch(`${process.env.REACT_APP_API_URL}/api/lesson/lesson/${id}`);
            const lessonData = await lessonRes.json();
            setLesson(lessonData);

            if (quizData && quizData.id) {
                const questionsRes = await fetch(`${process.env.REACT_APP_API_URL}/api/question/quiz/${quizData.id}`);
                const questionsData = await questionsRes.json();
                setQuestions(questionsData);
            }
        }
        fetchData();
    }, [id]);

    function shuffleArray(array) {
        if (array == null) {
            return [];
        }
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));

            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function selectQuestion(id) {
        setCurrentAnswer(id);
    }

    async function nextQuestion() {
        const answer = currentAnswer;
        if (answer === parseInt(shuffledQuestion[currentIndex].correctAnswer) - 1){
            await setPoints(points + 1);
        }
        console.log(points);
        await setCurrentIndex(currentIndex + 1);
        await setCurrentAnswer(null);
        if (parseInt(currentIndex) + 1 === questions.length) {
            await setDone(true);
        }
        if (points === questions.length) {
            console.log("what");
            await addCompleted(id);
        }
    }

    useEffect(() => {
        if (currentIndex + 1 === questions.length) {
            setDone(true);
        }
        if (points === questions.length) {
            addCompleted(id);
        }
    }, [points]);

    useEffect(() => {
        if (questions && questions.length > 0) {
            const newArray = shuffleArray([...questions]);
            setShuffledQuestion(newArray);
        }
    }, [questions]);

    useEffect(() => {
        if (points === questions.length) {
            addCompleted(id);
        }
    }, [done]);

    return (
        <div className={styles.QuizPage}>
            <div className={styles.title}>Quiz: {lesson ? lesson.title : 'Loading...'}</div>
            <div className={styles.number} style={{display: (currentIndex === questions.length) ? 'none' : 'flex'}} >
                <div>Score: {Math.round(100*points/questions.length)}%</div>
                <div>{currentIndex + 1}/{questions.length}</div>
            </div>
            {shuffledQuestion.map((question, index) => (
                <div className={`${styles.question} ${(index === currentIndex) ? styles.currentQuestion : ''}`}>
                    <div className={styles.prompt}>{question.prompt}</div>
                    <div>
                        <button onClick={() => selectQuestion(0)} className={`${styles.answer} ${(currentAnswer === 0) ? styles.selectedAnswer : ''}`}>{JSON.parse(question.answers)[0]}</button>
                        <button onClick={() => selectQuestion(1)} className={`${styles.answer} ${(currentAnswer === 1) ? styles.selectedAnswer : ''}`}>{JSON.parse(question.answers)[1]}</button>
                        <button onClick={() => selectQuestion(2)} className={`${styles.answer} ${(currentAnswer === 2) ? styles.selectedAnswer : ''}`}>{JSON.parse(question.answers)[2]}</button>
                        <button onClick={() => selectQuestion(3)} className={`${styles.answer} ${(currentAnswer === 3) ? styles.selectedAnswer : ''}`}>{JSON.parse(question.answers)[3]}</button>
                    </div>
                    <button onClick={() => nextQuestion()}>Submit</button>
                </div>
            ))}
            <div className={styles.results} style={{display: (currentIndex === questions.length) ? "flex" : "none"}} >
                <div>Final Score: <div className={(points === questions.length) ? styles.green : styles.red}>{Math.round(100*points/questions.length)}%</div></div>
                <Link to={`/quiz/${id}`} onClick={() => {window.location.reload()}} className={styles.tryagain} styles={{display: (points === questions.length) ? 'none' : 'flex'}}>Try Again</Link>
                <Link to={`/course/${(lesson) ? lesson.courseId : ""}`} className={styles.back}>Back To Course</Link>
            </div>
        </div>
    );
}

export default QuizPage;