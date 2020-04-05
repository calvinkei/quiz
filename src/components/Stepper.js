import React from 'react'
import MobileStepper from '@material-ui/core/MobileStepper'
import Button from '@material-ui/core/Button'

import RightIcon from '@material-ui/icons/KeyboardArrowRight'
import LeftIcon from '@material-ui/icons/KeyboardArrowLeft'

const Stepper = ({ onBack, onNext, steps, activeStep }) => {
  return (
    <MobileStepper
      position="static"
      variant="dots"
      steps={steps}
      activeStep={activeStep}
      backButton={
        <Button size="small" onClick={onBack} disabled={activeStep === 0}>
          <LeftIcon />
          Back
        </Button>
      }
      nextButton={
        <Button size="small" onClick={onNext} disabled={activeStep === steps - 1}>
          Next
          <RightIcon />
        </Button>
      }
    />
  )
}

export default Stepper
