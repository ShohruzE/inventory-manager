import React from 'react'
import { AppBar, Typography, Container, Box, Toolbar, Button, Link } from "@mui/material";


const Footer = () => {
  return (
        <AppBar position="sticky">
            <Box textAlign={'center'} padding={2}>
                <Typography variant="body1">Made by Shohruz Ernazarov</Typography>
            </Box>
        </AppBar>
  )
}

export default Footer