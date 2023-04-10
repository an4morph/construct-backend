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

const allowedDataProps = {
  hero: ['title', 'text', 'bgColor', 'image', 'variant'],
  features: 'bgColor titleColor textColor items'.split(' ')
}

const updateBlock = (req, res) => {
  const { projectId, blockId } = req.params
  const project = db.get('projects_expanded').find({ id: projectId })
  const block = project.get('blocks').find({ id: blockId }).get('data')
  const blockName = project.get('blocks').find({ id: blockId }).get('name')

  if (!project) return error(res, 404, 'cannot find project with this id')
  if (!block.value()) return error(res, 404, 'cannot find project block with this id')

  const invalidDataProps = Object.keys(req.body)
    .filter(prop => !allowedDataProps[blockName].includes(prop))

  if (invalidDataProps.length) return error(res, 400, `Invalid data properties: ${invalidDataProps.join(', ')}`);

  block.assign({ ...block.value(), ...req.body  }).write()

  return res.status(200).send('Block updated successfully')
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
  updateBlock,
  deleteItem
}