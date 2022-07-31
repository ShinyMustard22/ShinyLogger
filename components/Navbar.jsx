import Navlink from "./Navlink";
import styles from "../styles/Navbar.module.css";

export default function Navbar() {
    return (
        <nav className={styles.navbar}>
            <ul className={styles.navlist}>
                <li className={styles.navitem}>
                    <Navlink href="/home/hunting">Hunting</Navlink>
                </li>
                <li className={styles.navitem}>
                    <Navlink href="/home/completed">Completed</Navlink>
                </li>
            </ul>
        </nav>
    )
}