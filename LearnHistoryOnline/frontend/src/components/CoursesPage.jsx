import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from "../css/CoursesPage.module.css";

function CoursesPage() {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/api/courses/courses`)
        .then(res => res.json())
        .then(data => setCourses(data))
        .catch(err => console.error('Error fetching courses', err));
    }, []);

    console.log(courses);

    return (
        <div className={styles.coursesPage}>
            {courses.filter((item) => (item.id !== 1)).map((item) => (
                <Link className={styles.course} to={`/course/${item.id}`}>
                    <div style={{backgroundImage: `url(${item.imgPath})`}} />
                    <div className={styles.title}>{item.title}</div>
                    <div className={styles.desc}>{item.desc}</div>
                    <div className={styles.arrow}><i className='fa-solid fa-arrow-right'></i></div>
                </Link>
            ))}
        </div>
    );
}

export default CoursesPage;