// import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { forwardRef } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import { useDispatch, useSelector } from 'react-redux';
import { uid } from 'uid';
import { Typography, Box, Grid, TextField, Button, FormControl, Select, InputLabel, MenuItem } from '@mui/material';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ProjectSummaryEditModal({
  isOpen,
  onClose,
  selectedEditItem,
  setSelectedEditItem,
  handleSubmit,
  setUpdate,
  handleTextEditorChange
}) {
  const projectInfoFromState = useSelector((state) => state.projectInfo);
  const teamMemberFromState = useSelector((state) => state.teamMember);
  const handleClose = () => {
    onClose();
  };

  const handleInputValueChange = (e) => {
    //here exsiting value is updating
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

        <MainCard title="Project Summary Update">
          <Box>
            {/* Two half-width input boxes */}
            <Grid container spacing={2} mb={2}>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="subcategory">Select Project</InputLabel>
                  <Select
                    required
                    labelId="project"
                    id="project"
                    value={selectedEditItem.project}
                    label="Select Team Member"
                    name="project"
                    onChange={handleInputValueChange}
                  >
                    <MenuItem>Select</MenuItem>
                    {projectInfoFromState.map((singleProject) => (
                      <MenuItem key={uid()} value={singleProject.id}>
                        {singleProject.project_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Title"
                  id="title"
                  name="title"
                  value={selectedEditItem.title}
                  onChange={handleInputValueChange}
                  required
                />
              </Grid>
            </Grid>
            {/* Two half-width input boxes */}
            <Grid container spacing={2} mb={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Number"
                  id="number"
                  name="number"
                  value={selectedEditItem.number}
                  onChange={handleInputValueChange}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Icon"
                  id="icon"
                  name="icon"
                  value={selectedEditItem.icon}
                  onChange={handleInputValueChange}
                  required
                />
              </Grid>
            </Grid>

            {/* Submit button */}
            <Grid container justifyContent="flex-start" mt={2}>
              <Grid item>
                <Button variant="contained" color="secondary" onClick={handleSubmit}>
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
