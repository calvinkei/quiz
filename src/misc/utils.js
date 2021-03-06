import shuffle from 'lodash/shuffle'
import sampleSize from 'lodash/sampleSize'

export const getRandomAnswers = (allQuestions, question) =>
  shuffle([
    question.title,
    ...sampleSize(
      allQuestions.filter((q) => q.id !== question.id).map((q) => q.title),
      3
    ),
  ])

export const getCorrectAnswer = (question) =>
  question.answers.findIndex((ans) => ans === question.title)

export const replaceItemInArray = (item, index, array) => [
  ...array.slice(0, index),
  item,
  ...array.slice(index + 1),
]

export const getScores = (questions, answers) =>
  questions
    .map((q, i) => getCorrectAnswer(q) === answers[i])
    .reduce((acc, cur) => acc + (cur ? 1 : 0), 0)
