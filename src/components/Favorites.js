import React, { useState } from 'react';
import { removeFavoriteDog } from '../store/favoriteSlice';
import { useSelector, useDispatch } from 'react-redux';
import { matchDogs } from '../store/favoriteSlice';
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CongratulationDialog from './CongratulationDialog';
import ConfirmationDialog from './ConfirmationDialog';

const Favorites = () => {
  const favoriteDogs = useSelector((state) => state.favoriteDogs.dogs);
  const matchedDogId = useSelector((state) => state.favoriteDogs.match);
  const dispatch = useDispatch();
  const [selectedDog, setSelectedDog] = useState(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [showCongratulation, setShowCongratulation] = useState(false);

  const handleRemove = (dog) => {
    setSelectedDog(dog);
    setConfirmDialogOpen(true);
  };

  const handleConfirmRemove = () => {
    if (selectedDog) {
      dispatch(removeFavoriteDog(selectedDog.id));
      setSelectedDog(null);
    }
    setConfirmDialogOpen(false);
  };

  const handleCancelRemove = () => {
    setSelectedDog(null);
    setConfirmDialogOpen(false);
  };

  const handleMatch = () => {
    
    const dogIds = favoriteDogs.map((dog) => dog.id);
    dispatch(matchDogs(dogIds))
      .then(() => {
        setShowCongratulation(true);
      })
      .catch((error) => {
        // Handle the error if the match request fails
        console.log('Match request failed:', error);
      });
  };

  return (
    <>
      <List>
        {favoriteDogs.map((dog) => (
          <ListItem key={dog.id}>
            <ListItemAvatar>
              <Avatar alt={dog.name} src={dog.img} />
            </ListItemAvatar>
            <ListItemText
              primary={dog.name}
              secondary={`Zip Code: ${dog.zip_code}`}
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="remove" onClick={() => handleRemove(dog)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>

      <Button variant="contained" color="primary" onClick={handleMatch}>
        Match
      </Button>

      <ConfirmationDialog
      open={confirmDialogOpen}
      onCancel={handleCancelRemove}
      onConfirm={handleConfirmRemove}
    />

      {showCongratulation && (
        <CongratulationDialog
          open={showCongratulation}
          onClose={() => setShowCongratulation(false)}
          matchedDogId={matchedDogId}
        />
      )}
    </>
  );
};

export default Favorites;
