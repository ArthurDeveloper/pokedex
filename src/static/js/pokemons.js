async function getPokemonCount() {
    const count = await fetch('http://localhost:3000/pokemons/count')
                    .then((res) => res.json())
                    .then((json) => json.count);

    return count;
}

async function changePage(pageNumber) {
    const pokemonCount = await getPokemonCount();
    const pokemonsPerPage = Math.floor(pokemonCount / 15);

    removeAllPokemons();

    if (pageNumber > 1) 
        getPokemons(pageNumber*pokemonsPerPage, (pageNumber*pokemonsPerPage)+pokemonsPerPage)
            .then((pokemons) => addPokemons(pokemons));
    else 
        getPokemons(1, pokemonsPerPage)
            .then((pokemons) => addPokemons(pokemons));
}

async function getPokemons(rangeStart, rangeEnd) {
    const url = `http://localhost:3000/pokemons/get?start=${rangeStart}&end=${rangeEnd}`;
    const pokemons = await fetch(url)
                        .then((res) => res.json())
                        .then((json) => json.results);

    return pokemons;
}

async function addPokemons(pokemons) {
    const pokemonsDiv = document.querySelector('#pokemons');

    for (const pokemon of pokemons) {
            await fetch(pokemon.url)
                .then((res) => {
                    return res.json();
                })
                .then((json) => {
                    const pokemonDiv = document.createElement('div');
                    pokemonDiv.classList.add('pokemon');

                    const pokemonName = document.createElement('span');
                    pokemonName.textContent = json.name;
                    pokemonName.classList.add('pokemon-name');

                    const pokemonImage = document.createElement('img');
                    pokemonImage.src = json.sprites.front_default;

                    pokemonDiv.appendChild(pokemonName);
                    pokemonDiv.appendChild(pokemonImage);

                    pokemonsDiv.appendChild(pokemonDiv);
                });
    }
}

function removeAllPokemons() {
    const pokemonsDiv = document.querySelector('#pokemons');
    pokemonsDiv.parentNode.removeChild(pokemonsDiv);
    const newPokemonsDiv = document.createElement('div');
    newPokemonsDiv.id = 'pokemons';
    document.querySelector('#pokemons-container').appendChild(newPokemonsDiv);
}

const changePageButtons = document.querySelectorAll('.change-page-btn');

for (const changePageButton of changePageButtons) {
    changePageButton.addEventListener('click', () => {
        console.log(changePageButton.textContent);
        changePage(changePageButton.textContent);
    })
}

changePage(1);
