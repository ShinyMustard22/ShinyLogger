import pokedex from '../public/pokedex';
import styles from '../styles/AddHuntMenu.module.css';
import { Oval } from  'react-loader-spinner'
import { useState } from 'react';

export default function AddHunt() {
    const [searchTerm, setSearchTerm] = useState("");

    function formatLink(pokemon) {
        if (pokemon.includes("Mr. Mime")) {
            pokemon = pokemon.replace("Mr. Mime", "mr-mime");
        }   
        else if (pokemon === "Mime Jr.") {
            pokemon = "mime-jr"
        }

        else if (pokemon === "Mr. Rime") {
            pokemon = "mr-rime"
        }

        if (pokemon.includes("♂")) {
            pokemon = pokemon.replace("♂", "-m");
        }

        else if (pokemon.includes("♀")) {
            pokemon = pokemon.replace("♀", "-f");
        }

        if (pokemon.includes("’")) {
            pokemon = pokemon.replace("’", "");
        }

        if (pokemon === "Type: Null") {
            pokemon = pokemon.replace(": ", "-");
        }

        if (pokemon.includes("Tapu")) {
            pokemon = pokemon.replace(" ", "-");
        }

        if (pokemon.includes("Alolan") || pokemon.includes("Galarian")) {
            const spacePos = pokemon.indexOf(" ");
            pokemon = pokemon.slice(spacePos + 1) + "-" + pokemon.slice(0, spacePos);

            if (pokemon.includes("Darmanitan")) {
                pokemon += "-standard";
            }
        }

        return pokemon.toLowerCase();
    }

    return (
        <div className={styles.container}>
            <input type="text" placeholder="Search..." className={styles.searchBar} onChange={(event) => {setSearchTerm(event.target.value)}}/>
            <div className={styles.listContainer}> 
                {pokedex.map((val, key) => {
                    const [pokemonLoaded, setPokemonLoaded] = useState(false);

                    if (!val.toLowerCase().includes(searchTerm.toLowerCase()) && searchTerm !== "") {
                        return;
                    }

                    const linkName = formatLink(val);
                    const link = `https://img.pokemondb.net/sprites/home/shiny/${linkName}.png`
                    return <button className={styles.listItem} key={key}>
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
}