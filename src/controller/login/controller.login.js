const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../../config');
const UserDAO = require('../../dao/class/dao.users');

const User = new UserDAO;

// Function to create a token
function createToken(user) {
  return jwt.sign(
    {
      id: user.id,
      name: user.name,
      last: user.surname,
      email: user.email,
    },
    config.jwtSecret,
    {
      expiresIn: 86400, // 24 hours
    }
  );
}

// Endpoint para registro de usuarios
router.post('/signup', async (req, res) => {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({ msg: 'Por favor, envía tu nombre de usuario y contraseña' });
  }

  const existingUser = await User.getUserByUsername(req.body.username)  ;
  if (existingUser) {
    return res.status(400).json({ msg: 'El usuario ya existe' });
  }

  const newUser = User.addUser(req.body);
  await newUser.save();

  return res.status(201).json(newUser);
});



// Endpoint para inicio de sesión
router.post('/signin', async (req, res) => {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({ msg: 'Por favor, envía tu nombre de usuario y contraseña' });
  }

  const user = await User.getUserByUsername(req.body.username);
  if (!user) {
    return res.status(400).json({ msg: 'El usuario no existe' });
  }

  const isMatch = await user.comparePassword(req.body.password);
  if (isMatch) {
    const token = createToken(user);
    res.setHeader('Access-Control-Expose-Headers', 'auth-token');
    return res.status(200).header('auth-token', token).json({
      name: user.name,
      last: user.surname,
      email: user.email,
      company_id: user.company_id,
    });
  }

  return res.status(400).json({ msg: 'El nombre de usuario o la contraseña son incorrectos' });
});

module.exports = router;
