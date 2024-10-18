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
    const { userId, productId } = req.params;
    const { quantity } = req.body;

    try {
        // Buscar el producto en la base de datos
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(500).json({
                ok: false,
                msg: "Product not found"
            });
        }

        // Buscar el carrito del usuario
        let cart = await Cart.findOne({ userId });

        // Si no existe el carrito, se crea uno nuevo
        if (!cart) {
            cart = new Cart({ userId, items: [] });
        }

      
        let existingItem = cart.items.find((item) => item.productId.toString() === productId);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.items.push({
                productId,
                name: product.name,
                price: product.price,
                principalImage: product.principalImage, 
                color: product.color,
                hex: product.hex,
                quantity
            });
        }

        // Guardar el carrito
        await cart.save();

        res.json({
            ok: true,
            msg: "Item added to cart",
            productAdd: cart
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Item not added to cart",
            error: error.message
        });
    }
};



const removeCartItem = async(req, res = response) => {
    const { userId, productId } = req.params
    const productFind = await Product.findById( productId )
    const userFind = await User.findById( userId )

    // console.log(userId, productId);
    console.log(userFind);

    try {
        if ( !userFind || !productFind ) {
        return res.status(500).json({
            ok: false,
            msg: "User or product not found"
        })
    }

    const cart = await Cart.findOne({ userId });


    console.log(cart.items);

    cart.items = cart.items.filter((item) => item.productId != productId )

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