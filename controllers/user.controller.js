import { User } from "../models/User.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const signUp = async (req, res) => {
  try {
    const { name, lastname, email, password } = req.body;

    // Check if user filled all form fields
    if ( !name || !lastname || !email || !password ) {
      return res.status(400).json({message: 'Por favor rellena todos los campos.'});
    }

    // Check if the user is already registered
    const isUserRegistered = await User.findOne({ email: email });
    if (isUserRegistered) {
      return res.status(500).json({message: 'Ya existe una cuenta con el correo ingresado.'});
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


export const logIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user filled all form fields
    if ( !email || !password ) {
      return res.status(400).json({message: 'Por favor rellena todos los campos.'});
    }

    // Check if user and password are correct
    const getUserByEmail = await User.findOne({ email: email });

    if (!getUserByEmail) {
      return res.status(404).json({message: 'El correo ingresado no se encuentra registrado.'})
    }

    const verifyPassword = await bcrypt.compare(password, getUserByEmail.password);
    if (!verifyPassword) {
      return res.status(403).json({message: 'La contraseña ingresada es incorrecta.'});
    }

    // Expiration time: 1 hour since current date and time
    const expirationTime = Math.floor(new Date()/1000) + 3600;

    // Generate a token for the user
    const token = jwt.sign({
      exp: expirationTime,
      data: {
        id: getUserByEmail._id,
        email: getUserByEmail.email,
        name: getUserByEmail.name,
        lastname: getUserByEmail.lastname
      }
    }, process.env.SECRET_KEY);

    // Get user data excluding password
    const user = await User.findOne({email: email}).select('-password -role -orders');

    res.json({token, user});

  } catch (error) {
    res.status(403).json({message: 'No se pudo verificar tu cuenta. Por favor, inténtalo más tarde.'});
  }
}

// Verify that user exists and get their data.
// Use together with authRequire to get only logged in / authenticated users
export const verifyUser = async (req, res) => {
  try {
    const user = await User.findById(req.data.id).select('-password');
    res.json(user);

  } catch (error) {
    return res.status(500).json({message: 'No se pudo verificar al usuario.'});
  }
}


// Update user data
export const updateUser = async (req, res) => {
  try {
    const userID = req.params.id;
    const updateData = req.body;

    const updateUser = await User.findByIdAndUpdate(userID, updateData, { new: true });
    if (!updateUser) {
      return res.status(404).json({message: `No se pudo encontrar un usuario con ID ${userID}.`});
    }
    res.status(202).json({message: `Usuario ${updateUser.name} ${updateUser.lastname} actualizado con éxito.`});

  } catch (error) {
    res.status(500).json({message: "No se pudo actualizar los datos del usuario."});
  }
}