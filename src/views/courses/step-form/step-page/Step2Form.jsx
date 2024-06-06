import { Box, Grid, TextField, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

const Step2Form = ({ fieldValue, handleChange }) => {
  return (
    <Box mt={2}>
      {/* Step2Form */}
      {/* input form start */}
      <Box>
        {/* Two half-width input boxes */}
        <Box mb={2}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Actual Price"
                id="actual_price"
                name="actual_price"
                value={fieldValue.actual_price}
                required
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Discount Price"
                id="discount_price"
                name="discount_price"
                value={fieldValue.discount_price}
                disabled={fieldValue.discount_percentage}
                required
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </Box>

        {/* Two half-width input boxes */}
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Discount Percentage"
                id="discount_percentage"
                name="discount_percentage"
                disabled={fieldValue.discount_price}
                value={fieldValue.discount_percentage}
                required
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="free_or_paid">Select Free or Paid</InputLabel>
                <Select
                  required
                  labelId="free_or_paid"
                  id="free_or_paid"
                  value={fieldValue.free_or_paid}
                  label="Select Free or Paid"
                  name="free_or_paid"
                  onChange={handleChange}
                >
                  <MenuItem>Select</MenuItem>
                  <MenuItem value="Free">Free</MenuItem>
                  <MenuItem value="Paid">Paid</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
      </Box>
      {/* input form end */}
    </Box>
  );
};

export default Step2Form;
