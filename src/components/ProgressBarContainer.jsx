import React, { useEffect, useState } from 'react';
import { styled } from '@mui/system';
import { Stepper, Step, StepLabel } from '@mui/material';
import { useMediaQuery } from 'react-responsive';

const OrderStepper = ({ currentStatus }) => {
  const [activeStep, setActiveStep] = useState(0);
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const orderStatusSteps = ['Pending', 'Processing', 'Shipping', 'Delivered'];

  const CustomStep = styled(Step)({
    '& .MuiStepLabel-active': {
      backgroundColor: 'rgb(137, 25, 8)',
    },
    '& .MuiStepConnector-active > .MuiStepConnector-line': {
      borderColor: 'rgb(137, 25, 8)',
    },
  });

  useEffect(() => {
    // Set the active step based on the order status prop
    const index = orderStatusSteps.indexOf(currentStatus);
    if (index !== -1) {
      setActiveStep(index);
    }
  }, [currentStatus, orderStatusSteps]);

  return (
    <div className="flex justify-start mt-1 ">
      <div className={`${isMobile ? 'w-100' : 'w-70'}`}>
        <Stepper activeStep={activeStep} alternativeLabel >
          {orderStatusSteps.map((label, index) => (
            <Step key={label} completed={activeStep >= index} >
              <StepLabel>
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>
    </div>
  );
};

export default OrderStepper;
