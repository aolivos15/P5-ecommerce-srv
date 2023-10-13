import { User } from "../models/User.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const signUp = async (req, res) => {
  try {
    const { name, lastname, email, password } = req.body;

    // Check if user filled all form fields
    if ( !name || !lastname || !email || !password ) {
      return res.status(400).json({message: 'Por favor rellene todos los campos.'});
    }

    // Check if the user is already registered
    const isUserRegistered = await User.findOne({ email: email });
    if (isUserRegistered) {
      return res.status(500).json({message: 'Ya existe una cuenta con el email ingresado.'});
    }

    const passwordEncrypt = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      lastname,
      email,
      password: passwordEncrypt,
      address: "",
      city: "",
      state: "",
      country: "",
      phone: "",
      role: "[USER]",
      orders: []
    })

    // Save user on database
    await newUser.save();

    res.status(201).json({message: "¡Tu cuenta ha sido creada! Ya puedes iniciar sesión."});

  } catch (error) {
    res.status(500).json({message: `No se pudo crear tu cuenta. Por favor, inténtalo más tarde. Error: ${error}`});
  }
}