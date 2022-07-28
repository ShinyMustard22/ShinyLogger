import styles from "../styles/HuntCard.module.css";
import generateLinkName from "../utility/generateLinkName";
import { useState } from "react";

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
                <h2>Encounters:</h2>
                <h3>{encounters}</h3>
                <button onClick={() => {setEncounters(encounters + 1)}}>+</button>
            </div>
        </div>
    )
}