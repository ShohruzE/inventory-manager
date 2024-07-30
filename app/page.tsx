import { Box, Container, Typography } from "@mui/material";

const items = ['item1', 'item2', 'item3', 'item4', 'item5', 'item6', 'item7', 'item8', 'item9', 'item10'];

export default function Home() {
  return (
    <Container>
      <Box
        width="100vw"
        height="100vh"
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'center'}
        alignItems={'center'}
        gap={2}
      >
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h4">Inventory Manager</Typography>
        </Box>
        <Box sx={{ width: '500px' }}>
          {items.map((item, index) => (
            <Box 
              key={index}
              sx={{ border: '2px solid black', padding: '0.5rem 1rem', marginBottom: '1rem' }}
            >
              <Typography variant="h6">{item}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  );
}
