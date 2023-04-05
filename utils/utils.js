const rand = (min, max) => Math.round(Math.random() * (max - min) + min)
const genNumArr = (length, fromNum = 1) => Array(length).fill(0).map((_, index) => index + fromNum) 

const error = (res, status, text) => res.status(status).json(text).end()

const isObject = (value) => value && typeof value === 'object' && value.constructor === Object

const errorTexts = {
  type: (attr, t) => `${attr} attribute should be type "${t}"`,
}

module.exports = {
  rand,
  genNumArr,
  error,
  isObject,
  errorTexts
}