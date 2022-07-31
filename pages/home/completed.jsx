import HomeLayout from "../../layouts/HomeLayout";
import HuntCard from "../../components/HuntCard";
import { db } from "../../firebase/clientApp";
import { collection, doc, query, orderBy, onSnapshot } from "firebase/firestore";
import styles from "../../styles/Completed.module.css"
import { useState, useEffect } from "react";

export default function Completed() {
    const [huntsData, setHuntsData] = useState([]);

    const huntsRef = collection(db, "completed")
    useEffect(() => {
        const getHunts = async () => {
            const huntsQuery = query(huntsRef, orderBy('name'));
            onSnapshot(huntsQuery, (snapshot) => {
                setHuntsData(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})));
            });
        }

        getHunts();
    }, []);

    return (
        <div className={styles.main}>
            {huntsData.map(hunt => {
                const huntDoc = doc(db, "completed", hunt.id);
                return <HuntCard key={hunt.id} name={hunt.name} encounters={hunt.encounters} doc={huntDoc}></HuntCard>
            })}
        </div>
    );
}

Completed.Layout = HomeLayout;