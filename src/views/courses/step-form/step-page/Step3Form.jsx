import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Grid, TextField, Button } from '@mui/material';
const Step3Form = ({ fieldValue, handleChange }) => {
    return (
        <Box mt={2}>
            {/* input form start */}
            <Box>
                {/* Full-width input box */}
                <Box mb={2}>
                    <TextField
                        fullWidth
                        label="Which company work with this technology "
                        id="company_work_with_technology"
                        name="company_work_with_technology"
                        value={fieldValue.company_work_with_technology}
                        required
                        inputProps={{ minLength: 3 }}
                        onChange={handleChange}
                    />
                </Box>

                {/* Two half-width input boxes */}
                <Box mb={2}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField fullWidth label="Tag" id="tag" name="tag" value={fieldValue.tag} required onChange={handleChange} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Meta Tag"
                                id="meta_tag"
                                name="meta_tag"
                                value={fieldValue.meta_tag}
                                required
                                onChange={handleChange}
                            />
                        </Grid>
                    </Grid>
                </Box>
                {/* Full-width input box */}
                <Box>
                    <p>
                        <label htmlFor="what_you_will_learn">What you will learn:</label>
                    </p>
                    <textarea
                        id="what_you_will_learn"
                        name="what_you_will_learn"
                        rows="8"
                        cols="50"
                        value={fieldValue.what_you_will_learn}
                        style={{ width: '100%' }}
                        onChange={handleChange}
                    ></textarea>
                </Box>
            </Box>
            {/* input form end */}
        </Box>
    );
};

export default Step3Form;
