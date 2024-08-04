'use client';

import { Box, Stack, TextField, Button, Typography, Alert } from '@mui/material'
import React, { useState } from 'react'
import Link from 'next/link';
import { auth } from '../lib/firebase';

import { addItem } from '../lib/util';

const AddItemForm = () => {

  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    // console.log('submit pressed');
    // console.log(name, quantity);
    setIsSubmitted(false);
    addItem(name, quantity);
    setName('');
    setIsSubmitted(true);
  }

  return (
    <Box width="50%" height="50vh" sx={{flexGrow:1}}>
        <Typography variant="h4" textAlign={'center'} sx={{marginBottom:"2rem"}}>Add an Item</Typography>
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
          <Stack direction='column' spacing={2}>
            <Box width="100%">
              {isSubmitted && auth?.currentUser && <Alert severity="success">Item added successfully!</Alert>}
              {isSubmitted && !auth?.currentUser && <Alert severity="error">Unable to add an item. You are not logged in.</Alert>}
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

export default AddItemForm