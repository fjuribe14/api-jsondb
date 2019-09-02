const { Router } = require('express')
const router = Router()
const { data, createData, newData, deleteData, updateData, upgradeData } = require('../controllers/data.controllers')

router.get('/data', data)
router.get('/data/new', createData)
router.post('/data/new', newData)
router.get('/data/delete/:id', deleteData)
router.get('/data/update/:id', updateData)
router.post('/data/update/:id', upgradeData)

module.exports = router