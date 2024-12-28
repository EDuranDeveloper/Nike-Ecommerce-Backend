import { Router } from 'express'
import { check } from 'express-validator'
import { fieldValidator } from '../middlewares/fieldValidator.js'
import { getAccountSettings, updateAccountSettings } from '../controllers/accountController.js'

//Router /api/account


const router = Router()

router.get('/:userId/',[
    check("userId", "Invalid User ID").isMongoId(),
    fieldValidator,
], getAccountSettings)

router.post('/:userId/add', [
    check("userId", "Invalid User ID").isMongoId(),
    fieldValidator,
], updateAccountSettings)

// router.patch("/patch", [
//     check("userId", "Invalid User ID").isMongoId(),
//     fieldValidator,
// ], )

export default router