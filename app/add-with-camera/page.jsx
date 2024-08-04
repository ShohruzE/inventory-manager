'use client';

import { useState, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import { Box, Button, Container, Stack, Typography, TextField, Alert } from '@mui/material';
import { storage, auth } from '@/lib/firebase';
import { ref, uploadString } from 'firebase/storage';
import { addItemWithImage } from '@/lib/util';


const videoConstraints = {
    width: 400,
    height: 300,
    facingMode: "user"
}

export default function AddWithCamera() {

    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const [image, setImage] = useState(null);
    const [user, setUser] = useState(null);
    const webcamRef = useRef(null);

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImage(imageSrc);
        console.log(imageSrc);
    }, [webcamRef]);

    // const uploadToFirebase = async (imageSrc) => {
    //     const userId = auth?.currentUser?.uid;
    //     const imageRef = ref(storage, `images/${userId}/${name}`);
    //     try {
    //         await uploadString(imageRef, imageSrc, 'data_url');
    //     }
    //     catch (error) {
    //         console.error('Error uploading image: ', error);
    //     }
    // }

    const handleSubmit = () => {
        // console.log('submit pressed');
        // console.log(name, quantity);
        setIsSubmitted(false);
        if (!image) return;
        addItemWithImage(name, quantity, image);
        setName('');
        setIsSubmitted(true);
      }


    return (
        <Container maxWidth="lg" sx={{flexGrow:1}}>
            <Stack direction="columm" justifyContent="center" alignItems="center" spacing={4} sx={{marginY:4}}>
                <Stack direction="column" spacing={4} width="500px">
                    <Box>
                        <Typography variant="h6">Preview:</Typography>
                        <Webcam
                            width={400}
                            height={300}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            videoConstraints={videoConstraints}    
                        />
                    </Box>
                    {image && 
                        <Box width="400px">
                            <Typography variant="h6">Captured Photo:</Typography>
                            <img
                                src={image}
                                width={400}
                                height={300}
                                alt="Taken photo" 
                            />
                        </Box>
                    }
                    <Button sx={{width:"400px"}}variant="contained" onClick={capture}>Take photo</Button>
                </Stack>
                <Box width="50%" height="50vh" sx={{flexGrow:1}}>
                    <Typography variant="h4" textAlign={'center'} sx={{marginBottom:"2rem"}}>Add an Item</Typography>
                    <Stack direction='column' spacing={2}>
                        <TextField 
                            required 
                            id="outlined-basic" 
                            label="Item Name" 
                            variant="outlined"   
                            value={name}
                            onChange={(event) => {
                                setName(event.target.value);
                            }}
                        />
                        <TextField 
                            required 
                            id="outlined-basic" 
                            type="number" 
                            label="Item Quantity" 
                            variant="outlined"
                            onChange={(event) => {
                                setQuantity(event.target.value === '' ? 0 : parseInt(event.target.value));
                            }}
                        />
                        <Stack direction='column' spacing={2}>
                            <Box width="100%">
                                {isSubmitted && auth?.currentUser && <Alert severity="success">Item added successfully!</Alert>}
                                {isSubmitted && !auth?.currentUser && <Alert severity="error">Unable to add an item. You are not logged in.</Alert>}
                                {isSubmitted && !image && <Alert severity="error">Unable to add an item. You have not taken a picture.</Alert>}
                            </Box>
                            <Button variant="contained" color="secondary" sx={{width:"100%"}} onClick={handleSubmit}>Add with Camera</Button>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Container>
    )
}