import React from 'react'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import ButtonBase from '@material-ui/core/ButtonBase'

import { makeStyles } from '@material-ui/core/styles'

import CheckIcon from '@material-ui/icons/Check'
import ClossIcon from '@material-ui/icons/Close'

import { Answers } from '../misc/constants'

const useStyles = makeStyles((theme) => ({
  answerButton: {
    width: '100%',
  },
  answerContainer: {
    padding: theme.spacing(2),
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    textAlign: 'left',
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: theme.palette.common.white,
  },
  selectedAnswerContainer: {
    borderColor: theme.palette.primary.main,
  },
  correctAnswerContainer: {
    borderColor: theme.palette.success.main,
  },
  wrongAnswerContainer: {
    borderColor: theme.palette.error.main,
  },
  correctIcon: {
    color: theme.palette.success.main,
  },
  wrongIcon: {
    color: theme.palette.error.main,
  },
}))

const AnswerButton = ({ onClick, ans, selected, submitted, isCorrect, content }) => {
  const classes = useStyles()

  return (
    <ButtonBase className={classes.answerButton} onClick={onClick} disabled={submitted}>
      <Paper
        className={`${classes.answerContainer} ${
          selected
            ? submitted
              ? isCorrect
                ? classes.correctAnswerContainer
                : classes.wrongAnswerContainer
              : classes.selectedAnswerContainer
            : ''
        }`}
      >
        <Typography>
          {Answers[ans]}. {content}
        </Typography>
        {submitted && isCorrect ? <CheckIcon className={classes.correctIcon} /> : null}
        {submitted && selected && !isCorrect ? <ClossIcon className={classes.wrongIcon} /> : null}
      </Paper>
    </ButtonBase>
  )
}

export default AnswerButton
