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
        role: userData.role,
        Name: userData.Name,
        telegramID: userData.telegramID,
      };

      company.users.push(newUser);
      const savedCompany = await company.save();
      return savedCompany.users[savedCompany.users.length - 1];
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

  async getUserByUsername(username) {
    try {
      const companies = await Company.find({ "users.Name": username });
      const user = companies.flatMap(company => company.users.find(user => user.Name === username));
      return user;
    } catch (error) {
      throw error;
    }
  }

  async getUserById(userId) {
    try {
      const companies = await Company.find({ "users._id": userId });
      const user = companies.flatMap(company => company.users.find(user => user._id.toString() === userId));
      return user;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserDAO;
