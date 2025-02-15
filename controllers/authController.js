import { response } from "express";
import { encryptPass } from "../helpers/encryptPass.js";
import { generatedJWT } from "../helpers/jwt.js";
import bcrypt from 'bcrypt';
import User from "../models/User.js";

const userLogin = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: "User not valid",
      });
    }

    const validPassword = bcrypt.compareSync( password, user.password )
    
    if ( !validPassword ) {
        return res.status(400).json({
            ok: false,
            msg: "Invalid password"        
        })
    }

    const token = await generatedJWT( user.id, user.name, user.email )


    res.json({
        ok: true,
        uid: user.id,
        name: user.name,
        email: user.email,
        token
    })




  } catch (error) {
    console.log("error");
  }
};

const userRegister = async(req, res = response) => {
  const { name, email, password, confirmPassword } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        ok: false,
        msg: "User existing",
      });
    }

   
    const hashedPassword = await encryptPass({password, confirmPassword});
    
    user = new User({
      name,
      email,
      password: hashedPassword,
    });


    await user.save();

    const token = await generatedJWT(user.id, user.name, user.email);

    // Responder con la información del usuario y el token
    res.status(201).json({
      ok: true,
      msg: "User created!",
      uid: user.id,
      email: user.email,
      name: user.name,
      token
    });

  } catch (error) {
    console.error(error); 
    res.status(500).json({
      ok: false,
      msg: "User not created",
    });
  }
};


const userRenew = async(req, res = response) => {

  const { uid, name, email } = req


  const token = await generatedJWT( uid, name, email )


  res.json({
    ok: true,
    msg: "Renew",
    token,
    name,
    email,
    uid,
  })

};

export { userLogin, userRegister, userRenew };
