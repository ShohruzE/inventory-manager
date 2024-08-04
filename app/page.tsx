import { Box, Container, Typography, Grid } from "@mui/material";
import AddItem from "@/components/AddItemForm";
import { redirect } from 'next/navigation';
import Auth from "./auth/page";

export default function Home() {

  

  return (
    // <Container maxWidth="xl" sx={{ width:'100vw', height:"100vh", overflow:'hidden' }}>
    //   <Box
    //     display={'flex'}
    //     flexDirection={'column'}
    //     justifyContent={'center'}
    //     alignItems={'center'}
    //     gap={3}
    //   >
    //     {/* <Box sx={{ textAlign:'center', padding: '0.25rem', borderBottom:'2px solid black', marginTop:"4rem", marginBottom:"2rem" }}>
    //       <Typography variant="h4">Inventory Manager</Typography>
    //     </Box> */}
    //     <Grid container columns={12} justifyContent="center" sx={{ gap:"2rem", marginTop:"2rem"}}>
    //       <Grid md>
    //         <AddItem />
    //       </Grid>
    //       <Grid md>
    //         <ItemList />
    //       </Grid>
    //     </Grid>
    //   </Box>
    // </Container>
    <>
      <Auth />
    </>
  );
}
