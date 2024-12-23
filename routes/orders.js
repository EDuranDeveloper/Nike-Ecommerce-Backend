// // {
//   "_id": "orderId123",
//   "userId": "userId123",
//   "total": 59.99,
//   "date": "2024-01-01",
//   "status": "completed",
//   "deliveryAddressId": "addressId123",
//   "paymentMethodId": "paymentMethodId123"
// }

import { Router } from 'express'
import { check } from 'express-validator'
import { fieldValidator } from '../middlewares/fieldValidator.js'
import { getOrders } from '../controllers/orderController.js'

//Router /api/orders


const router = Router()

router.get('/:userId',[
    check("userId", "Invalid User ID").isMongoId(),
    fieldValidator,
], getOrders)

// router.post('/:userId/add', [
//     check("userId", "Invalid User ID").isMongoId(),
//     fieldValidator,
// ], addOrder)

export default router