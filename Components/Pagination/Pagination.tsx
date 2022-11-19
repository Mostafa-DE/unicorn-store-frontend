import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import Box from "@mui/material/Box";


export default function PaginationComponent({page, totalPages, handleChangePage}) {
    return (
        <Box display="flex"
             justifyContent="center"
             margin="8rem 0 0 0"
        >
            <Stack spacing={2}>
                <Pagination
                    page={page}
                    count={totalPages}
                    variant="outlined"
                    onChange={handleChangePage}
                />
            </Stack>
        </Box>
    );
}