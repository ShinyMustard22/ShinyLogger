import styles from "../styles/HuntCard.module.css";
import generateLinkName from "../utility/generateLinkName";
import { useState } from "react";
import { updateDoc } from "firebase/firestore";

export default function HuntCard(props) {
    const [encounters, setEncounters] = useState(props.encounters)
    const link = `https://img.pokemondb.net/sprites/home/shiny/${generateLinkName(props.name)}.png`;

    return (
       <div className={styles.container}>
            <div className={styles.altBg}>
                <h1>{props.name}</h1>
            </div>
            <img className={styles.image} src={link} alt={props.name} />
            <div className={styles.altBg}>
                <h2>Encounters: {encounters}</h2>
                <div className={styles.buttonLayout}>
                    <button className={styles.encounterButton} onClick={removeEncounter}>-</button>
                    <button className={styles.encounterButton} onClick={addEncounter}>+</button>
                </div>
            </div>
        </div>
    )

    async function removeEncounter() {
        setEncounters(encounters - 1);

        const newFields = { encounters: encounters - 1 };
        await updateDoc(props.doc, newFields);
    }

    async function addEncounter() {
        setEncounters(encounters + 1);

        const newFields = { encounters: encounters + 1 };
        await updateDoc(props.doc, newFields);
    }
}