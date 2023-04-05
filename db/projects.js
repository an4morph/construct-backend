const shortid = require('shortid')

const project = {
  id: shortid.generate(),
  name: 'iShop',
  blocks: [
    {
      id: shortid.generate(),
      name: 'hero',
      data: {
        title: 'Welcome to our shop',
        titleColor: null,
        text: 'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna.',
        textColor: null,
        bgColor: '#5cf',
        image: null,
        variants: 1,
      }
    },
    {
      id: shortid.generate(),
      name: 'features',
      data: {
        bgColor: '#eee',
        titleColor: null,
        textColor: '#505050',
        items: [
          {
            id: shortid.generate(),
            title: 'Item 1',
            text: 'Lorem ipsum dolor sit amet consectetur',
          },
          {
            id: shortid.generate(),
            title: 'Item 2',
            text: 'Lorem ipsum dolor sit amet consectetur',
          },
          {
            id: shortid.generate(),
            title: 'Item 3',
            text: 'Lorem ipsum dolor sit amet consectetur',
          },
          {
            id: shortid.generate(),
            title: 'Item 4',
            text: 'Lorem ipsum dolor sit amet consectetur',
          },
        ]
      }
    }
  ]
}

module.exports = {
  main: [{
    id: project.id,
    name: project.name,
  }],
  expanded: [project]
}