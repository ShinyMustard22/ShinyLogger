import Link from "next/link";
import { withRouter } from "next/router";
import styles from "../styles/Navbar.module.css";

const Navlink = (props) => {
    const isCurrentPath = props.router.pathname === props.href;

    return (
        <>
        <Link href={props.href}>
            <a className={isCurrentPath ? styles.active : ""}>{props.children}</a>
        </Link>
        </>
    )
}

export default withRouter(Navlink);