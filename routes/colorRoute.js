import express from 'express'
import { getColors, createColor, updateColor, deleteColor } from '../controllers/colorController.js'

const router = express.Router()

router.get('/', getColors)
router.post('/', createColor)
router.put('/:id', updateColor)
router.delete('/:id', deleteColor)

export default router