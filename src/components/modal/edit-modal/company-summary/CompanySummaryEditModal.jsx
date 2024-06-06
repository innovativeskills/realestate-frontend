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

export default function CompanySummaryEditModal({ isOpen, onClose, selectedEditItem, setSelectedEditItem, handleSubmit, setUpdate }) {
  const handleClose = () => {
    onClose();
  };

  const handleInputChange = (e) => {
    //here exsiting value is upading
    if (e.target.name == 'image') {
      setSelectedEditItem((prev) => {
        return {
          ...prev,
          [e.target.name]: e.target.files[0]
        };
      });
    } else {
      setSelectedEditItem((prev) => {
        return {
          ...prev,
          [e.target.name]: e.target.value
        };
      });
    }

    //here only get updated field value
    if (e.target.name == 'image') {
      setUpdate((prev) => {
        return {
          ...prev,
          [e.target.name]: e.target.files[0]
        };
      });
    } else {
      setUpdate((prev) => {
        return {
          ...prev,
          [e.target.name]: e.target.value
        };
      });
    }
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
            {/* Full-width input box */}
            <Box mb={2}>
              <TextField
                fullWidth
                label="Title"
                id="title"
                name="title"
                value={selectedEditItem.title}
                onChange={handleInputChange}
                inputProps={{ minLength: 3 }}
              />
            </Box>

            {/* Two half-width input boxes */}
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Amount"
                  id="amount"
                  name="amount"
                  value={selectedEditItem.amount}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Icon"
                  id="icon"
                  name="icon"
                  value={selectedEditItem.icon}
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>

            {/* Submit button */}
            <Grid container justifyContent="flex-start" mt={2}>
              <Grid item>
                <Button variant="contained" color="secondary" type="submit" onClick={handleSubmit}>
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Box>
        </MainCard>
      </Dialog>
    </>
  );
}
