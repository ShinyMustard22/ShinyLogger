import styles from "../styles/Navbar.module.css";

export default function Navbar() {
    return (
        <>
        <nav className={styles.navbar}>
            <ul className={styles.navlist}>
                <li className={styles.navitem}>
                    <a href="hunting">Hunting</a>
                </li>
                <li className={styles.navitem}>
                    <a href="completed">Completed</a>
                </li>
            </ul>
        </nav>
        </>
    )
}