import React from 'react'
import sampleSize from 'lodash/sampleSize'
import times from 'lodash/times'
import CircularProgress from '@material-ui/core/CircularProgress'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'

import { ApiUrl, NoOfQuestions, Answers } from './misc/constants'
import { getRandomAnswers, getCorrectAnswer, replaceItemInArray, getScores } from './misc/utils'
import AnswerButton from './components/AnswerButton'
import Stepper from './components/Stepper'

const useStyles = makeStyles((theme) => ({
  loaderContainer: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContainer: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  questionContainer: {
    padding: theme.spacing(2),
  },
  submitButtonContainer: {
    textAlign: 'center',
  },
  submitButton: {
    width: 180,
    marginBottom: theme.spacing(2),
  },
}))

const App = () => {
  const classes = useStyles()

  const [questions, setQuestions] = React.useState([])
  const [currentQuestionNo, setCurrentQuestionNo] = React.useState(0)
  const [answers, setAnswers] = React.useState(times(NoOfQuestions).map((i) => null))
  const [submitted, setSubmitted] = React.useState(false)

  const score = React.useMemo(() => getScores(questions, answers), [questions, answers])

  const onAnswerClick = React.useCallback(
    (ans) => {
      setAnswers(replaceItemInArray(ans, currentQuestionNo, answers))
    },
    [setAnswers, currentQuestionNo, answers]
  )

  const resetQuestions = React.useCallback(async () => {
    try {
      setQuestions([])
      const response = await fetch(ApiUrl)
      const result = await response.json()
      setQuestions(
        sampleSize(result, NoOfQuestions).map((question) => ({
          ...question,
          answers: getRandomAnswers(result, question),
        }))
      )
      setAnswers(times(NoOfQuestions).map((i) => null))
      setCurrentQuestionNo(0)
      setSubmitted(false)
    } catch (err) {
      console.log(err)
    }
  }, [setQuestions, setAnswers, setCurrentQuestionNo, setSubmitted])

  React.useEffect(() => {
    resetQuestions()
  }, [resetQuestions])

  return questions.length ? (
    <Container className={classes.mainContainer}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper className={classes.questionContainer}>
            <Typography variant="h6" gutterBottom>
              Question {currentQuestionNo + 1}.
            </Typography>
            <Typography>{questions[currentQuestionNo].excerpt}</Typography>
          </Paper>
        </Grid>
        {Answers.map((ansText, ans) => (
          <Grid key={ansText} item xs={12} sm={12} md={6}>
            <AnswerButton
              ans={ans}
              content={questions[currentQuestionNo].answers[ans]}
              selected={answers[currentQuestionNo] === ans}
              onClick={() => onAnswerClick(ans)}
              submitted={submitted}
              isCorrect={getCorrectAnswer(questions[currentQuestionNo]) === ans}
            />
          </Grid>
        ))}
        <Grid item xs={12}>
          <Stepper
            activeStep={currentQuestionNo}
            steps={NoOfQuestions}
            onBack={() => setCurrentQuestionNo(currentQuestionNo - 1)}
            onNext={() => setCurrentQuestionNo(currentQuestionNo + 1)}
          />
        </Grid>
        <Grid item xs={12} className={classes.submitButtonContainer}>
          <Button
            className={classes.submitButton}
            size="large"
            variant="contained"
            color="primary"
            onClick={submitted ? resetQuestions : () => setSubmitted(true)}
          >
            {submitted ? 'Retry' : 'Submit'}
          </Button>
          {submitted ? (
            <Typography variant="h6">
              Your score is {score}/{questions.length} (
              {Math.round((100 * score) / questions.length)}%)
            </Typography>
          ) : null}
        </Grid>
      </Grid>
    </Container>
  ) : (
    <Container className={classes.loaderContainer}>
      <CircularProgress />
    </Container>
  )
}

export default App
