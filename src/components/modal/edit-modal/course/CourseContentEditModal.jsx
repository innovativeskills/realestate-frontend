// import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { forwardRef } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import { FormControl, InputLabel, Select, Box, Grid, TextField, Button, MenuItem } from '@mui/material';
import { useSelector } from 'react-redux';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CourseContentEditModal({ isOpen, onClose, selectedEditItem, handleEditChange, handleSubmit }) {
  const courseListFromStore = useSelector((state) => state.course);
  const handleClose = () => {
    onClose();
  };

  return (
    <>
      <Dialog fullScreen open={isOpen} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar sx={{ position: 'relative', backgroundColor: '#EDE7F6' }}>
          <Toolbar>
            {/* <IconButton edge="start" color="secondary" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton> */}
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div"></Typography>
            {/* <Button autoFocus color="secondary" variant="contained" onClick={handleClose}>
              save
            </Button> */}
            <IconButton edge="start" color="secondary" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        <MainCard title="Course Content Update">
          <Box>
            {/* Two half-width input boxes */}
            <Grid container spacing={2} mb={2}>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="subcategory">Select Course</InputLabel>
                  <Select
                    required
                    labelId="course"
                    id="course"
                    value={selectedEditItem.course}
                    label="Select Course"
                    name="course"
                    onChange={handleEditChange}
                  >
                    <MenuItem>Select</MenuItem>
                    {courseListFromStore.map((course) => (
                      <MenuItem key={course.id} value={course.id}>
                        {course.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Content Title"
                  id="title"
                  name="title"
                  value={selectedEditItem.title}
                  onChange={handleEditChange}
                  required
                />
              </Grid>
            </Grid>

            {/* Two half-width input boxes */}
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Class Number"
                  id="class_number"
                  name="class_number"
                  value={selectedEditItem.class_number}
                  onChange={handleEditChange}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Content Video Link"
                  id="content_video_link"
                  name="content_video_link"
                  value={selectedEditItem.content_video_link}
                  onChange={handleEditChange}
                  required
                />
              </Grid>
            </Grid>

            {/* Submit button */}
            <Grid container justifyContent="flex-start" mt={2}>
              <Grid item>
                <Button variant="contained" color="secondary" onClick={handleSubmit}>
                  Update
                </Button>
              </Grid>
            </Grid>
          </Box>
        </MainCard>
      </Dialog>
    </>
  );
}
