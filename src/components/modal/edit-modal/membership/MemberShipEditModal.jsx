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
import TextEditor from 'components/shared/TextEditor';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function MemberShipEditModal({ isOpen, onClose, selectedEditItem, setSelectedEditItem, handleSubmit, setUpdate, handleTextEditorChange }) {
  const handleClose = () => {
    onClose();
  };

  const handleInputChange = (e) => {
    //here exsiting value is updating
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

        <MainCard title="Details Update">
          <Box>
            {/* Two half-width input boxes */}
            <Grid container spacing={2} mb={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Title"
                  id="title"
                  name="title"
                  value={selectedEditItem.title}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <Grid container spacing={2}>
                  <Grid item>
                    <Box display="flex" alignItems="center">
                      <Typography variant="h5" gutterBottom sx={{ marginLeft: 1 }}>
                        Client Image
                      </Typography>
                      <Button variant="outlined" color="secondary" component="label" sx={{ marginLeft: 5 }}>
                        Upload File
                        <input type="file" name="image" onChange={handleInputChange} />
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            {/* Full-width input box */}
            <TextEditor value={selectedEditItem.description} label="Description" handlechange={handleTextEditorChange} />

            {/* Submit button */}
            <Grid container justifyContent="flex-start" mt={7}>
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
