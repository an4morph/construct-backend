const shortid = require('shortid')

const project = {
  id: shortid.generate(),
  name: 'iShop',
  blocks: [
    {
      id: shortid.generate(),
      name: 'hero',
      data: {
        title: {
          content: 'Welcome to our shop',
          color: '#266e9a',
          size: 48
        },
        text: {
          content: 'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna.',
          color: null,
          size: 18
        },
        bgColor: '#95daee',
        image: 'https://plus.unsplash.com/premium_photo-1680497811614-4f93025d7e57?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1065&q=80',
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