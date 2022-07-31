import { pokedex } from '../public/pokedex';
import generateLinkName from '../utility/generateLinkName';
import styles from '../styles/AddHuntMenu.module.css';
import { useState } from 'react';
import { addDoc } from 'firebase/firestore';
import Image from 'next/image';

export default function AddHunt(props) {
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <>
            <div className={styles.overlay} onClick={() => {props.setAddHuntVis(false)}}></div>
            <div className={styles.container}>
                <header className={styles.header}>
                    <h1>Choose a Pokemon</h1>
                    <button className={styles.exitBtn} onClick={() => {props.setAddHuntVis(false)}}>✕</button>
                </header>
                <input type="text" placeholder="Search..." className={styles.searchBar} onChange={(event) => {setSearchTerm(event.target.value)}}/>
                <div className={styles.listContainer}> 
                    {pokedex.filter(val => {
                        if(val.name.toLowerCase().includes(searchTerm.toLowerCase()) || searchTerm === "") {
                            return val;
                        }
                    })
                    .map((val, key) => {
                        const linkName = generateLinkName(val.name);
                        const link = `https://img.pokemondb.net/sprites/home/shiny/${linkName}.png`
                        return <button className={styles.listItem} key={key} onClick={() => {addHunt(val.name)}}>
                            <div className={styles.imgContainer}>
                                <Image className={styles.listImage} src={`/api/imageProxy?imageUrl=${link}`} alt={val.name} layout="fill"></Image>
                            </div>
                            {val.name} 
                            <br />
                            {" #" + ("00" + parseInt(val.dex + 1)).slice(-3)}
                        </button>
                    })

                    }
                </div>
            </div>
        </>
    )

    async function addHunt(name) {
        await addDoc(props.huntsRef, { name: name, encounters: 0 });
        props.setAddHuntVis(false);
    }
}