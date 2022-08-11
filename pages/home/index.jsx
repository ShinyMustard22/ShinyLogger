import { useRouter } from "next/router";
import { useState } from "react";
import { auth } from "../../firebase/clientApp";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, 
    signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import GoogleButton from "react-google-button";
import styles from "../../styles/Home.module.css";

export default function Home() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [waitForSignIn, setWaitForSignIn] = useState();

    const googleProvider = new GoogleAuthProvider();

    function signUpEmail() {
        createUserWithEmailAndPassword(auth, email, password)
        .catch(error => {console.log(error)});
    }

    function signInGoogle() {
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
            <div className={styles.signUpContainer}>
                <h1 className={styles.signUpTitle}>Sign Up</h1>
                <div className={styles.email}>
                    <h2 style={{color: 'white'}}>Email</h2>
                    <input className={styles.emailInput} type="text" placeholder="Email..." onChange={(event) => {setEmail(event.target.value)}}/>
                </div>
                <div className={styles.email}>
                    <h2 style={{color: 'white'}}>Password</h2>
                    <input className={styles.emailInput} type="password" placeholder="Password..." onChange={(event) => {setPassword(event.target.value)}}/>
                </div>
                <button className={styles.signUp} onClick={signUpEmail}>Continue</button>
            </div>
            <div className={styles.altSignUpContainer}>
                <GoogleButton 
                    onClick={signInGoogle} 
                    label="Continue with Google" 
                    disabled={waitForSignIn}
                />
            </div>
        </div>
        </>
    );
}