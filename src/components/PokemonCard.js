import Link from 'next/link';
import Image from 'next/image';

export default function PokemonCard({ name, url }) {
  const id = url.split('/').filter(Boolean).pop();

  return (
    <Link href={`/pokemon/${id}`}>
      <div className="bg-white rounded shadow-md p-4 hover:bg-blue-100 text-center justify-items-center cursor-pointer transition">
        <Image
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
          alt={name}
          width={150}
          height={150}
        />
        <p className="capitalize font-medium mt-2">{name}</p>
      </div>
    </Link>
  );
}
