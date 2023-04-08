const loremIpsum = require('lorem-ipsum').loremIpsum

const rand = (min, max) => Math.round(Math.random() * (max - min) + min)
const generateNumArr = (length, fromNum = 1) => Array(length).fill(0).map((_, index) => index + fromNum) 

const error = (res, status, text) => res.status(status).json(text).end()

const isObject = (value) => value && typeof value === 'object' && value.constructor === Object

const errorTexts = {
  type: (attr, t) => `${attr} attribute should be type "${t}"`,
}

function generateColor(tone = 'bright') {
  const tones = {
    dark: {
      hue: Math.floor(Math.random() * 360),
      saturation: Math.floor(Math.random() * 51) + 50,
      lightness: Math.floor(Math.random() * 26),
    },
    light: {
      hue: Math.floor(Math.random() * 360),
      saturation: Math.floor(Math.random() * 51) + 50,
      lightness: Math.floor(Math.random() * 26) + 75,
    },
    pastel: {
      hue: Math.floor(Math.random() * 360),
      saturation: Math.floor(Math.random() * 16) + 70,
      lightness: Math.floor(Math.random() * 16) + 70,
    },
    bright: {
      hue: Math.floor(Math.random() * 360),
      saturation: Math.floor(Math.random() * 51) + 50,
      lightness: Math.floor(Math.random() * 26) + 50,
    },
  };
  const t = tones[tone] || tones.light; // use light tone as default
  const h = t.hue;
  const s = t.saturation;
  const l = t.lightness;
  return `hsl(${h},${s}%,${l}%)`;
}


const generateProjectName = () => {
  const adjectives = ['fast', 'smart', 'modern', 'efficient', 'innovative', 'dynamic', 'progressive', 'perspective'];
  const nouns = ['project', 'app', 'tool', 'solution', 'system', 'kit', 'hub', 'network'];

  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  
  return `${adjective} ${noun}`;
}

const generateText = (maxWords = 10) => {
  const options = {
    units: 'words',
    count: Math.floor(Math.random() * maxWords) + 2, // генерируем от 2 до 11 слов
    format: 'plain',
  }
  return loremIpsum(options);
}

const getRandomImageLink = (width = 800, height = 600) => {
  return `https://source.unsplash.com/random/${width}x${height}`
}

module.exports = {
  rand,
  generateNumArr,
  generateColor,
  generateProjectName,
  generateText,
  getRandomImageLink,

  error,
  isObject,
  errorTexts
}