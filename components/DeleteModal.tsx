import React from 'react'
import { Dialog, DialogTitle, Stack, Button, Typography, Box } from '@mui/material';

import { deleteItem } from '../lib/util';

type Item = {
    id: string;
    name: string;
    quantity: number;
}

type DeleteModalProps = {
    item: Item;
    isDeleteModalOpen: boolean;
    setIsDeleteModalOpen: (isOpen: boolean) => void;
    handleClose: () => void;
}

const DeleteModal = ({ item, isDeleteModalOpen, setIsDeleteModalOpen, handleClose }: DeleteModalProps) => {

  const handleSubmit = () => {
    // console.log('submit pressed');
    deleteItem(item.id); // call to firestore function
    setIsDeleteModalOpen(false);
  }

  return (
    <Dialog open={isDeleteModalOpen} onClose={handleClose}>
        <DialogTitle borderBottom="1px solid gray">
            <Stack direction='row' spacing={1} justifyContent='center' alignItems={'center'}>
                <Typography fontSize={24}>Delete</Typography>
                <Typography fontSize={24} borderBottom="1px solid #1769aa">{item.name}</Typography>
            </Stack>
        </DialogTitle>
        <Stack direction='column' spacing={2} margin={4}>
          <Typography>Are you sure you want to delete this item?</Typography>
          <Box display="flex" justifyContent={'center'} alignItems={'center'} sx={{ gap:"1rem" }}>
            <Button variant="outlined" color="primary" onClick={() => setIsDeleteModalOpen(false)}>Cancel</Button>
            <Button variant="contained" color="error" onClick={() => handleSubmit()}>Delete Item</Button>   
          </Box>
        </Stack>
    </Dialog>
  )
}

export default DeleteModal