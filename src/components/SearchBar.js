export default function SearchBar({ value, onChange }) {
    return (
      <input
        type="text"
        placeholder="Search Pokémon..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-150 p-2 border rounded-md shadow-sm"
      />
    );
  }
  