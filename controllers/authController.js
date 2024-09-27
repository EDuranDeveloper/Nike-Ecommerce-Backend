import { response } from "express";
import { encryptPass } from "../helpers/encryptPass.js";
import User from "../models/User.js";
import bcrypt from 'bcrypt'

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

    res.json({
        ok: true,
        uid: user.uid,
        name: user.name,
        email: user.email,
    })




  } catch (error) {
    console.log("error");
  }
};

const userRegister = async (req, res = response) => {
  const { name, email, password, confirmPassword } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        ok: false,
        msg: "User existing",
      });
    }

    const hashedPassword = await encryptPass({ password, confirmPassword });

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({
      ok: true,
      msg: "User created!",
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "User not created",
    });
  }
};

const userRenew = (req, res = response) => {};

export { userLogin, userRegister, userRenew };
