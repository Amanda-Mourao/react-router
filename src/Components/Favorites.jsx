import { useEffect, useState } from "react";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  console.log(favorites);

  return (
    <div className="bg-[#f5f6f8] min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6 text-center text-[#ef5c55]">
          Favorite Pokémons
        </h1>
        <div
          id="pokemon-container"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {favorites.length === 0 ? (
            <p className="text-[#ef5c55] font-bold text-center">
              No favorites yet!
            </p>
          ) : (
            <div>
              {favorites.map((fav) => (
                <div
                  key={fav.id}
                  className="bg-[#4a7de6] text-white rounded-xl shadow p-4 hover:shadow-lg transition-all duration-300 border-2 w-75"
                >
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold uppercase mb-2">
                      {fav.name}
                    </h2>
                    <p className="text-sm">HP: {fav.stats?.[0]?.base_stat}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm uppercase">
                      TYPE: {fav.types
                        ?.map((typeInfo) => typeInfo.type.name)
                        .join(", ")}
                    </p>
                  </div>
                  <img
                    src={fav.image}
                    alt={fav.name}
                    className="w-100"
                  />
                  <p className="text-sm text-center">
                    ATTACK: {fav.stats?.[1]?.base_stat} | DEFENSE: {fav.stats?.[2]?.base_stat}
                  </p>
                  <p className="text-sm text-center">
                    HEIGHT: {fav.height / 10}m | WEIGHT: {fav.weight / 10}
                    kg
                  </p>
                  <br></br>
                  <p className="text-sm uppercase text-center">
                    ABILITIES:<br></br>
                    {fav.abilities?.map((abilityInfo) => abilityInfo.ability.name).join(", ")}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Favorites;
