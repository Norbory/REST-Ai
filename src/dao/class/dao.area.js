const Company = require('../models/Company.model');

class AreaDAO {
  static async getAreasByCompanyId(companyId) {
    try {
      const company = await Company.findById(companyId);
      return company.areas;
    } catch (error) {
      throw error;
    }
  }

  static async addArea(companyId, areaData) {
    try {
      const company = await Company.findById(companyId);
      company.areas.push(areaData);
      const savedCompany = await company.save();
      return savedCompany.areas[savedCompany.areas.length - 1];
    } catch (error) {
      throw error;
    }
  }

  // Agrega más métodos según tus necesidades (actualizar, eliminar, etc.)
}

module.exports = AreaDAO;
