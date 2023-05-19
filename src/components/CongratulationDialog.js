import React from 'react';
import { useSelector } from 'react-redux';

import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';

const CongratulationDialog = ({ open, onClose, matchedDogId }) => {
    const favoriteDogs = useSelector((state) => state.favoriteDogs.dogs);
  const matchedDog = favoriteDogs.find((dog) => dog.id === matchedDogId);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Congratulations!</DialogTitle>
      <DialogContent>
        <DialogContentText>
          You have a match with a dog!
        </DialogContentText>
        {matchedDog && (
          <div>
            <img src={matchedDog.img} alt={matchedDog.name} />
            <p>Name: {matchedDog.name}</p>
            <p>Zip Code: {matchedDog.zip_code}</p>
          </div>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CongratulationDialog;
