const Company = require('../models/Company.model');

class CompanyDAO {
  static async getAllCompanies() {
    try {
      const companies = await Company.find();
      return companies;
    } catch (error) {
      throw error;
    }
  }

  static async getCompanyById(id) {
    try {
      const company = await Company.findById(id);
      return company;
    } catch (error) {
      throw error;
    }
  }

  static async createCompany(companyData) {
    try {
      const newCompany = new Company(companyData);
      const savedCompany = await newCompany.save();
      return savedCompany;
    } catch (error) {
      throw error;
    }
  }

  static async updateCompany(id, newData) {
    try {
      const updatedCompany = await Company.findByIdAndUpdate(id, newData, { new: true });
      return updatedCompany;
    } catch (error) {
      throw error;
    }
  }

  static async deleteCompany(id) {
    try {
      const deletedCompany = await Company.findByIdAndDelete(id);
      return deletedCompany;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = CompanyDAO;
