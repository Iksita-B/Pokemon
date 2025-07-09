import Image from 'next/image';
import { fetchPokemonList } from '@/utils/fetchPokemonList';
import { FaHeart, FaBolt, FaShieldAlt, FaRunning, FaFistRaised, FaBrain } from 'react-icons/fa';
import CountUp from 'react-countup';

export async function getStaticPaths() {
  const data = await fetchPokemonList();
  const paths = data.map((_, index) => ({
    params: { id: (index + 1).toString() },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.id}`);
  const data = await res.json();

  return {
    props: {
      pokemon: data,
    },
  };
}

const statIcons = {
  hp: <FaHeart />,
  attack: <FaFistRaised />,
  defense: <FaShieldAlt />,
  'special-attack': <FaBolt />,
  'special-defense': <FaBrain />,
  speed: <FaRunning />,
};

const statColors = {
  hp: 'bg-red-100',
  attack: 'bg-orange-100',
  defense: 'bg-yellow-100',
  'special-attack': 'bg-blue-100',
  'special-defense': 'bg-green-100',
  speed: 'bg-purple-100',
};

export default function PokemonDetail({ pokemon }) {
  if (!pokemon) return <p className="p-6">Pokémon not found.</p>;

  const typeLine = pokemon.types.map(t => t.type.name).join(' | ');

  const moveColors = ['bg-pink-200', 'bg-yellow-200', 'bg-blue-200', 'bg-green-200', 'bg-purple-200'];

  return (
    <div className="p-6 max-w-6xl mx-auto text-gray-800">
      {/* Heading */}
      <div className="flex flex-col sm:flex-row items-center gap-6 mb-10">
        <div className="bg-gray-100 p-4 rounded-xl shadow-md">
          <Image
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            width={150}
            height={150}
          />
        </div>
        <div>
          <h1 className="text-4xl font-bold capitalize">{pokemon.name}</h1>
          <p className="text-md italic text-gray-600 mt-1">{typeLine}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        {/* Stats */}
        <div className="sm:col-span-2">
          <h2 className="text-2xl font-bold mb-6">Stats</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {pokemon.stats.map((stat) => (
              <div
                key={stat.stat.name}
                className={`aspect-square flex flex-col gap-5 items-center ${statColors[stat.stat.name] || 'border-gray-300'} rounded-lg p-4 shadow-md`}
              >
                <div className="text-md capitalize">{stat.stat.name}</div>
                <CountUp end={stat.base_stat} duration={1.5} className="text-8xl semi-bold" />
                <div className="text-xl text-gray-600 mt-1">
                  {statIcons[stat.stat.name] || '⬤'}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Abilities */}
        <div className="space-y-3 max-h-72 overflow-y-auto pr-2">
          <h2 className="text-xl font-semibold mb-6">Abilities</h2>
          {pokemon.abilities.map((a, index) => (
            <div
              key={a.ability.name}
              className={`px-4 py-2 rounded-md shadow ${
                index % 2 === 0 ? 'bg-blue-100' : 'bg-blue-200'
              }`}
            >
              {a.ability.name}
            </div>
          ))}
        </div>

      </div>

      {/* Moves */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4 text-center">Moves</h2>
        <div className="overflow-x-auto whitespace-nowrap">
          <div className="flex gap-3 px-2 py-4">
            {pokemon.moves.map((move, index) => (
              <div
                key={move.move.name}
                className={`border-2 rounded-lg px-4 py-2 min-w-max text-lg font-semibold capitalize ${moveColors[index % moveColors.length]}`}
              >
                {move.move.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
