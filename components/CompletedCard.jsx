import generateLinkName from "../utility/generateLinkName";
import styles from "../styles/CompletedCard.module.css";
import Image from "next/image";

export default function CompletedCard(props) {
    const link = `https://img.pokemondb.net/sprites/home/shiny/${generateLinkName(props.name)}.png`;

    return (
        <div className={styles.container}>
            <div className={styles.altBg}>
                <h1>{props.name}</h1>
            </div>
            <div className={styles.imgContainer}>
                <Image src={link} layout="fill"/>
            </div>
            <div className={styles.altBg}>
                <h1>{props.encounters}</h1>
            </div>
        </div>
    )
}
