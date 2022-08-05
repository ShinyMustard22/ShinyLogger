import { useRouter } from "next/router";
import { auth } from "../../firebase/clientApp";
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import styles from "../../styles/Home.module.css"

export default function Home() {
    const router = useRouter();
    const googleProvider = new GoogleAuthProvider();

    function signIn() {
        signInWithPopup(auth, googleProvider)
        .catch(error => {});
    }

    return (
        <>
        {
            onAuthStateChanged(auth, user => {
                if (user) {
                    router.push("home/hunting");
                }
            })
        }
        <div className={styles.signInContainer}>
            <button onClick={signIn} className={styles.googleSignIn}>Continue with Google</button>
        </div>
        </>
    );
}