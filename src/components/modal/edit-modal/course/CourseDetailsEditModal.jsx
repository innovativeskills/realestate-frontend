// import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { forwardRef, useState } from 'react';
import HorizontalLinearStepper from 'views/courses/step-form/StepForm';
import MainCard from 'ui-component/cards/MainCard';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function CourseDetailsEditModal({ isOpen, onClose, selectedEditItem, setSelectedEditItem, handleSubmit, setUpdate }) {
  //this is keeping in parent so that after submitting wen can reset form
  const [activeStep, setActiveStep] = useState(0);
  const handleClose = () => {
    onClose();
  };

  const handleCourseInputChange = (e) => {
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
            <IconButton edge="start" color="secondary" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div"></Typography>
            <Button autoFocus color="secondary" variant="contained" onClick={handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>

        <MainCard title="Course Details Update">
          <HorizontalLinearStepper
            fieldValue={selectedEditItem}
            handleChange={handleCourseInputChange}
            handleSubmit={handleSubmit}
            activeStep={activeStep}
            setActiveStep={setActiveStep}
          />
        </MainCard>
      </Dialog>
    </>
  );
}
