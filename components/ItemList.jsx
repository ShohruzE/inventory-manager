'use client';

import React, { useState, useEffect } from 'react'
import { Stack, Box, Typography, Button } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { collection, getDocs } from "firebase/firestore";

import { db } from '../lib/firebase';
import EditModal from './EditModal';
import DeleteModal from './DeleteModal';

export default function ItemList() {

  const [items, setItems] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); 
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

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
  }, [selectedItem]);

  const handleUpdate = (item) => {
    console.log('Update');
    setSelectedItem(item);
    setIsEditModalOpen(true);
  }

  const handleDelete = (item) => {
    console.log('Delete');
    setSelectedItem(item);
    setIsDeleteModalOpen(true);
  }
  // handleClose function for modal
  const handleClose = () => {
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
  };

  return (
    <Box>
      <Typography variant='h4' textAlign={'center'} sx={{ marginBottom:'2rem'}}>Items</Typography>
      <Stack spacing={1} overflow={'auto'} sx={{ width:'100%', height:'50vh' }}>
        {items.map((item, index) => (
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