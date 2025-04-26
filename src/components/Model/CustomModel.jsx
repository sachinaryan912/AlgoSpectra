import React from 'react';
import { Dialog, DialogContent, IconButton, Box } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';s
import { styled } from '@mui/system';

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 16,
    padding: theme.spacing(2),
    minWidth: 400,
  },
}));

const CustomModal = ({ open, onClose, children }) => {
  return (
    <StyledDialog open={open} onClose={onClose}>
      <Box display="flex" justifyContent="flex-end">
        <IconButton onClick={onClose}>
          {/* <CloseIcon /> */}
        </IconButton>
      </Box>
      <DialogContent>
        {children}
      </DialogContent>
    </StyledDialog>
  );
};

export default CustomModal;
