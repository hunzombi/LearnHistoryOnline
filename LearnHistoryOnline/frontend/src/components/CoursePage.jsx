import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext";
import styles from "../css/CoursePage.module.css";

function CoursePage() {
    const { id } = useParams();
    console.log(id);
    const [lessons, setLessons] = useState([]);
    const [course, setCourse] = useState(null);

    let { user } = useContext(AuthContext);
    
    console.log(user);
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/api/courses/${id}`)
        .then((res) => res.json())
        .then((data) => setCourse(data))
        .catch((err) => console.error('Error fetching course', err));
        fetch(`${process.env.REACT_APP_API_URL}/api/lesson/lessonsForCourse/${id}`)
        .then((res) => res.json())
        .then((data) => setLessons(data))
        .catch((err) => console.error('Error fetching lessons', err));
    }, []);

    console.log(lessons);
    console.log(id);

    if (!course || id === "1"){return (
        <div className = {styles.noLessonFound}>Course not found :(</div>
    );}

    console.log(user);

    if (user === null) { return (
        <div class={`${styles.CoursePage}  ${(!course.imgPath) ? styles.black : styles.white}`}>
            <div style={{backgroundImage: `url(/${(course.imgPath) ? course.imgPath : ''})`}} className={styles.image}><div className={styles.overlay}></div></div>
            <div className={styles.title}>{course.title}</div>
            <div className={styles.desc}>{course.desc}</div>
            {lessons.filter((item) => (item.courseId !== 0)).map((item) => (
                <Link className={`${styles.link}`} to={`/lesson/${item.id}`}>
                    <div>{item.title}</div>
                    <div><i className="fa-solid fa-arrow-right"></i></div>
                </Link>
            ))}
        </div>
    )}


    return (
        <div class={`${styles.CoursePage}  ${(!course.imgPath) ? styles.black : styles.white}`}>
            <div style={{backgroundImage: `url(/${(course.imgPath) ? course.imgPath : ''})`}} className={styles.image}><div className={styles.overlay}></div></div>
            <div className={styles.title}>{course.title}</div>
            <div className={styles.desc}>{course.desc}</div>
            {lessons.filter((item) => (item.courseId !== 0)).map((item) => (
                <Link className={`${styles.link} ${(user.completed.includes("" + item.id)) ? styles.completed : ''}`} to={`/lesson/${item.id}`}>
                    <div>{item.title}</div>
                    <div><i className="fa-solid fa-arrow-right"></i></div>
                </Link>
            ))}
        </div>
    );
}

export default CoursePage;