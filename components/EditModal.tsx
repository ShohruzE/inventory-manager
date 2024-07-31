import React, { useState } from 'react'
import { Dialog, DialogTitle, Stack, TextField, Button, Typography } from '@mui/material';

import { updateItem } from '../lib/util';

type Item = {
    id: string;
    name: string;
    quantity: number;
}

type EditModalProps = {
    item: Item;
    isEditModalOpen: boolean;
    setIsEditModalOpen: (isOpen: boolean) => void;
    handleClose: () => void;
}

const EditModal = ({ item, isEditModalOpen, setIsEditModalOpen, handleClose }: EditModalProps) => {

  const [name, setName] = useState(item.name);
  const [quantity, setQuantity] = useState(item.quantity);

  const handleSubmit = () => {
    // console.log('submit pressed');
    // console.log(name, quantity);
    // console.log(item.id)
    updateItem(item.id, name, quantity); // call to firestore function
    setIsEditModalOpen(false);
  }

  return (
    <Dialog open={isEditModalOpen} onClose={handleClose}>
        <DialogTitle borderBottom="1px solid gray">
            <Stack direction='row' spacing={1} justifyContent='center' alignItems={'center'}>
                <Typography fontSize={24}>Update</Typography>
                <Typography fontSize={24} borderBottom="1px solid #1769aa">{item.name}</Typography>
            </Stack>
        </DialogTitle>
        <Stack direction='column' spacing={2} margin={4}>
          <TextField 
            required 
            id="outlined-basic" 
            label="Item Name" 
            variant="outlined"   
            value={name}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setName(event.target.value);
            }}
           />
          <TextField 
            required 
            id="outlined-basic" 
            type="number" 
            label="Item Quantity" 
            variant="outlined"
            value={quantity}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setQuantity(parseInt(event.target.value));
            }}
          />
          <Button variant="contained" color="primary" onClick={() => handleSubmit()}>Update Item</Button>
        </Stack>
    </Dialog>
  )
}

export default EditModal