import { Router } from 'express'
import { check } from 'express-validator'
import { fieldValidator } from '../middlewares/fieldValidator.js'
import { addFavoriteItem, deleteFavoriteItem, getFavorite } from '../controllers/favoriteController.js'

//Router /api/favorites


const router = Router()

router.get('/:userId',[
    check("userId", "Invalid User ID").isMongoId(),
    fieldValidator,
], getFavorite)

router.post('/:userId/:productId/add', [
    check("userId", "Invalid User ID").isMongoId(),
    check("productId", "Invalid Product ID").isMongoId(),
    fieldValidator,
], addFavoriteItem)

router.delete("/:userId/:productId/remove", [
    check("userId", "Invalid User ID").isMongoId(),
    check("productId", "Invalid Product ID").isMongoId(),
    fieldValidator,
], deleteFavoriteItem)



export default router