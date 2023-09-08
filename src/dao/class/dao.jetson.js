const Company = require('../models/Company.model');

class JetsonDAO {
  static async getJetsonsByCompanyId(companyId) {
    try {
      const company = await Company.findById(companyId);
      return company.jetson;
    } catch (error) {
      throw error;
    }
  }

  static async addJetson(companyId, jetsonData) {
    try {
      const company = await Company.findById(companyId);
      company.jetson.push(jetsonData);
      const savedCompany = await company.save();
      return savedCompany.jetson[savedCompany.jetson.length - 1];
    } catch (error) {
      throw error;
    }
  }

  // Agrega más métodos según tus necesidades (actualizar, eliminar, etc.)
}

module.exports = JetsonDAO;
