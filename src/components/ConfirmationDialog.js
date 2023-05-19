import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';

const ConfirmationDialog = ({ open, onCancel, onConfirm }) => {
  return (
    <Dialog open={open}>
      <DialogTitle>Confirm Removal</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to remove this dog from favorites?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={onConfirm} color="primary">
          Remove
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
