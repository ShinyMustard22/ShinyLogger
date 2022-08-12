import { pokedex } from '../public/pokedex';
import generateLinkName from '../utility/generateLinkName';
import styles from '../styles/AddHuntMenu.module.css';
import { useState } from 'react';
import { addDoc, serverTimestamp } from 'firebase/firestore';
import { auth } from '../firebase/clientApp';
import { onAuthStateChanged } from 'firebase/auth';
import Image from 'next/image';
import Overlay from './Overlay';

export default function AddHunt(props) {
    let uid;

    onAuthStateChanged(auth, user => {
        if (user) {
            uid = user.uid;
        }
    });

    const [searchTerm, setSearchTerm] = useState("");

    return (
        <>
            <Overlay vis={props.setAddHuntVis}/>
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
                                <Image className={styles.listImage} src={link} alt={val.name} layout="fill"></Image>
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
        await addDoc(props.huntsRef, { 
            name: name, 
            encounters: 0, 
            uid: uid, 
            huntStarted: serverTimestamp()
        });
        props.setAddHuntVis(false);
    }
}