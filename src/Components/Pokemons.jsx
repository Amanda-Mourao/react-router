import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Pokemons() {
  const [pokemons, setPokemons] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchPokemons = async () => {
      const fetchedPokemons = [];
      for (let i = 1; i <= 150; i++) {
        try {
          const response = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${i}`
          );
          fetchedPokemons.push(response.data);
        } catch (error) {
          console.error(`Erroir ID ${i}:`, error);
        }
      }
      setPokemons(fetchedPokemons);
    };
    fetchPokemons();
  }, []);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(favorites.map((fav) => fav.id));
  }, []);

  const handleAddToFavorites = (pokemon) => {
    const currentFavorites =
      JSON.parse(localStorage.getItem('favorites')) || [];
    const alreadyExists = currentFavorites.some((fav) => fav.id === pokemon.id);

    if (!alreadyExists) {
      const newFavorites = [
        ...currentFavorites,
        {
          id: pokemon.id,
          name: pokemon.name,
          image: pokemon.sprites?.front_default,
        },
      ];
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      setFavorites([...favorites, pokemon.id]);
      alert(`${pokemon.name} added to favorites!`);
    } else {
      alert(`${pokemon.name} is already in your favorites.`);
    }
  };

  const isFavorite = (pokemon) => {
    const currentFavorites =
      JSON.parse(localStorage.getItem('favorites')) || [];
    return currentFavorites.some((fav) => fav.id === pokemon.id);
  };

  return (
    <div className='bg-[#f5f6f8] min-h-screen py-8'>
      <div className='container mx-auto px-4'>
        <h1 className='text-3xl font-bold mb-6 text-center text-[#ef5c55]'>
          Pokémon Cards
        </h1>
        <div
          id='pokemon-container'
          className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'
        >
          {pokemons.map((pokemon) => (
            <div
              key={pokemon.id}
              className='bg-[#4a7de6] text-white rounded-xl shadow p-4 hover:shadow-lg transition-all duration-300 border-2'
            >
              <div className='flex justify-between items-center'>
                <h2 className='text-xl font-semibold uppercase mb-2'>
                  {pokemon.name}
                </h2>
                <p className='text-sm'>HP: {pokemon.stats[0].base_stat}</p>
              </div>
              <div className='flex justify-between items-center'>
                <p className='text-sm uppercase'>
                  TYPE:{' '}
                  {pokemon.types
                    .map((typeInfo) => typeInfo.type.name)
                    .join(', ')}
                </p>
                <button
                  onClick={() => handleAddToFavorites(pokemon)}
                  disabled={isFavorite(pokemon)}
                  className={`text-2xl transition-colors duration-200 ${isFavorite(pokemon)
                      ? 'text-yellow-300 cursor-not-allowed'
                      : 'text-white hover:text-yellow-300'
                    }`}
                  title={
                    isFavorite(pokemon)
                      ? 'Already in favorites'
                      : 'Add to favorites'
                  }
                >
                  {isFavorite(pokemon) ? '★' : '☆'}
                </button>
              </div>
              <Link to={`/pokemon/${pokemon.id}`}>
                <img
                  src={pokemon.sprites?.front_default}
                  alt={pokemon.name}
                  className='w-100'
                />
              </Link>
              <p className='text-sm text-center'>
                ATTACK: {pokemon.stats[1].base_stat} | DEFENSE:{' '}
                {pokemon.stats[2].base_stat}
              </p>
              <p className='text-sm text-center'>
                HEIGHT: {pokemon.height / 10}m | WEIGHT: {pokemon.weight / 10}kg
              </p>
              <br></br>
              <p className='text-sm uppercase text-center'>
                ABILITIES:<br></br>
                {pokemon.abilities
                  .map((abilityInfo) => abilityInfo.ability.name)
                  .join(', ')}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Pokemons;
