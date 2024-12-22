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

        const { uid, name } = jwt.verify( token, process.env.SECRET_JWT_SEED)

        console.log(uid, name);

        req.uid = uid
        req.name = name

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: "Not foun token"
        })
    }


    next()
}

export {
    JWTvalidator
}