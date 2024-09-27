import { Router } from 'express'
import { check } from 'express-validator'
import { addCartItem, getCart, removeCartItem } from '../controllers/cartControllers.js'

//Router /api/cart


const router = Router()

router.get('/:userId', [], getCart)
router.post('/:userId/:productId/add', [], addCartItem)
router.delete("/:userId/:productId/remove", removeCartItem)



export default router