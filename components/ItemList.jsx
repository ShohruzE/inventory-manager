'use client';

import React, { useState, useEffect } from 'react'
import { Stack, Box, Typography, Button, TextField, Slider } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { collection, getDocs } from "firebase/firestore";

import { db } from '../lib/firebase';
import { getItemsByQuantityFilter } from '../lib/util';
import EditModal from './EditModal';
import DeleteModal from './DeleteModal';

export default function ItemList() {

  const [items, setItems] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); 
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  // const [quantityFilterValue, setQuantityFilterValue] = useState([0, 100]);
  // const [isFilterApplied, setIsFilterApplied] = useState(false);

  useEffect(() => {
    async function getItems() {
        const querySnapshot = await getDocs(collection(db, "inventory"));
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push(doc.data());
        });
        console.log(items);
        setItems(items);
    }
    getItems();
  }, []);

  // useEffect(() => {
  //   async function getItems() {
  //     if (isFilterApplied) {
  //       const items = await getItemsByQuantityFilter(quantityFilterValue[0], quantityFilterValue[1]);
  //       setItems(items);
  //       setIsFilterApplied(false);
  //     }
  //   }
  //   if (isFilterApplied) {
  //     getItems();
  //   }
  // }, [isFilterApplied]);

  const handleUpdate = (item) => {
    // console.log('Update');
    setSelectedItem(item);
    setIsEditModalOpen(true);
  }

  const handleDelete = (item) => {
    // console.log('Delete');
    setSelectedItem(item);
    setIsDeleteModalOpen(true);
  }
  // handleClose function for modal
  const handleClose = () => {
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
  };

  // const getQuantityFilter = (value) => { 
  //   return `${value}`;
  // }

  // const handleQuantityFilterChange = (event, newValue) => {
  //   setQuantityFilterValue(newValue);
  // };

  return (
    <Box>
      <Typography variant='h4' textAlign={'center'} sx={{ marginBottom:'2rem'}}>Items</Typography>
        <Box width="100%" marginBottom={4}>
          <TextField
            color="success"
            fullWidth={true}
            id="outlined-basic" 
            label="Search..." 
            variant="filled"   
            value={searchQuery}
            onChange={(event) => {
              setSearchQuery(event.target.value);
            }}
          />
        </Box>
        {/* <Box width="100%">
          <Slider
            aria-label='Quantity'
            getAriaValueText={getQuantityFilter}
            valueLabelDisplay='auto'
            onChange={handleQuantityFilterChange}
            value={quantityFilterValue}
            step={1}
          />
        </Box>
      
      <Box textAlign={'right'} sx={{ marginTop:'1rem', marginBottom:'1rem'}}>
        <Button variant="outlined" onClick={setIsFilterApplied(true)}>
          Apply
        </Button>
      </Box> */}
      <Stack spacing={1} overflow={'auto'} sx={{ width:'100%', height:'50vh' }}>
        {items.filter((item) => { 
          return searchQuery.toLowerCase() === "" ? item : item.name.toLowerCase().includes(searchQuery);
        }).map((item, index) => (
          <Box 
            key={index}
            sx={{
              padding:'1rem 1rem', 
              display:'flex',
              border:'1px solid #ccc',
              justifyContent:'space-between',
              alignItems: 'center'
            }}
          >
            <Box>
              <Typography variant='h6'>{item.name}</Typography>
              <Typography variant='body2' color="gray">Quantity: {item.quantity}</Typography>
            </Box>
            <Box>
              <Button variant='outlined' onClick={() => handleUpdate(item)} sx={{ marginRight:'0.25rem'}}>
                <EditIcon fontSize='small' />
              </Button>
              <Button variant='outlined' onClick={() => handleDelete(item)}>
                <DeleteIcon fontSize='small' />
              </Button>
            </Box>
          </Box>
        ))}
        {items.length === 0 && 
          <Box>
            <Typography variant='h6' color="gray" textAlign={'center'}>No items found...</Typography>
          </Box>
        }
      </Stack>
      {isEditModalOpen && 
        <EditModal 
          item={selectedItem} 
          isEditModalOpen={isEditModalOpen} 
          setIsEditModalOpen={setIsEditModalOpen}
          handleClose={handleClose}
      />}
      {isDeleteModalOpen && 
        <DeleteModal 
          item={selectedItem} 
          isDeleteModalOpen={isDeleteModalOpen}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          handleClose={handleClose}
      />}

    </Box>
  )
}