const pokedexContainer = document.getElementById("pokedex-container");
const rightBtn = document.getElementById("right-change-btn");
const leftBtn = document.getElementById("left-change-btn");
let dataArr = [];
let currentIndex = 0;
let isShiny = false;

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

const toggleShiny = () => {
    const pokemon = dataArr[currentIndex];
    if (!pokemon.sprites.shiny) return;
    
    isShiny = !isShiny;
    
    const spriteImage = document.querySelector('.img-sprites');
    const shinyButton = document.querySelector('.shiny-toggle-button');
    
    spriteImage.src = isShiny ? pokemon.sprites.shiny : pokemon.sprites.regular;
    shinyButton.classList.toggle('shiny-active', isShiny);
    shinyButton.setAttribute('aria-label', isShiny ? 'Afficher la version normale' : 'Afficher la version chromatique');
};

const displayPokemon = (index) => {
    const pokemon = dataArr[index];
    isShiny = false;
    
    pokedexContainer.innerHTML = `
        <div class="pokemon-card">
            <div class="img-description-container">
                <div class="poke-description">
                    <h1 class="poke-name">${pokemon.name.fr}</h1>
                    <div class="p-container">
                    <p class="poke-num">n°${pokemon.pokedex_id}</p>
                    <p class="poke-generation">Generation&nbsp: ${pokemon.generation}</p>
                    </div>
                    <p class="poke-category">${pokemon.category}</p>
                    <button class="shiny-toggle-button" type="button" aria-label="Afficher la version chromatique">
                        <svg width="512" height="512" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <radialGradient id="goldGradient" cx="40%" cy="40%" r="60%" fx="30%" fy="30%">
                                <stop offset="0%" style="stop-color:#ffeebb;stop-opacity:1" />
                                <stop offset="100%" style="stop-color:#daa520;stop-opacity:1" />
                                </radialGradient>
                                <path id="sparkle" d="M0,-10 C0,-3 3,0 10,0 C3,0 0,3 0,10 C0,3 -3,0 -10,0 C-3,0 0,-3 0,-10 Z" fill="white" />
                            </defs>
                            <circle cx="100" cy="100" r="95" fill="url(#goldGradient)" />
                            <use href="#sparkle" x="100" y="60" transform="translate(100, 60) scale(3.5) translate(-100, -60)" />
                            <use href="#sparkle" x="70" y="130" transform="translate(70, 130) scale(4.5) translate(-70, -130)" />
                            <use href="#sparkle" x="150" y="90" transform="translate(150, 90) scale(2.5) translate(-150, -90)" />
                        </svg>
                    </button>
                </div>
                <div class="poke-imgs">
                    <img class="img-sprites" src="${pokemon.sprites.regular}" alt="${pokemon.name.fr}">
                </div>
                <div class="type-badges">
                   ${pokemon.types.map(type => {
                       const classeType = type.name
                       .toLowerCase()
                       .normalize("NFD")         
                       .replace(/[\u0300-\u036f]/g, "");
                     return `
                       <span class="type-badge type-${classeType}">
                            <img src="${type.image}" alt="${type.name}">
                            ${type.name}
                         </span>
                     `;
                   }).join("")}
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
        </div>
    `;

    const shinyButton = document.querySelector('.shiny-toggle-button');
    if (shinyButton) {
        shinyButton.addEventListener('click', toggleShiny);
    }
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