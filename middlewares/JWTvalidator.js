import { response } from 'express';
import jwt from 'jsonwebtoken';



const JWTvalidator = async( req, res = response, next ) => {

    const token = req.header('x-token')

    if ( !token ) {
        return res.status(401).json({
            ok: false,
            msg: "Not found token"
        })
    }

    try {

        const { uid, name, email } = jwt.verify( token, process.env.SECRET_JWT_SEED)

        req.uid = uid
        req.name = name
        req.email = email; 

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: "Not found token"
        })
    }


    next()
}

export {
    JWTvalidator
}