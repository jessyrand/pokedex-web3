import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const typeBorderColors = {
  normal: "border-gray-300",
  fire: "border-red-400",
  water: "border-blue-400",
  electric: "border-yellow-300",
  grass: "border-green-400",
  ice: "border-blue-100",
  fighting: "border-red-600",
  poison: "border-purple-400",
  ground: "border-yellow-600",
  flying: "border-sky-300",
  psychic: "border-pink-400",
  bug: "border-green-600",
  rock: "border-gray-500",
  ghost: "border-purple-600",
  dragon: "border-indigo-500",
  dark: "border-gray-700",
  steel: "border-gray-400",
  fairy: "border-pink-200",
};

const typeBgColors = {
  normal: "bg-gray-300",
  fire: "bg-red-400",
  water: "bg-blue-400",
  electric: "bg-yellow-300",
  grass: "bg-green-400",
  ice: "bg-blue-100",
  fighting: "bg-red-600",
  poison: "bg-purple-400",
  ground: "bg-yellow-600",
  flying: "bg-sky-300",
  psychic: "bg-pink-400",
  bug: "bg-green-600",
  rock: "bg-gray-500",
  ghost: "bg-purple-600",
  dragon: "bg-indigo-500",
  dark: "bg-gray-700",
  steel: "bg-gray-400",
  fairy: "bg-pink-200",
};

const borderColor = (types) => {
  const primaryType = types[0].type.name;
  if (primaryType === "normal" && types.length > 1) {
    return typeBorderColors[types[1].type.name];
  }
  return typeBorderColors[primaryType];
};

export default function PokemonList() {
  const [pokemons, setPokemons] = useState([]);
  const [search, setSearch] = useState("");

  const filteredPokemons = pokemons.filter((pokemon) => pokemon.name.toLowerCase().includes(search));

  useEffect(() => {
    const stored = localStorage.getItem("pokemons");

    if(stored) {
      setPokemons(JSON.parse(stored));
    } else{
      fetch('https://pokeapi.co/api/v2/pokemon?limit=20')
      .then((response) => response.json())
      .then((data) => {
        Promise.all(
          data.results.map((pokemon) =>
            fetch(pokemon.url).then((res) => res.json())
          )
        )
          .then((pokemonDetails) => {
            setPokemons(pokemonDetails);
            localStorage.setItem("pokemons", JSON.stringify(pokemonDetails));
          })
          .catch((error) => {
            console.error('Error fetching Pokemons', error);
          });
      })
      .catch((error) => {
        console.error('Error fetching Pokemons', error);
      });
    }
  }, []);

  useEffect(() => {
    if (pokemons.length > 0) {
      localStorage.setItem("pokemons", JSON.stringify(pokemons));
    }
  }, [pokemons]);

  if (pokemons.length === 0) {
    return (
      <div className="w-full h-screen flex flex-col justify-center text-center items-center font-pokemon text-4xl loading gap-5">
        <h1 className="animate-pulse text-5xl">Loading ...</h1>
        <img className="animate-spin w-50" src="/loading.png" alt="" />
      </div>
    )
  }

  return (     
    <div  className="flex flex-col justify-center items-center h-full w-full background">
      <div className="flex flex-wrap justify-center h-full max-w-[1920px] gap-5 gap-y-5 py-5">
        <div className="flex justify-between items-center h-22 w-full bg-gray-400 p-5 top-0 fixed z-50 opacity-90 shadow-2xl">
          <img className="w-50" src="/logo.png" alt="" />
          <input
            type="search"
            placeholder="rechercher un pokemon"
            onChange={((e) => setSearch(e.target.value.toLowerCase()))}
            className="w-200 p-4 border-3 font-pokemon rounded-4xl h-15 border-gray-600 text-center focus:outline-none font-bold"
          />
          <img className="w-50" src="/pokeball.png" alt="" />
        </div>

        <div className="flex flex-wrap justify-center w-[80vw] gap-5 gap-y-5 py-30">
          {
            filteredPokemons.map((pokemon, pokemonId) => (
              <Link key={pokemonId} to={`/pokemon/${pokemon.name}`}
                className={`flex flex-col gap-2 p-5 bg-white rounded-2xl cursor-pointer opacity-100 hover:-translate-y-3 hover:duration-250 w-[18vw] shadow-xl border-e-4 border-b-4 
                ${borderColor(pokemon.types)}`} >
                <div className="flex justify-end gap-2">
                  {pokemon.types.map((type) => (
                    <p className={`${typeBgColors[type.type.name]} p-1 rounded-lg w-15 flex justify-center text-sm`}>
                      {type.type.name}
                    </p>
                  ))}
                </div>
                <div className="flex flex-col items-center bg-gray-300">
                    <img src={pokemon.sprites.other['official-artwork'].front_default}
                    className={`h-[30vh] w-[15vw] rounded-lg`} alt="" />
                </div>
                <div className="flex flex-col items-center">
                    <p className="text-2xl bg-gray-200 rounded-4xl p-2 h-12 w-12 text-center font-pokemon">{pokemon.id}</p>
                <h2 className="text-2xl font-bold font-pokemon">{pokemon.name}</h2>
            </div>
              </Link>
            ))
          }
        </div>
        {filteredPokemons.length === 0 && (
          <div className="flex flex-col justify-center font-pokemon items-center gap-10 h-full">
            <p className="text-3xl">Aucun Pokémon ne correspond à votre recherche</p>
            <img className="w-91 p-10" src="sorry.png" alt="" />
          </div>
        )}
      </div>
    </div >
  )
}
