import { useEffect, useState } from 'react';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  return (
    <div>
      <h2>My Favorite Pokémons</h2>
      {favorites.length === 0 ? (
        <p>No favorites yet.</p>
      ) : (
        <ul>
          {favorites.map((fav) => (
            <li key={fav.id}>
              <img src={fav.image} alt={fav.name} />
              <p>{fav.name}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Favorites;