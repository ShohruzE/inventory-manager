'use client';

import React, { useState, useEffect } from 'react'

import { AppBar, Typography, Container, Box, Toolbar, Button, Link } from "@mui/material";
import { auth } from '../lib/firebase';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
// import Link from 'next/link';

const Navbar = () => {

    const [user, setUser] = useState(null);
    const router = useRouter();
  
    // useEffect(() => {
    //   const auth = getAuth(app);
    //   const unsubscribe = auth.onAuthStateChanged((user) => {
    //       if (user) {
    //           setUser(user);
    //           router.push('/');
    //       }
    //       else{ 
    //           setUser(null);
    //       }
    //   });
    //       return () => unsubscribe();
    // }, []);
  
    // const signInWithGoogle = async () => {
    //   const auth = getAuth(app);
    //   const provider = new GoogleAuthProvider();
    //   try {
    //       await signInWithPopup(auth, provider);
    //       router.push('/');
    //   }
    //   catch (error) {
    //       console.error("Error signing in with Google", error.message);
    //   }
    // }
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setUser(user);
        });
        return () => unsubscribe();
    }, []);

    const logout = async () => {
        try {
            await signOut(auth);
            router.push('/auth');
        }
        catch (error) {
            console.error("Error signing out", error.message);
        }
    }


  return (
    <Box sx={{flexGrow:1}}>
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar>
                    <Typography sx={{flexGrow:1}} variant="h5"><Link href={auth?.currentUser ? '/item-list' : '/auth'} color="inherit" sx={{textDecoration:'none'}}>Inventory Manager</Link></Typography>
                    <Link className="navbar-link" href="/add-with-camera" underline="none" color="inherit" sx={{marginRight:"2rem"}}>Add Item With Camera</Link>
                    <Link className="navbar-link" href="/add-item" underline="none" color="inherit" sx={{marginRight:"2rem"}}>Add Item</Link>

                    {auth?.currentUser ? (
                            <Button className="login-link" variant="contained" sx={{ bgcolor: "#FFF", color: "#1769aa" }} onClick={() => logout()}>
                                Logout
                            </Button>
                        ) : (
                            <Link href="/auth" underline="none" color="inherit">
                                <Button className="login-link" variant="contained" sx={{ bgcolor: "#FFF", color: "#1769aa" }}>
                                    Login
                                </Button>
                            </Link>
                        )}
                </Toolbar>
            </Container>
        </AppBar>
    </Box>
  )
}

export default Navbar