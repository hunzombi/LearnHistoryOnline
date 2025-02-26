import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import styles from '../css/NavBar.module.css';

function NavBar() {
    const { user, login, logout } = useContext(AuthContext);

    let profil = (<a href="/login" className={styles.loginLink}>Login</a>);

    if (user !== null) {
        profil = (<a href="/login" className={styles.profileLink}><i className="fa-solid fa-user"></i></a>);
    }

    return (
        <div className={styles.navContainer}>
            <div className={styles.navbar}>
                <div>
                    <div className={styles.headerImage}><img src="/ancient-scroll.png" /><div className={styles.overlay}></div></div>
                    <h1 className={styles.headerText}>LearnHistoryOnline</h1>
                </div>
                <div className={styles.navItems}>
                    <a href="/">Home</a>
                    <a href="/courses">Courses</a>
                    <a href="/create">Create</a>
                    {profil}
                </div>
            </div>
            <hr style={{width: "98%", marginLeft: "1%", background: "red"}} />
        </div>
    );
};

export default NavBar;