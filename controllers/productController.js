import { response } from "express";
import Product from '../models/Product.js';


const getProducts = async(req, res = response) => {

    try {
        const products = await Product.find()
        res.status(200).json({
            ok: true,
            msg: 'Obtain products',
            products
        })
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error obtain products'
        })
    }
}

const addProducts = async(req, res = response) => {
    
    const { name, description, price, stock, imageUrl  } = req.body
    

    try {
        const newProduct = new Product({ name, description, price, stock, imageUrl  })  
        await newProduct.save()
        
        res.status(201).json({
            ok: true,
            msg: 'Product added',
            product: newProduct
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error adding product'
        });
    }
}


const updateProducts = async(req, res = response) => {

    const { productId } = req.params
    const newProduct = req.body
    
    try {
        const oldProduct = await Product.findById(productId)

        if ( !oldProduct ) {
            return res.status(500).json({
                ok: false,
                msg: 'Product not found',
            })
        }

        const updatedProduct = await Product.findByIdAndUpdate(productId, newProduct, { new: true } )

        res.status(201).json({
            ok: true,
            msg: "Updated product",
            updatedProduct
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Updated not found",
            error: error.message
        })
    }

}


const deleteProducts = async(req, res = response) => {
    const { productId } = req.params;
    const productfind = await Product.findById( productId );

    try {

        if ( !productfind ) {
            return res.status(500).json({
                ok: false,
                msg: 'Product not found'
            })
        }

        await Product.findByIdAndDelete( productId );

        res.json({
            ok: true,
            msg: 'Product deleted',
            productId
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error deleting product'
        });
    }
}




export {
    getProducts,
    addProducts,
    updateProducts,
    deleteProducts,
}