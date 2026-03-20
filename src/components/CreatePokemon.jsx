import { useState } from "react";
import { useNavigate } from "react-router-dom";

const pokemonTypes = [
  "normal","fire","water","electric","grass","ice","fighting","poison",
  "ground","flying","psychic","bug","rock","ghost","dragon","dark","steel","fairy"
];

export default function CreatePokemon() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    height: "",
    weight: "",
    type: "",
    ability: "",
  });

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const stored = JSON.parse(localStorage.getItem("pokemons")) || [];

    const newId = (stored.length + 1);

    const newPokemon = {
      id: newId,
      name: form.name,
      height: Number(form.height),
      weight: Number(form.weight),
      types: [{ type: { name: form.type } }],
      abilities: [{ ability: { name: form.ability } }],
      stats: [],
      sprites: {
        other: {
          "official-artwork": {
            front_default: "/default-pokemon.png"
          }
        }
      }
    };

    const updated = [...stored, newPokemon];
    localStorage.setItem("pokemons", JSON.stringify(updated));
    navigate("/home");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-5">
      <h1 className="text-3xl font-bold">Create Pokémon</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-80">
        <input name="name" placeholder="Name" className="pl-1" onChange={handleChange} required />
        <input name="height" placeholder="Height" className="pl-1" onChange={handleChange} required />
        <input name="weight" placeholder="Weight" className="pl-1" onChange={handleChange} required />
        <div className="flex flex-col gap-1">
            <label htmlFor="type" className="pl-1">Type :</label>
            <select
                id="type"
                name="type"
                value={form.type}
                onChange={handleChange}
                className="p-2 rounded-xl"
                required
            >
                {pokemonTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
                ))}
            </select>
        </div>
        <input name="ability" placeholder="Ability" className="pl-1" onChange={handleChange} required />
        <button className="bg-blue-500 text-white p-2 rounded-xl">Create</button>
      </form>
    </div>
  );
}