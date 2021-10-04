import express from 'express'
import {
	 getProductsById ,
	 getProducts }
	  from '../controllers/productController.js'
const router = express.Router()

router.route('/').get(getProducts)
router.route('/:id').get(getProductsById)


export default router
