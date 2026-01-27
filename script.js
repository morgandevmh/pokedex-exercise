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

        <div class="img-description-container">

           <div class="poke-description">
               <h1 class="poke-name">${pokemon.name.fr}</h1>
               <div class="p-container">
                   <p class="poke-num">n°${pokemon.pokedex_id}</p>
                   <p class="poke-generation">Generation&nbsp: ${pokemon.generation}</p>
                   <p class="poke-category">${pokemon.category}</p>
               </div>
            </div>

            <div class="poke-imgs">
                <img class="img-sprites"src="${pokemon.sprites.regular}" alt="${pokemon.name.fr}">
            </div>

            <div class="poke-types">
            ${pokemon.types.map(type => `<img src="${type.image}" alt="${type.name}" title="${type.name}">`).join('')}
            ${pokemon.types.map(type => type.name).join(' / ')}
            </div>

            <div class="talents-stats-container">
                <div class="poke-talents">
                ${pokemon.talents.map(talent => `<p> Talents&nbsp: ${talent.name}</p>`).join('')}
                </div>
            
                <div class="poke-stats"> Statistiques&nbsp:
                    <ul class="stats-list">
                        <li class="s-hp">HP&nbsp: ${pokemon.stats.hp}</li>
                        <li class="s-att">ATK&nbsp: ${pokemon.stats.atk}</li>
                        <li class="s-def">DEF&nbsp: ${pokemon.stats.def}</li>
                        <li class="s-spe-att">SPE ATK&nbsp: ${pokemon.stats.spe_atk}</li>
                        <li class="s-spe-def">SPE DEF&nbsp: ${pokemon.stats.spe_def}</li>
                        <li class="s-speed">SPEED&nbsp: ${pokemon.stats.vit}</li>
                    </ul>
               </div>
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





