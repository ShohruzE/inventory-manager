'use client';

import React, { useState, useEffect } from 'react'
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { Stack, Button } from '@mui/material';

import { app, auth } from '../../lib/firebase';

const Auth = () => {

  const [user, setUser] = useState(null);
  const router = useRouter();

  if (auth?.currentUser) {
    router.push('/item-list');
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user) {
            setUser(user);
            router.push('/');
        }
        else{ 
            setUser(null);
        }
    });
        return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
        await signInWithPopup(auth, provider);
        router.push('/');
    }
    catch (error) {
        console.error("Error signing in with Google", error.message);
    }
  }

  return (
    <Stack padding={4} justifyContent="center" alignItems="center">
      <Button onClick={signInWithGoogle} variant="contained" sx={{ bgcolor:"#FFF", color:"#1769aa", width:"20%"}}>Login with Google</Button>
    </Stack>
  )
}

export default Auth