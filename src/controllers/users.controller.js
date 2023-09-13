import {UserDAO} from '../dao/class/dao.users.js'

const User = new UserDAO;

// Obtener todos los usuarios de una compañía
export const getUsers = async (req, res) => {
  try {
    const companyId = req.params.companyId;
    const users = await User.getUsersByCompanyId(companyId);
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Agregar un nuevo usuario a una compañía
export const createUser = async (req, res) => {
  try {
    const companyId = req.params.companyId;
    const userData = req.body;
    const newUser = await User.addUser(companyId, userData);
    res.json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


