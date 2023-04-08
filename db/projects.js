const shortid = require('shortid')
const { 
  rand,
  generateColor,
  generateProjectName,
  generateText,
  getRandomImageLink
} = require('../utils/utils.js')

const generateFeaturesBlock = () => {
  const cr = (Math.random() > 0.5) ? ['light', 'dark'] : ['dark', 'light']
  return {
    id: shortid.generate(),
    name: 'features',
    data: {
      bgColor: generateColor(cr[0]),
      titleColor: generateColor(cr[1]),
      textColor: generateColor(cr[1]),
      items: [
        {
          id: shortid.generate(),
          title: generateText(5),
          text: generateText(10),
          image: getRandomImageLink(),
        },
        {
          id: shortid.generate(),
          title: generateText(5),
          text: generateText(10),
          image: getRandomImageLink(),
        },
        {
          id: shortid.generate(),
          title: generateText(5),
          text: generateText(10),
          image: getRandomImageLink(),
        },
        {
          id: shortid.generate(),
          title: generateText(5),
          text: generateText(10),
          image: getRandomImageLink(),
        },
      ]
    }
  }
}

const generateHeroBlock = () => {
  const cr = (Math.random() > 0.5) ? ['light', 'dark'] : ['dark', 'light']
  return {
    id: shortid.generate(),
    name: 'hero',
    data: {
      title: {
        content: generateText(10),
        color: generateColor('bright'),
        size: rand(26, 55)
      },
      text: {
        content: generateText(50),
        color: generateColor(cr[0]),
        size: rand(14, 20)
      },
      bgColor: generateColor(cr[1]),
      image: getRandomImageLink(),
      variant: 1,
    }
  }
}

const genProject = (createdAt) => {
  return {
    id: shortid.generate(),
    name: generateProjectName(),
    createdAt,
    blocks: [generateHeroBlock(), generateFeaturesBlock(), generateHeroBlock(), generateFeaturesBlock()]
  }
}

const list = [
  genProject('Sat, 08 Apr 2023 12:10:16 GMT'),
  genProject('Sat, 08 Apr 2023 06:10:34 GMT'),
  genProject('Fri, 07 Apr 2023 08:00:00 GMT'),
]

module.exports = {
  main: list.map(({id, name, createdAt}) => ({
    id, name, createdAt
  })),
  expanded: list
}