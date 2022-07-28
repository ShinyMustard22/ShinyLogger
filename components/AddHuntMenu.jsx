import pokedex from '../public/pokedex';
import generateLinkName from '../utility/generateLinkName';
import styles from '../styles/AddHuntMenu.module.css';
import { Oval } from  'react-loader-spinner'
import { useState } from 'react';
import { addDoc } from 'firebase/firestore';

export default function AddHunt(props) {
    const [searchTerm, setSearchTerm] = useState("");
    const [pokemonLoaded, setPokemonLoaded] = useState([]);

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>Choose a Pokemon</h1>
                <div className={styles.exitBtn} onClick={() => {props.setAddHuntVis(false)}}>x</div>
            </header>
            <input type="text" placeholder="Search..." className={styles.searchBar} onChange={(event) => {setSearchTerm(event.target.value)}}/>
            <div className={styles.listContainer}> 
                {pokedex.map((val, key) => {
                    if (!val.toLowerCase().includes(searchTerm.toLowerCase()) && searchTerm !== "") {
                        return;
                    }

                    const linkName = generateLinkName(val);
                    const link = `https://img.pokemondb.net/sprites/home/shiny/${linkName}.png`
                    return <button className={styles.listItem} key={key} onClick={() => {addHunt(val)}}>
                        <img className={styles.listImage} src={link} alt={val} onLoad={() => {setPokemonLoaded(true)}}
                            style={pokemonLoaded ? {} : {display: 'none'}}/>
                        {pokemonLoaded ? null : <Oval color="#d62a3c" secondaryColor="#FFFFFF" height={80} width={80} />}
                        {val} 
                        <br />
                        {" #" + ("00" + parseInt(key + 1)).slice(-3)}
                    </button>
                })}
            </div>
        </div>
    )

    async function addHunt(name) {
        await addDoc(props.huntsRef, { name: name, encounters: 0 });
        props.setAddHuntVis(false);
    }
}