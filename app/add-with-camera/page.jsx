'use client';

import { useState, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import { Box, Button, Container, Stack } from '@mui/material';


const videoConstraints = {
    width: 300,
    height: 200,
    facingMode: "user"
}

export default function AddWithCamera() {

    const [image, setImage] = useState(null);
    const webcamRef = useRef(null);

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImage(imageSrc);
        console.log(imageSrc);
    }, [webcamRef]);



    return (
        <Container>
            <Stack direction="columm" justifyContent="center" alignItems="center">
                <Box width="500px" height="300px">
                    <Webcam
                        width={300}
                        height={200}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        videoConstraints={videoConstraints}    
                    />
                </Box>
                <Button variant="contained" onClick={capture}>Take photo</Button>
                {image && 
                    <img
                        src={image}
                        width={300}
                        height={200}
                        alt="Taken photo" 
                    />
                }
            </Stack>
        </Container>
    )
}