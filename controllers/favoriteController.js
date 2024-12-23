import Favorite from "../models/Favorite.js";
import Product from "../models/Product.js";
import User from "../models/User.js";

const getFavorite = async(req, res = response) => {
    const { userId } = req.params;

    try {
       let favorites = await Favorite.findOne({ userId });
        
       if (!favorites) {
           favorites = new Favorite({ userId, items: [] });
           await favorites.save(); 
       }
       res.status(200).json({
        ok: true,
        msg: "favorite found",
        favorites
       });

    } catch (error) {
        res.status(500).json({ 
            ok: false, 
            msg: 'Error obtaining favorites' 
        });
    }
};

const addFavoriteItem = async(req, res = response) => {
    const { userId, productId } = req.params;


    try {

        // Buscar el producto en la base de datos
        const product = await Product.findById( productId );


        if (!product) {
            return res.status(500).json({
                ok: false,
                msg: "Product not found"
            });
        }

        // Buscar en los favoritos del usuario
        let favorites = await Favorite.findOne({ userId });


        // Si no existe los favoritos, se crea uno nuevo
        if (!favorites) {
            favorites = new Favorite({ userId, items: [] });
        }
      
        let existingItem = favorites.items.find((item) => item.productId.toString() === productId);




        if (existingItem) {
            return res.status(400).json({
                ok: false,
                msg: "Item already in favorites"
            });
        } else {
            favorites.items.push({
                productId,
                name: product.name,
                model: product.model,
                category: product.category,
                price: product.price,
                discount: product.discount,
                principalImage: product.principalImage, 
                tag: product.tag,
            });
        }
        

        // Guardar el carrito
        await favorites.save();

        res.json({
            ok: true,
            msg: "Item added to favorites",
            productAdd: favorites
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Item not added to favorites",
            error: error.message
        });
    }
};


const deleteFavoriteItem = async(req, res = response) => {
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

    const favorite = await Favorite.findOne({ userId });

    favorite.items = favorite.items.filter((item) => item.productId != productId )

    await favorite.save()

    res.status(200).json({
        ok: true,
        msg: "Product delete succesfully",
        favorite
    })

    } catch (error) {
        return res.status(404).json({
            ok: false,
            msg: "Fail in delete product",
            error: error.message
        })
    }
}

export {
    getFavorite,
    addFavoriteItem,
    deleteFavoriteItem,
}