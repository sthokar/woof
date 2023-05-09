import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import { removeFavoriteDog } from '../../store/favoriteSlice';

function FavoriteDogs() {
  const favoriteDogs = useSelector((state) => state.favoriteDogs);
  const dispatch = useDispatch();


  const handleRemove = (id) => {
    // Dispatch the ID of the dog to be removed to the store

    dispatch(removeFavoriteDog({ id }));
  };

  const handleMatchRequest = () => {
    // Send a match request to the API
  };

  return (
    <div>
      <h2>Favorite Dogs</h2>
      {favoriteDogs.map((dog) => (
        <div key={dog.id}>
          <img src={dog.img} alt={dog.name} style={{ maxWidth: 100 }} />
          <p>{dog.name}</p>
          <IconButton onClick={() => handleRemove(dog.id)}>
            <DeleteIcon />
          </IconButton>
        </div>
      ))}
      <IconButton onClick={handleMatchRequest}>
        <SendIcon />
      </IconButton>
    </div>
  );
}

export default FavoriteDogs;
