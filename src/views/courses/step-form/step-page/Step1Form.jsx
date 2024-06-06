import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Box,
    Grid,
    TextField,
} from '@mui/material';
import { useSelector } from 'react-redux';

const Step1Form = ({ fieldValue, handleChange }) => {
    const subCategoryFromState = useSelector((state) => state.subCategory);
    const teacherDetailsFromState = useSelector((state) => state.teacher);

    return (
      <Box mt={3}>
        {/* Step1Form */}
        <Box>
          {/* Two half-width input boxes */}
          <Grid container spacing={2} mb={2}>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="subcategory">Select Sub Category</InputLabel>
                <Select
                  required
                  labelId="subcategory"
                  id="subcategory"
                  value={fieldValue.subcategory}
                  label="Select Sub Category"
                  name="subcategory"
                  onChange={handleChange}
                >
                  <MenuItem>Select</MenuItem>
                  {subCategoryFromState.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.subcategory_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="teacher">Select Teacher</InputLabel>
                <Select
                  required
                  labelId="teacher"
                  id="teacher"
                  value={fieldValue.teacher}
                  label="Select Teacher"
                  name="teacher"
                  onChange={handleChange}
                >
                  <MenuItem>Select</MenuItem>
                  {teacherDetailsFromState.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>{' '}
            </Grid>
          </Grid>

          {/* Two half-width input boxes */}
          <Box mb={2}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField fullWidth label="Title" id="title" name="title" value={fieldValue.title} required onChange={handleChange} />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Banner / Video Link"
                  id="banner_image_or_video"
                  name="banner_image_or_video"
                  value={fieldValue.banner_image_or_video}
                  required
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
          </Box>

          {/* Two half-width input boxes */}
          <Box mb={2}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Overview"
                  id="overview"
                  name="overview"
                  value={fieldValue.overview}
                  required
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Course Slug"
                  id="course_slug"
                  name="course_slug"
                  value={fieldValue.course_slug}
                  required
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
          </Box>
          {/* Two half-width input boxes */}
          <Box mb={2}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Course Details"
                  id="course_details"
                  name="course_details"
                  value={fieldValue.course_details}
                  required
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Course Evaluation"
                  id="course_evaluation"
                  name="course_evaluation"
                  value={fieldValue.course_evaluation}
                  required
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
          </Box>
          {/* Two half-width input boxes */}
          <Box>
            <Grid container spacing={2} mb={2}>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="live_or_prerecorded">Select Live or Pre-recorded</InputLabel>
                  <Select
                    required
                    labelId="live_or_prerecorded"
                    id="live_or_prerecorded"
                    label="Select Live or Pre-recorded"
                    name="live_or_prerecorded"
                    value={fieldValue.live_or_prerecorded}
                    onChange={handleChange}
                  >
                    <MenuItem>Select</MenuItem>
                    <MenuItem value={'Live'}>Live</MenuItem>
                    <MenuItem value={'Prerecorded'}>Pre-recorded</MenuItem>
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

export default Step1Form;
