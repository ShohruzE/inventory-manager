import AddItemForm from "@/components/AddItemForm"
import { Container, Stack } from "@mui/material"

export default function AddItem() {
    return (
        <Container maxWidth="lg">
            <Stack direction="column" justifyContent="center" alignItems="center" sx={{marginTop:"3rem"}}>
                <AddItemForm />
            </Stack>
        </Container>
    )
}