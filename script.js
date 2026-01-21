const pokedexContainer = document.getElementById("pokedex-container");
const rightBtn = document.getElementById("right-change-btn");
const leftBtn = document.getElementById("left-change-btn");
let dataArr = [];
let currentIndex = 0;

pokedexContainer.innerHTML = '<p>Chargement...</p>';

fetch("https://tyradex.vercel.app/api/v1/pokemon")
    .then(res => {
        if (!res.ok) throw new Error('Erreur de chargement');
        return res.json();
    })
    .then(data => {
        dataArr = data.filter(pokemon => pokemon.pokedex_id !== 0);
        currentIndex = 0;
        displayPokemon(currentIndex);
    })
    .catch(error => {
        pokedexContainer.innerHTML = `<p>Erreur : ${error.message}</p>`;
    });

const displayPokemon = (index) =>{
    const pokemon = dataArr[index];
    
    pokedexContainer.innerHTML = `
        <div class="pokemon-card">
            <img class="img-sprites"src="${pokemon.sprites.regular}" alt="${pokemon.name.fr}">
            <p class="poke-name">${pokemon.name.fr}</p>
            <p class="poke-num">#${pokemon.pokedex_id}</p>
            <div class="poke-category">
            ${pokemon.types.map(type => `<img src="${type.image}" alt="${type.name}" title="${type.name}">`).join('')}
            ${pokemon.types.map(type => type.name).join(' / ')}
            </div>
        </div>
    `;
};

rightBtn.addEventListener("click", () => {
    currentIndex++;
    if (currentIndex >= dataArr.length) {
        currentIndex = 0;
    }
    displayPokemon(currentIndex);
});

leftBtn.addEventListener("click", () => {
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = dataArr.length - 1;
    }
    displayPokemon(currentIndex);
});





