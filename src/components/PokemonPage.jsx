
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faChevronRight, faChevronLeft, faArrowLeft, faMars, faVenus, faAnglesRight, faQuestion } from '@fortawesome/free-solid-svg-icons'
import PokemonChart from "./PokemonChart";
import "../App.css"

library.add(faChevronLeft, faChevronRight, faArrowLeft, faMars, faVenus, faAnglesRight, faQuestion);

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

const typeTextColors = {
  normal: "text-gray-300",
  fire: "text-red-400",
  water: "text-blue-400",
  electric: "text-yellow-300",
  grass: "text-green-400",
  ice: "text-blue-100",
  fighting: "text-red-600",
  poison: "text-purple-400",
  ground: "text-yellow-600",
  flying: "text-sky-300",
  psychic: "text-pink-400",
  bug: "text-green-600",
  rock: "text-gray-500",
  ghost: "text-purple-600",
  dragon: "text-indigo-500",
  dark: "text-gray-700",
  steel: "text-gray-400",
  fairy: "text-pink-200",
};

export default function PokemonPage() {
  const [pokemon, setPokemon] = useState(null);
  const {pokemonName} = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState("");
  const [story, setStory] = useState("");
  const [gender, setGender] = useState("");


  useEffect(() => {
    if(pokemonName){
    const URL = `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`;
    axios.get(URL).then((response) => {
      setPokemon(response.data);
    })
        .catch((error) => {
          console.error('Error fetching Pokemons', error)
          setPokemon(null)}
        );
    } else {
      setPokemon(null);
    }
  }, [pokemonName]);
  console.log("pokemonName: ", pokemonName)

  useEffect(() => {
    if (pokemonName) {
      fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonName.toLowerCase()}/`)
          .then((res) => res.json())
          .then((data) => {
            setCategory(data.genera.find(genus => genus.language.name === "en")?.genus);

            const story = data.flavor_text_entries
                .filter(entry => entry.language.name === "en")
                .map(entry => entry.flavor_text)
                .filter((text, index, self) => self.indexOf(text) === index)
                .slice(0, 5)
                .join("\n\n");
            setStory(story.length > 0 ? story : "No story available for "+ pokemonName);

            const genderRate = data.gender_rate;
            let genderDisplay = null;
            if (genderRate === -1) {
              genderDisplay = <FontAwesomeIcon icon="question" className="text-gray-500 text-2xl" />;
            } else if (genderRate === 0){
              genderDisplay = <FontAwesomeIcon icon="mars" className="text-blue-500 text-2xl" />
            } else if (genderRate === 8){
              genderDisplay = <FontAwesomeIcon icon="venus" className="text-rose-500 text-2xl" />
            }
            else{
              genderDisplay = (
                  <div className="flex gap-2">
                    <FontAwesomeIcon icon="mars" className="text-blue-500 text-2xl" />
                    <FontAwesomeIcon icon="venus" className="text-rose-500 text-2xl" />
                  </div>
              )
            }
            setGender(genderDisplay)
          })
          .catch((error) => console.error("Error fetching species data", error));
    }
  }, [pokemonName]);


  if (pokemon === null /*|| !Array.isArray(pokemons) || pokemons.length === 0*/) {
    return (
        <div className="w-full h-screen flex flex-col justify-center text-center items-center font-pokemon text-4xl loading gap-5">
          <h1 className="animate-pulse text-5xl">Loading ...</h1>
          <img className="animate-spin w-50" src="/loading.png" alt="" />
        </div>
    )
  }

  return (
    <div className="w-[90vw] flex flex-col justify-center gap-5 p-3">

      <Link to="/home" className="flex gap-2 items-center inset-0 relative left-30">
          <FontAwesomeIcon icon="arrow-left" className= {`cursor-pointer hover:duration-500 hover:scale-150 ${typeTextColors[pokemon.types[0].type.name]}`}
          />
        <p className="font-bold">Pokedex</p>
      </Link>
      <div className="w-full flex justify-between items-center gap-10 ml-25">
        <div className="flex flex-col gap-5 relative w-[50vw]">

          <div className="flex flex-col gap-2">
            <div className="flex gap-3 items-center">
              <p className="font-bold text-4xl font-pokemon">{pokemon.name}</p>
              <p className="text-gray-400 text-2xl font-bold">#00{pokemon.id}</p>
            </div>
            <div>
                <div className="flex gap-2">
                  {pokemon.types.map((type, index) => (
                      <p
                          key={`${type.type.name}-${index}`}
                          className={`${typeBgColors[type.type.name]} px-5 py-1 rounded-2xl flex justify-center text-sm`}>
                        {type.type.name}
                      </p>
                  ))}
                </div>
            </div>
          </div>

          <div>
            <img src={pokemon.sprites.other['official-artwork'].front_default}
              className="h-[80vh] w-[40vw] shadow-2xl bg-gray-200 rounded-lg" alt="" />
          </div>
        </div>

        <div className="flex flex-col gap-6 w-[50vw] px-3 relative inset-0">

          <div className="flex flex-col gap-3">
            <h2 className="font-bold text-xl">Story</h2>
            <p>{story}</p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="font-bold text-xl">Characteristics</h2>
          </div>

          <div className="flex flex-wrap mx-auto w-[25vw] gap-3 items-center justify-center">
            <div className={`flex flex-col items-center gap-2 p-5 shadow-2xl shadow-orange-300 rounded-sm`}>
              <h2 className="font-bold text-xl">Height</h2>
              <p>{Math.round(pokemon.height * 0.1 * 10) / 10}m</p>
            </div>
            <div className="flex flex-col items-center gap-2 p-5 shadow-2xl shadow-orange-300 rounded-sm">
              <h2 className="font-bold text-xl">Category</h2>
              <p>{category}</p>
            </div>
            <div className="flex flex-col items-center gap-2 p-5 shadow-2xl shadow-orange-300 rounded-sm">
              <h2 className="font-bold text-xl">Gender</h2>
              <div className="flex gap-3">
                <p>{gender}</p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2 p-5 shadow-2xl shadow-orange-300 rounded-sm">
              <h2 className="font-bold text-xl">Weight</h2>
              <p>{Math.round(pokemon.weight * 0.1 * 10) / 10}kg</p>
            </div>
            <div className="flex flex-col items-center gap-2 p-5 shadow-2xl shadow-orange-300 rounded-sm">
              <h2 className="font-bold text-xl">Abilities</h2>
              <p>{
                pokemon.abilities.slice(0, 1).map((abilityObj, index) => (
                    <p key={index}>{abilityObj.ability.name}</p>
                ))
              }</p>
            </div>
          </div>

          <div className="flex flex-col max-w-[30vw]">
            <h2 className="font-bold text-xl">Stats</h2>
            <PokemonChart stats={pokemon.stats} />
          </div>
        </div>
      </div>

    </div>
  );
}


