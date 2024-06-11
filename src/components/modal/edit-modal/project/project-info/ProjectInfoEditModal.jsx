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
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  Typography,
  TableHead,
  TableRow,
  Paper,
  Box,
  Grid,
  TextField,
  Button,
  FormControl,
  Select,
  InputLabel,
  MenuItem
} from '@mui/material';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ProjectInfoEditModal({
  isOpen,
  onClose,
  selectedEditItem,
  setSelectedEditItem,
  handleSubmit,
  setUpdate,
  handleTextEditorChange
}) {
  const teamMemberFromState = useSelector((state) => state.teamMember);
  const handleClose = () => {
    onClose();
  };

  const handleInputValueChange = (e) => {
    //here exsiting value is updating
    if (e.target.name == 'brochure_pdf') {
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
    if (e.target.name == 'brochure_pdf') {
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

        <MainCard title="Project Info Update">
          <Box>
            {/* Two half-width input boxes */}
            <Grid container spacing={2} mb={2}>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="subcategory">Select Team Member</InputLabel>
                  <Select
                    required
                    labelId="agent"
                    id="agent"
                    value={selectedEditItem.agent}
                    label="Select Team Member"
                    name="agent"
                    onChange={handleInputValueChange}
                  >
                    <MenuItem>Select</MenuItem>
                    {teamMemberFromState.map((singleMember) => (
                      <MenuItem key={uid()} value={singleMember.id}>
                        {singleMember.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <Grid container spacing={2}>
                  <Grid item>
                    <Box display="flex" alignItems="center">
                      <Typography variant="h5" gutterBottom sx={{ marginLeft: 1 }}>
                        Brochure PDF
                      </Typography>
                      <Button variant="outlined" color="secondary" component="label" sx={{ marginLeft: 5 }}>
                        Upload File
                        <input type="file" name="brochure_pdf" onChange={handleInputValueChange} />
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
                  label="Project Name"
                  id="project_name"
                  name="project_name"
                  value={selectedEditItem.project_name}
                  onChange={handleInputValueChange}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Project Code"
                  id="project_code"
                  name="project_code"
                  value={selectedEditItem.project_code}
                  onChange={handleInputValueChange}
                  required
                />
              </Grid>
            </Grid>

            {/* Full-width input box */}
            <Box mb={2}>
              <TextField
                fullWidth
                label="Description"
                id="description"
                name="description"
                value={selectedEditItem.description}
                onChange={handleInputValueChange}
                required
                inputProps={{ minLength: 3 }}
                multiline
                rows={4}
              />
            </Box>

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
