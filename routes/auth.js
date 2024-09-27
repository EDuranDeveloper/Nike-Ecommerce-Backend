import { Router } from 'express'
import { check } from 'express-validator'
import { userLogin, userRegister, userRenew } from '../controllers/authController.js'
import { fieldValidator } from '../middlewares/fieldValidator.js'


//Route for /api/auth

const router = Router()

router.post('/', [
    check('email', 'Invalid mail').isEmail(),
    fieldValidator
], userLogin)

router.post('/new', [
    check('name', 'Name is obligatory').not().isEmpty(),
    check('email', 'Invalid mail').isEmail(),
    check('password', 'Password min 6 characters').isLength({ min: 6 }),
    fieldValidator
], userRegister)

router.get('/renew', [], userRenew)



export default router