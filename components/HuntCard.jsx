import styles from "../styles/HuntCard.module.css";
import generateLinkName from "../utility/generateLinkName";
import { useState } from "react";
import { addDoc, updateDoc, deleteDoc } from "firebase/firestore";
import Image from "next/image";

export default function HuntCard(props) {
    const [imageLoaded, setImageLoaded] = useState(false);

    const link = `https://img.pokemondb.net/sprites/home/shiny/${generateLinkName(props.name)}.png`;

    return (
       <div className={styles.container}>
            <div className={styles.altBg}>
                <h1>{props.name}</h1>
                <button className={styles.cross} onClick={deleteHunt}>✕</button>
                <button className={styles.check} onClick={completeHunt}>✓</button>
            </div>
            <div className={styles.imgContainer}>
                <Image className={styles.image} src={`/api/imageProxy?imageUrl=${link}`}
                    layout="fill" onLoad={() => {setImageLoaded(true)}}
                    style={imageLoaded ? {} : {display: 'none'}}></Image>
            </div>
            <div className={styles.altBg}>
                <h2>Encounters: {props.encounters}</h2>
                <div className={styles.buttonLayout}>
                    <button className={styles.encounterButton} onClick={removeEncounter}>-</button>
                    <button className={styles.encounterButton} onClick={addEncounter}>+</button>
                </div>
            </div>
        </div>
    )

    async function removeEncounter() {
        const newFields = { encounters: props.encounters - 1 };
        await updateDoc(props.doc, newFields);
    }

    async function addEncounter() {
        const newFields = { encounters: props.encounters + 1 };
        await updateDoc(props.doc, newFields);
    }

    async function deleteHunt() {
        await deleteDoc(props.doc);
    }

    async function completeHunt() {
        deleteHunt();
        await addDoc(props.completedRef, { name: props.name, encounters: props.encounters });
    }
}