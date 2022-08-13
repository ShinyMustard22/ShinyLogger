import HomeLayout from "../../layouts/HomeLayout";
import HuntCard from "../../components/HuntCard";
import CompletedCard from "../../components/CompletedCard";
import { db } from "../../firebase/clientApp";
import { collection, doc, query, orderBy, onSnapshot, where } from "firebase/firestore";
import styles from "../../styles/Completed.module.css"
import { useState, useEffect } from "react";
import { auth } from "../../firebase/clientApp";
import { onAuthStateChanged } from "firebase/auth";
import { Oval } from "react-loader-spinner";

export default function Completed() {
    const [huntsData, setHuntsData] = useState([]);
    const [loaded, setLoaded] = useState(false);

    const completedRef = collection(db, "completed");

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user) {
                async function getHunts() {
                    const huntsQuery = query(completedRef, orderBy("huntEnded", "desc"), where("uid", "==", user.uid));
                    onSnapshot(huntsQuery, (snapshot) => {
                        setHuntsData(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})));
                        setLoaded(true);
                    });
                }
        
                getHunts();
            }
        });
    }, []);

    return (
        <>
            {!loaded ? loading() : completedList()}
        </>
    );

    function loading() {
        return (
            <div className={styles.oval}>
                <Oval 
                    wrapperClass={styles.oval}
                    height={120}
                    width={120}
                    color='#d62a3c'
                    secondaryColor="#d62a3c"
                />
            </div>
        )
    }

    function completedList() {
        return (
            <div className={styles.main}>
                {huntsData.map(hunt => {
                    return <CompletedCard key={hunt.id} name={hunt.name} encounters={hunt.encounters}/>
                })}
            </div>
        );
    }
}

Completed.Layout = HomeLayout;