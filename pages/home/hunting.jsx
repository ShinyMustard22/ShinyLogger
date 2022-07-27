import HomeLayout from "../../layouts/HomeLayout";
import AddHunt from "../../components/AddHuntMenu";
import styles from "../../styles/Hunting.module.css";
import { useState } from "react";

export default function Hunting() {
    const [addHuntVis, setaddHuntVis] = useState(false);

    return (
        <>
            {noHunts()}
            {addHuntVis ? <AddHunt className={styles.addhuntcontainer}/> : null}
        </>
    );

    function noHunts() {
        return (
            <div className={styles.container}>
                <h1>You have no current hunts...</h1>
                <h2>Click below to start hunting!</h2>
                <div className={styles.addpokemon} onClick={() => setaddHuntVis(!addHuntVis)}>+</div>
            </div>
        )
    }
}

Hunting.Layout = HomeLayout;