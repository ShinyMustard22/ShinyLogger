import styles from "../styles/HuntCard.module.css";
import generateLinkName from "../utility/generateLinkName";
import { useState } from "react";
import { updateDoc } from "firebase/firestore";
import Image from "next/image";
import DeleteHunt from "./DeleteHunt";
import CompleteHunt from "./CompleteHunt";

export default function HuntCard(props) {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [deleteHuntVis, setDeleteHunVis] = useState(false);
    const [completeHuntVis, setCompleteHuntVis] = useState(false);

    const link = `https://img.pokemondb.net/sprites/home/shiny/${generateLinkName(props.name)}.png`;

    return (
        <>
        <div className={styles.container}>
            <div className={styles.altBg}>
                <h1>{props.name}</h1>
                <button className={styles.cross} onClick={() => setDeleteHunVis(true)}>✕</button>
                <button className={styles.check} onClick={() => setCompleteHuntVis(true)}>✓</button>
            </div>
            <div className={styles.imgContainer}>
                <Image className={styles.image} src={link}
                    layout="fill" onLoad={() => {setImageLoaded(true)}}
                    style={imageLoaded ? {} : {display: 'none'}}></Image>
            </div>
            <div className={styles.altBg}>
                <h1 className={styles.huntNum}>{props.encounters}</h1>
                <div className={styles.buttonLayout}>
                    <button className={styles.encounterButton} onClick={removeEncounter}>-</button>
                    <button className={styles.encounterButton} onClick={addEncounter}>+</button>
                </div>
            </div>
        </div>
        {deleteHuntVis ? 
            <DeleteHunt 
                vis={setDeleteHunVis} 
                doc={props.doc}
            /> : ""}
        {completeHuntVis ?
            <CompleteHunt 
                vis={setCompleteHuntVis} 
                doc={props.doc} 
                completedRef={props.completedRef}
                name={props.name}
                encounters={props.encounters}
                /> : ""}
        </>
    )

    async function removeEncounter() {
        const newFields = { encounters: props.encounters - 1 };
        await updateDoc(props.doc, newFields);
    }

    async function addEncounter() {
        const newFields = { encounters: props.encounters + 1 };
        await updateDoc(props.doc, newFields);
    }
}