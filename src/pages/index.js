import { useState } from 'react';
import SearchBar from '@/components/SearchBar';
import PokemonCard from '@/components/PokemonCard';
import { fetchPokemonList } from '@/utils/fetchPokemonList';

export async function getStaticProps() {
  const pokemonList = await fetchPokemonList();
  return {
    props: { pokemonList },
  };
}

export default function Home({ pokemonList }) {
  const [search, setSearch] = useState('');
  const filtered = pokemonList.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Pokémon Explorer</h1>
      <div className="flex justify-center">
        <SearchBar value={search} onChange={setSearch} />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-6">
        {filtered.map((pokemon, index) => (
          <PokemonCard key={index} name={pokemon.name} url={pokemon.url} />
        ))}
      </div>
    </div>
  );
}

