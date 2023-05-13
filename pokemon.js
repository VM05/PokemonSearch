const formulario = document.querySelector('#formulario');
const resultado = document.querySelector('.resultado');
const pokemonInput = document.querySelector('.pokemon');

pokemonInput.addEventListener('keyup', () => {
  if (!pokemonInput.value) {
    cargarPokemon();
  }
});
document.addEventListener('DOMContentLoaded', cargarPokemon);
formulario.addEventListener('submit', validarPokemon);

function validarPokemon(e) {
  e.preventDefault();
  const pokemon = document.querySelector('.pokemon').value;

  if (pokemon === '') {
    mostrarAlerta('debe ingresar un un pokemon');
    return;
  }

  consultarApi(pokemon);
}

function mostrarAlerta(mensaje) {
  const error = document.querySelector('.error');

  if (!error) {
    const p = document.createElement('p');
    p.textContent = mensaje;
    p.classList.add('error');
    resultado.appendChild(p);

    setTimeout(() => {
      p.remove();
    }, 3000);
  }
}

async function cargarPokemon() {
  limpiarHTML();
  const url = 'https://pokeapi.co/api/v2/pokemon';

  const respuesta = await fetch(url);
  const resultado = await respuesta.json();

  console.log(resultado);
  resultado.results.forEach((pokemonn) => {
    pokemonData(pokemonn);
  });
}

async function pokemonData(pokemon) {
  try {
    let urlpokemon = pokemon.url;
    const respuesta = await fetch(urlpokemon);
    const resultado = await respuesta.json();
    crearLista(resultado);
  } catch (error) {
    console.log(error);
  }
}

async function consultarApi(pokemon) {
  const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}/`;

  const resultado = await fetch(url);
  const respuesta = await resultado.json();

  console.log(respuesta);
  mostrarPokemon(respuesta);
}

function mostrarPokemon(pokemon) {
  limpiarHTML();
  const {
    name,
    id,
    types,
    sprites: { front_default },
  } = pokemon;

  const divPokemon = document.createElement('div');
  divPokemon.classList.add('card');

  htmlTemplate =
    pokemon.types.length > 1
      ? `
  <p class="nombre_pokemon">nombre: ${name}</p>
  <p>No pokedex: ${id}</p>
  <p>tipo: ${types[0].type.name}</p>
  <p>tipo 2: ${types[1].type.name}</p>
  <img src="${front_default}"/>
  `
      : `
  <p class="nombre_pokemon">nombre: ${name}</p>
  <p>No pokedex: ${id}</p>
  <p>tipo: ${types[0].type.name}</p>
  <img src="${front_default}"/>
  `;

  divPokemon.innerHTML = htmlTemplate;
  resultado.appendChild(divPokemon);
}

function limpiarHTML() {
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }
}

function crearLista(pokemon) {
  const {
    name,
    id,
    sprites: { front_default },
  } = pokemon;

  const divPokemon = document.createElement('div');
  divPokemon.classList.add('card');
  divPokemon.innerHTML = `
            <p class="nombre_pokemon">nombre: ${name}</p>
            <p>No pokedex: ${id}</p>
            
            <img style="width: 100%"; src="${front_default}">
            `;
  resultado.appendChild(divPokemon);
}
