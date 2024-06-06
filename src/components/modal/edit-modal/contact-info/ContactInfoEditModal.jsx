// import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { forwardRef } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import { Typography, Box, Grid, TextField, Button } from '@mui/material';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ContactInfoEditModal({ isOpen, onClose, selectedEditItem, setSelectedEditItem, handleSubmit, setUpdate }) {
  const handleClose = () => {
    onClose();
  };

  const handleInputValueChange = (e) => {
    //here exsiting value is upading
    setSelectedEditItem((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      };
    });

    //here only get updated field value
    setUpdate((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      };
    });
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
            <IconButton edge="start" color="secondary" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        <MainCard title="Company Summary Update">
          <Box>
            {/* Two half-width input boxes */}
            <Grid container spacing={2} mb={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Name"
                  id="name"
                  name="name"
                  value={selectedEditItem.name}
                  onChange={handleInputValueChange}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Email"
                  id="email"
                  name="email"
                  value={selectedEditItem.email}
                  onChange={handleInputValueChange}
                />
              </Grid>
            </Grid>
            {/* Two half-width input boxes */}
            <Grid container spacing={2} mb={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Phone Number 1"
                  id="phone_number_one"
                  name="phone_number_one"
                  value={selectedEditItem.phone_number_one}
                  onChange={handleInputValueChange}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Phone Number 2"
                  id="phone_number_two"
                  name="phone_number_two"
                  value={selectedEditItem.phone_number_two}
                  onChange={handleInputValueChange}
                />
              </Grid>
            </Grid>
            {/* Two half-width input boxes */}
            <Grid container spacing={2} mb={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Address"
                  id="address"
                  name="address"
                  value={selectedEditItem.address}
                  onChange={handleInputValueChange}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Facebook Link"
                  id="facebook_link"
                  name="facebook_link"
                  value={selectedEditItem.facebook_link}
                  onChange={handleInputValueChange}
                />
              </Grid>
            </Grid>
            {/* Two half-width input boxes */}
            <Grid container spacing={2} mb={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Instagram Link"
                  id="instagram_link"
                  name="instagram_link"
                  value={selectedEditItem.instagram_link}
                  onChange={handleInputValueChange}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Linkedin Link"
                  id="linkedin_link"
                  name="linkedin_link"
                  value={selectedEditItem.linkedin_link}
                  onChange={handleInputValueChange}
                />
              </Grid>
            </Grid>
            {/* Two half-width input boxes */}
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Youtube Link"
                  id="youtube_link"
                  name="youtube_link"
                  value={selectedEditItem.youtube_link}
                  onChange={handleInputValueChange}
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
