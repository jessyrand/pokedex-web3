import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

    const newPokemon = {
      id: Date.now(),
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
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-80">
        <input name="name" placeholder="Name" onChange={handleChange} required />
        <input name="height" placeholder="Height" onChange={handleChange} required />
        <input name="weight" placeholder="Weight" onChange={handleChange} required />
        <input name="type" placeholder="Type (fire, water...)" onChange={handleChange} required />
        <input name="ability" placeholder="Ability" onChange={handleChange} required />
        <button className="bg-blue-500 text-white p-2 rounded-xl">Create</button>
      </form>
    </div>
  );
}