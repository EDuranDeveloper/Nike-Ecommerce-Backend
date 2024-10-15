import { Router } from 'express'
import { check } from 'express-validator'
import { addProducts, deleteProducts, getProducts, updateProducts } from '../controllers/productController.js'
import { fieldValidator } from '../middlewares/fieldValidator.js'

//Router /api/products


const router = Router()

//Obtener todos los productos
router.get("/", getProducts)


//Aniadir productos
router.post("/add", [
    check("name", "Name is obligatory").not().isEmpty(),
    check("name", "Name must be between 3 and 40 characters").isLength({ min: 3, max: 40 }),
    check("description", "Description is obligatory").not().isEmpty(),
    check("description", "Description must be between 10 and 400 characters").isLength({ min: 10, max: 400 }),
    check("price", "Price is obligatory").not().isEmpty(),
    check("price", "Price must be a number greater than 0").isFloat({ min: 0 }),
    check("stock", "Stock is obligatory").not().isEmpty(),
    check("stock", "Stock must be a number greater than or equal to 0").isInt({ min: 0 }),
    fieldValidator
], addProducts)


//Modificar productos
router.put("/update/:productId", [
    check("productId", "Invalid productId").isMongoId(),
    fieldValidator
],  updateProducts)


//Eliminar productos
router.delete("/delete/:productId", [
    check("productId", "Invalid productId").isMongoId(),
    fieldValidator
], deleteProducts)




export default router