const {Company} = require('./../models/Company.model');

class CompanyDAO {
  async getAllCompanies() {
    try {
      const companies = await Company.find();
      return companies;
    } catch (error) {
      throw error;
    }
  }

  async getCompanyById(id) {
    try {
      const company = await Company.findById(id);
      return company;
    } catch (error) {
      throw error;
    }
  }

  async createCompany(companyData) {
    try {
      const newCompany = new Company(companyData);
      const savedCompany = await newCompany.save();
      return savedCompany;
    } catch (error) {
      throw error;
    }
  }

  async updateCompany(id, newData) {
    try {
      const updatedCompany = await Company.findByIdAndUpdate(id, newData, { new: true });
      return updatedCompany;
    } catch (error) {
      throw error;
    }
  }

  async deleteCompany(id) {
    try {
      const deletedCompany = await Company.findByIdAndDelete(id);
      return deletedCompany;
    } catch (error) {
      throw error;
    }
  }

  async getCompanyByTelegramID(telegramID) {
    try {
      const company = await Company.findOne({ 'users.telegramID': telegramID });

      if (!company) throw new Error('Company not found');
      return company;
    } catch (error) {
      throw error;
    }
  }

  async  getCompanyByUserId(userID) {
    try {
      const company = await Company.findOne(
        {'users._id': userID},
        {users: 0} // Excluir el array de usuarios del resultado
      );
  
      if (company) {
        return company;
      } else {
        return null; // Si no se encuentra la compañía, puedes devolver null o lanzar un error según tus preferencias.
      }
    } catch (error) {
      throw error;
    }
  }

}

module.exports = CompanyDAO;
