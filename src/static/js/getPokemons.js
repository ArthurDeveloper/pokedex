function addPokemons(pokemons) {
    const pokemonsDiv = document.querySelector('#pokemons');

    const promises = [];

    for (const pokemon of pokemons) {
            fetch(pokemon.url)
                .then((res) => {
                    return res.json()
                })
                .then((json) => {
                    const pokemonDiv = document.createElement('div');

                    const pokemonName = document.createElement('h1');
                    pokemonName.textContent = json.name;

                    const pokemonImage = document.createElement('img');
                    pokemonImage.src = json.sprites.front_default;
                    
                    pokemonDiv.appendChild(pokemonName);
                    pokemonDiv.appendChild(pokemonImage);

                    pokemonsDiv.appendChild(pokemonDiv);
                });
    }
}

window.addEventListener('load', async () => {
    const pokemons = fetch('http://localhost:3000/pokemons/get?start=0&end=1118')
                        .then((res) => res.json())
                        .then((json) => addPokemons(json.results));
});