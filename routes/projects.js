const db = require('../db')
const shortid = require('shortid')
const { error, errorTexts } = require('../utils/utils.js')

const getAll = (_, res) => {
  const projects = db.get('projects')
  res.send(projects)
}

const getItem = (req, res) => {
  const { id } = req.params
  const item = db.get('projects_expanded').find({ id }).value()
  if (!item) return error(res, 404, 'cannot find item with this id')
  res.send(item)
}

const checkKey = (permisbleKeys, req) => {
  const keys = Object.keys(req.body)
  const invalid = keys.filter(k => !permisbleKeys.includes(k))
  if (invalid.length) return `${invalid.join(', ')} is not valid key`
}

const createNew = (req, res) => {
  const { name } = req.body
  
  const checkError = checkKey(['name'], req)
  if (checkError) return error(res, 400, checkError)

  if (!name) return error(res, 400, 'name attribute is required')
  if (typeof name !== 'string') return error(res, 400, errorTexts.type('name', 'string'))
  
  const newItem = { 
    id: shortid.generate(),
    name,
  }
  const expanded = {
    blocks: []
  }

  db.get('projects').push(newItem).write()
  db.get('projects_expanded').push({...newItem, ...expanded}).write()
  res.send({...newItem, ...expanded})
}

const updateItem = (req, res) => {
  const { id } = req.params
  const { name, blocks } = req.body
  const permisbleKeys = 'name, blocks'.split(', ')

  const item = db.get('projects').find({ id }).value()
  const item_expanded = db.get('projects_expanded').find({ id }).value()
  if (!item || !item_expanded) return error(res, 404, 'cannot find project with this id')

  const checkError = checkKey(permisbleKeys, req)
  if (checkError) return error(res, 400, checkError)

  if (name && typeof name !== 'string') return error(res, 400, errorTexts.type('name', 'string'))
  if (blocks && !Array.isArray(blocks)) {
    return error(res, 400,  errorTexts.type('blocks', 'array'))
  }

  const updatedItem = { ...item_expanded, ...req.body }
  const not_expanded = Object.assign({}, updatedItem)
  delete not_expanded['blocks']

  db.get('projects').find({ id }).assign(not_expanded).write()
  db.get('projects_expanded').find({ id }).assign(updatedItem).write()

  res.send(updatedItem)
}

const deleteItem = (req, res) => {
  const { id } = req.params
  const item = db.get('projects').find({ id }).value()
  const item_expanded = db.get('projects_expanded').find({ id }).value()
  if (!item || !item_expanded) return error(res, 404, 'cannot find project with this id')

  db.get('projects').remove({ id }).write()
  db.get('projects_expanded').remove({ id }).write()
  
  res.send({
    id: item.id,
    success: true
  })
}

module.exports = {
  getAll,
  getItem,
  createNew,
  updateItem,
  deleteItem
}