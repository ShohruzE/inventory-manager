import { Box, Container, Typography, Grid } from "@mui/material";
import ItemList from "../components/ItemList";
import AddItem from "@/components/AddItem";

const items = ['item1', 'item2', 'item3', 'item4', 'item5', 'item6', 'item7', 'item8', 'item9', 'item10'];

export default function Home() {

  return (
    <Container sx={{ width:'100vw', height:"100vh", overflow:'hidden' }}>
      <Box
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'center'}
        alignItems={'center'}
        gap={3}
      >
        <Box sx={{ textAlign:'center', padding: '0.25rem', borderBottom:'2px solid black', marginTop:"4rem", marginBottom:"2rem" }}>
          <Typography variant="h4">Inventory Manager</Typography>
        </Box>
        <Grid container columns={12} justifyContent="center" sx={{ gap:"2rem" }}>
          <Grid xs>
            <AddItem />
          </Grid>
          <Grid xs>
            <ItemList />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
