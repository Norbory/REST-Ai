const express = require('express');
const router = express.Router();
const UserDAO = require('../dao/class/dao.user');

const User = new UserDAO;

// Obtener todos los usuarios de una compañía
router.get('/:companyId/users', async (req, res) => {
  const companyId = req.params.companyId;
  try {
    const users = await User.getUsersByCompanyId(companyId);
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Agregar un nuevo usuario a una compañía
router.post('/:companyId/users', async (req, res) => {
  const companyId = req.params.companyId;
  const userData = req.body;
  try {
    const newUser = await User.addUser(companyId, userData);
    res.json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
