const projects = require('./projects')

module.exports = {
  users: [
    {
      token: 'token_bhje73bkj38jlds9',
      data: {
        username: 'admin',
        firstName: 'John',
        age: 18,
      },
      auth: {
        username: 'admin',
        password: '1234',
      }
    }
  ],
  projects: projects.main,
  projects_expanded: projects.expanded,
}