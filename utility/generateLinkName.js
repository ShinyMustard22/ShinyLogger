export default function generateLinkName(pokemon) {
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