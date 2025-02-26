import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import styles from '../css/HomePage.module.css';

function HomePage() {
    const { user } = useContext(AuthContext);

    return (
        <div className={styles.homePage}>
            <h1>Welcome to Learn History Online!</h1>
            <div className={styles.links}>
                <img src="history-book.png" />
                <div className={styles.linksContent}>
                    <h2>Courses</h2>
                    <p>
                        Welcome to LearnHistoryOnline! You have bad history grades? Or you're just a history enthusiast? Well worry no more, LearnHistoryOnline has got your back. Explore our countless courses & lessons to learn about history in a fun and engaging way.
                    </p>
                    <a href="/courses">To Courses<i style={{marginLeft: "20px"}} className="fa-solid fa-arrow-right"></i></a>
                </div>
            </div>
            <div className={styles.links}>
                <div style={{marginRight: "10px"}} className={styles.linksContent}>
                    <h2>Create</h2>
                    <p>Perhaps you prefer to create your own lessons? Don't worry LearnHistoryOnline has a solution for that. The solution is the <b>lesson editor.</b> It's easy to use and get the job done fast. But what if you want to share your lesson with others? It's as simple as sending them a link.</p>
                    <a href="/create">Create<i style={{marginLeft: "20px"}} className="fa-solid fa-arrow-right"></i></a>
                </div>
                <img src="design.png" />
            </div>
        </div>
    );
}

export default HomePage;