import { Router } from 'express'
import { check } from 'express-validator'
import { addCartItem, getCart, removeCartItem } from '../controllers/cartControllers.js'
import { fieldValidator } from '../middlewares/fieldValidator.js'
import { JWTvalidator } from '../middlewares/JWTvalidator.js'

//Router /api/cart


const router = Router()

router.get('/:userId',[
    check("userId", "Invalid User ID").isMongoId(),
    fieldValidator,
], getCart)
router.post('/:userId/:productId/add', [
    check("userId", "Invalid User ID").isMongoId(),
    check("productId", "Invalid Product ID").isMongoId(),
    fieldValidator,
], addCartItem)
router.delete("/:userId/:productId/remove", [
    check("userId", "Invalid User ID").isMongoId(),
    check("productId", "Invalid Product ID").isMongoId(),
    fieldValidator,
], removeCartItem)



export default router