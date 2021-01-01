import express from 'express'
const router = express.Router()
import {getProducts, getProductById} from '../controllers/productController.js'



// All the functionality has been moved to the controller folders

// The routes folder simply directs the request to the controller, so it can be handled
router.get('/', getProducts)
router.get('/:id', getProductById)



export default router