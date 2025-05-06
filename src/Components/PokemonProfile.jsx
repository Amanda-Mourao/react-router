import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function PokemonProfile() {
    const [pokemon, setPokemon] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                const response = await axios.get(
                    `https://pokeapi.co/api/v2/pokemon/${id}`
                );
                setPokemon(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchPokemon();
    }, [id]);

    const handleAddToFavorites = () => {
        const currentFavorites =
            JSON.parse(localStorage.getItem("favorites")) || [];
        const alreadyExists = currentFavorites.some((fav) => fav.id === pokemon.id);

        if (!alreadyExists) {
            const newFavorites = [
                ...currentFavorites,
                {
                    id: pokemon.id,
                    name: pokemon.name,
                    image: pokemon.sprites.front_default,
                },
            ];
            localStorage.setItem("favorites", JSON.stringify(newFavorites));
            alert(`${pokemon.name} added to favorites!`);
        } else {
            alert(`${pokemon.name} is already in your favorites.`);
        }
    };
    console.log(pokemon);
    return (
        <div className="min-h-screen bg-[#f5f6f8] py-8">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold mb-6 text-center text-[#ef5c55]">
                    Pokémon Profile
                </h1>
                <div className="bg-[#4a7de6] text-white rounded-xl shadow p-4 hover:shadow-lg transition-all duration-300 border-2 w-60">
                    <h2 className="text-xl font-semibold uppercase mb-2">
                        {pokemon.name}
                    </h2>
                    {/* <p className="text-sm">HP: {pokemon.stats?.map((base_stat) => base_stat. stats.[1])}</p> */}
                    <p className="text-sm uppercase">TYPE: {pokemon.types?.map((typeInfo) => typeInfo.type.name).join(", ")}</p>
                    <button
                        onClick={handleAddToFavorites}
                        className="active:text-amber-300"
                    >
                        ★
                    </button>
                    <img
                        src={pokemon.sprites?.front_default}
                        alt={pokemon.name}
                        className="w-100"
                    />
                    {/* <p className="text-sm text-center">ATTACK: {pokemon.stats[1].base_stat} | DEFENSE: {pokemon.stats[2].base_stat}</p> */}
                    <p className="text-sm text-center">
                        HEIGHT: {pokemon.height / 10}m | WEIGHT: {pokemon.weight / 10}kg
                    </p>
                    <br></br>
                    <p className="text-sm uppercase text-center">ABILITIES:<br></br>{pokemon.abilities?.map((abilityInfo) => abilityInfo.ability.name).join(", ")}</p>
                </div>
            </div>
        </div>
    );
}

export default PokemonProfile;
