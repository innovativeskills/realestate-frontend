import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Grid, TextField, Button } from '@mui/material';

export const FinalStep = ({ handleSubmit }) => {
    return (
        <div>
            <form>
                <Box>
                    {/* Submit button */}
                    <Grid container justifyContent="flex-start" mt={2}>
                        <Grid item>
                            <Button onClick={handleSubmit} variant="contained" color="secondary">
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </form>
        </div>
    );
};
