import HomeLayout from "../../layouts/HomeLayout";
import AddHunt from "../../components/AddHuntMenu";
import HuntCard from "../../components/HuntCard";
import styles from "../../styles/Hunting.module.css";
import { useState, useEffect } from "react";
import { db, auth } from "../../firebase/clientApp";
import { query, orderBy, collection, doc, onSnapshot, where } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { Oval } from "react-loader-spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function Hunting() {
    const [addHuntVis, setAddHuntVis] = useState(false);
    const [loaded, setIsLoaded] = useState(false);
    const [huntsData, setHuntsData] = useState([]);

    const huntsRef = collection(db, "hunts");
    const completedRef = collection(db, "completed");

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user) {
                const getHunts = async () => {
                    const huntsQuery = query(huntsRef, orderBy("huntStarted", "desc"), where("uid", "==", user.uid));
                    onSnapshot(huntsQuery, (snapshot) => {
                        setHuntsData(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})));
                        setIsLoaded(true);
                    });
                }

                getHunts();
            }
        });
    }, []);

    return (
        <>
            {!loaded ? loading() : 
                addHuntVis ? <AddHunt setAddHuntVis={setAddHuntVis} huntsRef={huntsRef}/> : 
                huntsData.length !== 0 ? huntsList() : addHuntVis ? "" : noHunts()
            }
        </>
    )

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
                <button className={styles.addHunt} onClick={() => {setAddHuntVis(true)}}>
                    <FontAwesomeIcon icon={faMagnifyingGlass}/>
                </button>
            </>
        );
    }

    function noHunts() {
        return (
            <div className={styles.container}>
                <h1>You have no current hunts...</h1>
                <h2>Click below to start hunting!</h2>
                <button className={styles.addpokemon} onClick={() => setAddHuntVis(true)}>
                    <FontAwesomeIcon icon={faMagnifyingGlass}/>
                </button>
            </div>
        )
    }
}

Hunting.Layout = HomeLayout;