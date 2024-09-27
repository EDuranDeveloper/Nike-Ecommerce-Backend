import { Router } from 'express'
import { check } from 'express-validator'
import { addProducts, deleteProducts, getProducts, updateProducts } from '../controllers/productController.js'

//Router /api/products


const router = Router()

//Obtener todos los productos
router.get("/", [], getProducts)


//Aniadir productos
router.post("/add", [], addProducts)


//Modificar productos
router.put("/update/:productId", updateProducts)


//Eliminar productos
router.delete("/delete/:productId", deleteProducts)




export default router