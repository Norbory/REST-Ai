const Company = require('../models/Company.model');

class UserDAO {
  async getUsersByCompanyId(companyId) {
    try {
      const company = await Company.findById(companyId);
      return company ? company.users : [];
    } catch (error) {
      throw error;
    }
  }

  async getUserById(companyId, userId) {
    try {
      const company = await Company.findById(companyId);
      if (!company) {
        throw new Error('Compañía no encontrada');
      }

      const user = company.users.find(user => user._id.toString() === userId);
      if (!user) {
        throw new Error('Usuario no encontrado');
      }

      return user;
    } catch (error) {
      throw error;
    }
  }

  async addUser(companyId, userData) {
    try {
      const company = await Company.findById(companyId);
      if (!company) {
        throw new Error('Compañía no encontrada');
      }

      const newUser = {
        ID_Company: userData.ID_Company,
        ID_Area: userData.ID_Area,
        ID_Cam: userData.ID_Cam,
        role: userData.role,
        Name: userData.Name
      };

      company.users.push(newUser);
      const savedCompany = await company.save();
      return newUser;
    } catch (error) {
      throw error;
    }
  }

  async updateUser(companyId, userId, newData) {
    try {
      const company = await Company.findById(companyId);
      if (!company) {
        throw new Error('Compañía no encontrada');
      }

      const user = company.users.find(user => user._id.toString() === userId);
      if (!user) {
        throw new Error('Usuario no encontrado');
      }

      user.ID_Company = newData.ID_Company;
      user.ID_Area = newData.ID_Area;
      user.ID_Cam = newData.ID_Cam;
      user.role = newData.role;
      user.Name = newData.Name;

      await company.save();
      return user;
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(companyId, userId) {
    try {
      const company = await Company.findById(companyId);
      if (!company) {
        throw new Error('Compañía no encontrada');
      }

      const userIndex = company.users.findIndex(user => user._id.toString() === userId);
      if (userIndex === -1) {
        throw new Error('Usuario no encontrado');
      }

      const deletedUser = company.users.splice(userIndex, 1);
      await company.save();
      return deletedUser[0];
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserDAO;
