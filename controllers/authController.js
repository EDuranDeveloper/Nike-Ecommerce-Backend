import { response } from "express"
import { encryptPass } from "../helpers/encryptPass.js";
import User  from "../models/User.js";

const userLogin = (req, res = response) => {
    
}

const userRegister = async(req, res = response) => {

    const { name, email, password, confirmPassword  } = req.body

    try {
        let user = await User.findOne( { email } )

        if ( user ) {
            return res.status(400).json({
                ok: false,
                msg: 'User existing'
            })
        }

    const hashedPassword = await encryptPass( { password, confirmPassword } )

    const newUser = new User({
        name,
        email,
        password: hashedPassword
    })


    await newUser.save()

    res.status(201).json({ 
        ok: true,
        msg: 'User created!'
    })
    
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'User not created'
        })
    }

}

const userRenew = (req, res = response) => {

}



export {
    userLogin,
    userRegister,
    userRenew,
}