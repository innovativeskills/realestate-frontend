// import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { forwardRef } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import { Typography, Box, Grid, TextField, Button, DialogContent, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import TextEditor from 'components/shared/TextEditor';
import { useSelector } from 'react-redux';
import { uid } from 'uid';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function TeamMemberEditModal({
  isOpen,
  onClose,
  selectedEditItem,
  setSelectedEditItem,
  handleSubmit,
  setUpdate,
  handleTextEditorChange
}) {
  const positionFromState = useSelector((state) => state.position);
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

        <DialogContent>
          <MainCard title="Details Update">
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
              {/* Two half-width input boxes */}
              <Grid container spacing={2} mb={2}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Phone"
                    id="phone_number"
                    name="phone_number"
                    value={selectedEditItem.phone_number}
                    onChange={handleInputChange}
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    type="email"
                    fullWidth
                    label="Email"
                    id="email"
                    name="email"
                    value={selectedEditItem.email}
                    onChange={handleInputChange}
                    required
                  />
                </Grid>
              </Grid>
              {/* Two half-width input boxes */}
              <Grid container spacing={2} mb={2}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Facebook"
                    id="facebook_link"
                    name="facebook_link"
                    value={selectedEditItem.facebook_link}
                    onChange={handleInputChange}
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Instagram"
                    id="instagram_link"
                    name="instagram_link"
                    value={selectedEditItem.instagram_link}
                    onChange={handleInputChange}
                    required
                  />
                </Grid>
              </Grid>
              {/* Two half-width input boxes */}
              <Grid container spacing={2} mb={2}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Linkedin"
                    id="linkedin_link"
                    name="linkedin_link"
                    value={selectedEditItem.linkedin_link}
                    onChange={handleInputChange}
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Twitter"
                    id="twitter_link"
                    name="twitter_link"
                    value={selectedEditItem.twitter_link}
                    onChange={handleInputChange}
                    required
                  />
                </Grid>
              </Grid>
              {/* Two half-width input boxes */}
              <Grid container spacing={2} mb={2}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Dribble"
                    id="dribble_link"
                    name="dribble_link"
                    value={selectedEditItem.dribble_link}
                    onChange={handleInputChange}
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel id="subcategory">Select Position</InputLabel>
                    <Select
                      required
                      labelId="position"
                      id="position"
                      value={selectedEditItem.position}
                      label="Select Position"
                      name="position"
                      onChange={handleInputChange}
                    >
                      <MenuItem>Select</MenuItem>
                      {positionFromState.map((singleMember) => (
                        <MenuItem key={uid()} value={singleMember.id}>
                          {singleMember.position}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              {/* Full-width input box */}
              <Box mb={2}>
                <TextEditor value={selectedEditItem.description} handlechange={handleTextEditorChange} label={'Description input'} />
              </Box>

              {/* Submit button */}
              <Grid container justifyContent="flex-start" mt={6}>
                <Grid item>
                  <Button variant="contained" color="secondary" onClick={handleSubmit}>
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </MainCard>
        </DialogContent>
      </Dialog>
    </>
  );
}
