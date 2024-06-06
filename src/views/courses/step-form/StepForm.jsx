import { useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

// Import your step components here
import Step1Form from './step-page/Step1Form';
import Step2Form from './step-page/Step2Form';
import Step3Form from './step-page/Step3Form';
import { FinalStep } from './step-page/FinalStep';
import toast from 'react-hot-toast';

const steps = ['Course Basic', 'Discount Details', 'Course Details'];

const HorizontalLinearStepper = ({ fieldValue, handleChange, handleSubmit, activeStep, setActiveStep }) => {
  // const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const alertMissingField = (fieldName) => {
    // alert(`The field "${fieldName}" is missing or invalid.`);
    toast.error(`"${fieldName}" is missing or invalid.`);
    return false;
  };

  const validateStep = (step) => {
    switch (step) {
      case 0:
        return (
          (fieldValue.subcategory || alertMissingField('Subcategory')) &&
          (fieldValue.teacher || alertMissingField('Teacher')) &&
          (fieldValue.title || alertMissingField('Title')) &&
          (fieldValue.banner_image_or_video || alertMissingField('Banner / Video Link')) &&
          (fieldValue.overview || alertMissingField('Overview')) &&
          (fieldValue.course_slug || alertMissingField('Course Slug')) &&
          (fieldValue.course_details || alertMissingField('Course Details')) &&
          (fieldValue.course_evaluation || alertMissingField('Course Evaluation')) &&
          (fieldValue.live_or_prerecorded || alertMissingField('Live or Prerecorded'))
        );
      case 1:
        return (
          (fieldValue.actual_price || alertMissingField('Actual Price')) &&
          // (fieldValue.discount_price || alertMissingField('Discount Price')) &&
          // (fieldValue.discount_percentage || alertMissingField('Discount Percentage')) &&
          (fieldValue.free_or_paid || alertMissingField('Free or Paid'))
        );
      case 2:
        return (
          (fieldValue.company_work_with_technology || alertMissingField('Company Work With This Technology')) &&
          (fieldValue.tag || alertMissingField('Tag')) &&
          (fieldValue.meta_tag || alertMissingField('Meta Tag')) &&
          (fieldValue.what_you_will_learn || alertMissingField('What You Will Learn'))
        );
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (validateStep(activeStep)) {
      let newSkipped = skipped;
      if (isStepSkipped(activeStep)) {
        newSkipped = new Set(newSkipped.values());
        newSkipped.delete(activeStep);
      }

      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped(newSkipped);
    } else {
      // alert('Please fill in all required fields.');
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  // Render the form for each step
  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return <Step1Form handleChange={handleChange} fieldValue={fieldValue} />;
      case 1:
        return <Step2Form handleChange={handleChange} fieldValue={fieldValue} />;
      case 2:
        return <Step3Form handleChange={handleChange} fieldValue={fieldValue} />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <>
          <Typography sx={{ mt: 2, mb: 1 }}>All steps completed - you&apos;re finished</Typography>
          <FinalStep handleSubmit={handleSubmit} />
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </>
      ) : (
        <>
          {renderStepContent(activeStep)} {/* Render the form for the current step */}
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button color="primary" variant="outlined" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button color="primary" variant="outlined" onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default HorizontalLinearStepper;

// import { useState } from 'react';
// import Box from '@mui/material/Box';
// import Stepper from '@mui/material/Stepper';
// import Step from '@mui/material/Step';
// import StepLabel from '@mui/material/StepLabel';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';

// // Import your step components here
// import Step1Form from './step-page/Step1Form';
// import Step2Form from './step-page/Step2Form';
// import Step3Form from './step-page/Step3Form';
// import { FinalStep } from './step-page/FinalStep';

// const steps = ['Course Basic', 'Discount Details', 'Course Details'];

// const HorizontalLinearStepper = ({ fieldValue, handleChange, handleSubmit }) => {
//     const [activeStep, setActiveStep] = useState(0);
//     const [skipped, setSkipped] = useState(new Set());

//     const isStepOptional = (step) => {
//         return step === 1;
//     };

//     const isStepSkipped = (step) => {
//         return skipped.has(step);
//     };

//     const handleNext = () => {
//         let newSkipped = skipped;
//         if (isStepSkipped(activeStep)) {
//             newSkipped = new Set(newSkipped.values());
//             newSkipped.delete(activeStep);
//         }

//         setActiveStep((prevActiveStep) => prevActiveStep + 1);
//         setSkipped(newSkipped);
//     };

//     const handleBack = () => {
//         setActiveStep((prevActiveStep) => prevActiveStep - 1);
//     };

//     const handleSkip = () => {
//         if (!isStepOptional(activeStep)) {
//             throw new Error("You can't skip a step that isn't optional.");
//         }

//         setActiveStep((prevActiveStep) => prevActiveStep + 1);
//         setSkipped((prevSkipped) => {
//             const newSkipped = new Set(prevSkipped.values());
//             newSkipped.add(activeStep);
//             return newSkipped;
//         });
//     };

//     const handleReset = () => {
//         setActiveStep(0);
//     };

//     // Render the form for each step
//     const renderStepContent = (step) => {
//         switch (step) {
//             case 0:
//                 return <Step1Form handleChange={handleChange} fieldValue={fieldValue} />;
//             case 1:
//                 return <Step2Form handleChange={handleChange} fieldValue={fieldValue} />;
//             case 2:
//                 return <Step3Form handleChange={handleChange} fieldValue={fieldValue} />;
//             default:
//                 return null;
//         }
//     };

//     return (
//         <Box sx={{ width: '100%' }}>
//             <Stepper activeStep={activeStep}>
//                 {steps.map((label, index) => {
//                     const stepProps = {};
//                     const labelProps = {};
//                     // if (isStepOptional(index)) {
//                     //     labelProps.optional = <Typography variant="caption">Optional</Typography>;
//                     // }
//                     if (isStepSkipped(index)) {
//                         stepProps.completed = false;
//                     }
//                     return (
//                         <Step key={label} {...stepProps}>
//                             <StepLabel {...labelProps}>{label}</StepLabel>
//                         </Step>
//                     );
//                 })}
//             </Stepper>
//             {activeStep === steps.length ? (
//                 <>
//                     <Typography sx={{ mt: 2, mb: 1 }}>All steps completed - you&apos;re finished</Typography>
//                     <FinalStep handleSubmit={handleSubmit} />
//                     <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
//                         <Box sx={{ flex: '1 1 auto' }} />
//                         <Button onClick={handleReset}>Reset</Button>
//                     </Box>
//                 </>
//             ) : (
//                 <>
//                     {renderStepContent(activeStep)} {/* Render the form for the current step */}
//                     {/* <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography> */}
//                     <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
//                         <Button color="primary" variant="outlined" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
//                             Back
//                         </Button>
//                         <Box sx={{ flex: '1 1 auto' }} />
//                         {/* {isStepOptional(activeStep) && (
//                             <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
//                                 Skip
//                             </Button>
//                         )} */}

//                         <Button color="primary" variant="outlined" onClick={handleNext}>
//                             {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
//                         </Button>
//                     </Box>
//                 </>
//             )}
//         </Box>
//     );
// };

// export default HorizontalLinearStepper;
