'use client';

import { Box, Stack, TextField, Button, Typography } from '@mui/material'
import React, { useState } from 'react'

import { addItem } from '../lib/util';

const AddItem = () => {

  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(0);

  const handleSubmit = () => {
    // console.log('submit pressed');
    // console.log(name, quantity);
    addItem(name, quantity);
    setName('');
    setQuantity(0);
  }

  return (
    <Box width="100%" height="50vh">
        <Typography variant="h4" textAlign={'center'} sx={{marginBottom:"2rem"}}>Add Items</Typography>
        <Stack direction='column' spacing={2}>
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
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setQuantity(event.target.value === '' ? 0 : parseInt(event.target.value));
            }}
          />
          <Button variant="contained" color="primary" onClick={() => handleSubmit()}>Add Item</Button>
        </Stack>
    </Box>
  )
}

export default AddItem