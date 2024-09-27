import { response } from "express";
import Cart from "../models/Cart.js";
import Product from '../models/Product.js';
import User from '../models/User.js';


const getCart = async(req, res = response) => {
    const { userId } = req.params;

    try {
       const cart = await Cart.findOne({ userId }).populate('items.productId')     

       if (!cart) {
        return res.status(404).json({
            ok: false,
            msg: "Cart not found"
        })
       }

       res.status(200).json({
        ok: true,
        msg: "Cart found",
        cart
       })

    } catch (error) {
        res.status(500).json({ 
            ok: false, 
            msg: 'Error obtaining cart' 
        });
    }
}


const addCartItem = async(req, res = response) => {
    const { userId, productId } = req.params
    const { quantity } = req.body

    try {
        const product = await Product.findById( productId )

        if ( !product ) {
            return res.status(500).json({
                ok: false,
                msg: "Product not found",
                error: error.message
            })
        }

        let cart = await Cart.findOne({ userId })
        
        if( !cart ) {
            cart = new Cart({ userId, items: [] })
        }
        
        let existingItem = cart.items.find(( item ) => item.productId.toString() === productId)
        console.log(existingItem);
        
        if ( existingItem ) {
            existingItem.quantity++
        } else {
            cart.items.push({ productId, quantity })
        }

        await cart.save()

        res.json({
            ok: true,
            msg: "Item add to cart",
            productAdd: cart
        })

    } catch (error) {
        res.json({
            ok: false,
            msg: "Item not added to cart",
            error: error.message
        })
    }

}


const removeCartItem = async(req, res = response) => {
    const { userId, productId } = req.params
    const productFind = await Product.findById( productId )
    const userFind = await User.findById( userId )

    try {
        if ( !userFind || !productFind ) {
        return res.status(500).json({
            ok: false,
            msg: "User or product not found"
        })
    }

    const cart = await Cart.findOne({ userId });

    cart.items = cart.items.filter((item) => item.productId != productId)

    await cart.save()

    res.status(200).json({
        ok: true,
        msg: "Product delete succesfully",
        cart
    })

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Fail in delete product",
            error: error.message
        })
    }
}



export { 
    getCart,
    addCartItem,
    removeCartItem,
}