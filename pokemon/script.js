const bg_color = {
  grass: "#8BD369",
  fire: "#FF603F",
  water: "#3399FF",
  bug: "#AABB22",
  normal: "#AAAA99",
  flying: "#9AA8FA",
  poison: "#B76EA4",
  electric: "#FFD34E",
  ground: "#E2C56A",
  fairy: "#F1A8EC",
  psychic: "#FF6EA4",
  fighting: "#C56E5C",
  rock: "#C5B679",
  dragon: "#7766EE",
  ice: "#66CCFF",
};

const poke_container = document.querySelector(".poke-container");
const search = document.querySelector(".search");
const searchBtn = document.querySelector(".search-button");
const searchInput = document.querySelector(".search-input");

searchBtn.addEventListener("click", () => {
  search.classList.toggle("active");
});

searchInput.addEventListener("input", (e) => {
  const searchValue = searchInput.value.toLowerCase();

  const pokeName = document.querySelectorAll(".poke-name");

  console.log(pokeName);

  pokeName.forEach((poName) => {
    if (poName.innerHTML.toLowerCase().includes(searchValue)) {
      poName.parentElement.parentElement.style.display = "block";
    } else {
      poName.parentElement.parentElement.style.display = "none";
    }
  });
});

const fetchPokemon = () => {
  for (let i = 0; i < 151; i++) {
    getPokemon(i);
  }
};

const getPokemon = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  console.log(data);
  createPokeCard(data);
};

const createPokeCard = (data) => {
  const pokeDiv = document.createElement("div");
  pokeDiv.classList.add("pokemon");

  const pokemonId = data.id.toString().padStart(3, "0");

  const pokeType = data.types[0].type.name;

  const pokebg = bg_color[pokeType];

  pokeDiv.style.backgroundColor = `${pokebg}`;

  const pokeDivInnerHtml = `
    <div class="image-container">
    <img src="p.jpg" alt="" />
  </div>
  <div class="poke-info">
    <span class="poke-id">#${pokemonId}</span>
    <h3 class="poke-name">${data.name}</h3>
    <div class="small">
      <small class="poke-exp">
        <i class="fa solid fa-flask"></i>
        ${data.base_experience}
      </small>
      <small class="poke-weight">
        <i class="fa solid fa-flask"></i>
       ${data.weight}
      </small>
    </div>
    <div class="poke-type">
      <i class="fa-brands fa-uncharted"></i>${pokeType}
    </div>
  </div>
    
    `;

  pokeDiv.innerHTML = pokeDivInnerHtml;
  poke_container.appendChild(pokeDiv);
};

fetchPokemon();
