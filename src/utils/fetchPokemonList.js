import axios from 'axios';

export async function fetchPokemonList(limit = 151) {
  const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
  return res.data.results;
}
