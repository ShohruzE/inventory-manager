'use client';

import { Box, Stack, TextField, Button, Typography, Alert } from '@mui/material'
import React, { useState } from 'react'
import Link from 'next/link';

import { addItem } from '../lib/util';

const AddItem = () => {

  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    // console.log('submit pressed');
    // console.log(name, quantity);
    setIsSubmitted(false);
    addItem(name, quantity);
    setName('');
    setQuantity(0);
    setIsSubmitted(true);
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
            value={quantity}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setQuantity(event.target.value === '' ? 0 : parseInt(event.target.value));
            }}
          />
          <Stack direction='column' spacing={2}>
            <Box width="100%">
              {isSubmitted && <Alert severity="success">Item added successfully. Refresh to see the changes</Alert>}
            </Box>
            <Stack direction='row' alignItems="center" spacing={4}>
              <Button variant="contained" color="primary" onClick={() => handleSubmit()}>Add Item</Button>
              <Link href="add-with-camera">
                <Button variant="contained" color="secondary" sx={{width:"100%"}}>Add with Camera</Button>
              </Link>
            </Stack>
          </Stack>
        </Stack>
    </Box>
  )
}

export default AddItem