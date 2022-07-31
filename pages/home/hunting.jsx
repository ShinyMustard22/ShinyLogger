import HomeLayout from "../../layouts/HomeLayout";
import AddHunt from "../../components/AddHuntMenu";
import HuntCard from "../../components/HuntCard";
import styles from "../../styles/Hunting.module.css";
import { useState, useEffect } from "react";
import { db } from "../../firebase/clientApp";
import { query, orderBy, collection, doc, onSnapshot } from "firebase/firestore";

export default function Hunting() {
    const [addHuntVis, setAddHuntVis] = useState(false);
    const [huntsData, setHuntsData] = useState([]);

    const huntsRef = collection(db, "hunts");
    const completedRef = collection(db, "completed");

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
        <>
            {addHuntVis ? <AddHunt setAddHuntVis={setAddHuntVis} huntsRef={huntsRef}/> : 
                huntsData.length !== 0 ? huntsList() : addHuntVis ? "" : noHunts()}
        </>
    )

    function huntsList() {
        return (
            <>
                <div className={styles.main}>
                    {huntsData.map(hunt => {
                        const huntDoc = doc(db, "hunts", hunt.id);
                        return <HuntCard key={hunt.id} name={hunt.name} encounters={hunt.encounters} 
                            doc={huntDoc} completedRef={completedRef}></HuntCard>
                    })}
                </div>
                <button className={styles.addHunt} onClick={() => {setAddHuntVis(true)}}>+</button>
            </>
        );
    }

    function noHunts() {
        return (
            <div className={styles.container}>
                <h1>You have no current hunts...</h1>
                <h2>Click below to start hunting!</h2>
                <button className={styles.addpokemon} onClick={() => setAddHuntVis(true)}>+</button>
            </div>
        )
    }
}

Hunting.Layout = HomeLayout;