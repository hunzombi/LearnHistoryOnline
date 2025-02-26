import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import styles from "../css/LessonPage.module.css";

function LessonPage() {
    const { id } = useParams();
    const [lesson, setLesson] = useState(null);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/api/lesson/lesson/${id}`)
        .then((res) => res.json())
        .then((data) => setLesson(data))
        .catch((err) => console.error("Error fetching lesson: ", err));
    }, [id]);

    if (lesson == null){return (
        <div className={styles.noLessonFound}>Lesson not found :(</div>
    );}

    return (
        <>
            <div className={styles.imageHolder} style={{backgroundImage: `url(${(lesson.imgPath) ? lesson.imgPath : ''})`, display: (!lesson.imgPath) ? 'none' : 'flex'}}><div className={styles.overlay}></div></div>
            <div className={`${styles.LessonPage} ${(!lesson.imgPath) ? styles.black : styles.white}`}>
                <div className={styles.title}>{lesson.title}</div>
                <div className={styles.author}>Author: {lesson.author}</div>
                <div className={styles.content}>{lesson.content}</div>
                <Link className={styles.quizButton} to={`/quiz/${lesson.id}`}>Go To Quiz</Link>
            </div>
        </>
    )
}

export default LessonPage;