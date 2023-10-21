const {Company} = require('../models/Company.model');

class JetsonDAO {
  async getJetsonsByCompanyId(companyId) {
    try {
      const company = await Company.findById(companyId);
      return company ? company.jetson : [];
    } catch (error) {
      throw error;
    }
  }

  async getJetsonById(companyId, jetsonId) {
    try {
      const company = await Company.findById(companyId);
      if (!company) {
        throw new Error('Compañía no encontrada');
      }

      const jetson = company.jetson.find(jetson => jetson._id.toString() === jetsonId);
      if (!jetson) {
        throw new Error('Jetson no encontrado');
      }

      return jetson;
    } catch (error) {
      throw error;
    }
  }

  async addJetson(companyId, jetsonData) {
    try {
      const company = await Company.findById(companyId);
      if (!company) {
        throw new Error('Compañía no encontrada');
      }

      const newJetson = {
        ID_Area: jetsonData.ID_Area,
      };

      company.jetson.push(newJetson);
      const savedCompany = await company.save();
      return savedCompany.jetson[savedCompany.jetson.length - 1];
    } catch (error) {
      throw error;
    }
  }

  async updateJetson(companyId, jetsonId, newData) {
    try {
      const company = await Company.findById(companyId);
      if (!company) {
        throw new Error('Compañía no encontrada');
      }

      const jetson = company.jetson.find(jetson => jetson._id.toString() === jetsonId);
      if (!jetson) {
        throw new Error('Jetson no encontrado');
      }

      jetson.ID_Company = newData.ID_Company;
      jetson.ID_Area = newData.ID_Area;
      jetson.ID_Cam = newData.ID_Cam;

      await company.save();
      return jetson;
    } catch (error) {
      throw error;
    }
  }

  async deleteJetson(companyId, jetsonId) {
    try {
      const company = await Company.findById(companyId);
      if (!company) {
        throw new Error('Compañía no encontrada');
      }

      const jetsonIndex = company.jetson.findIndex(jetson => jetson._id.toString() === jetsonId);
      if (jetsonIndex === -1) {
        throw new Error('Jetson no encontrado');
      }

      const deletedJetson = company.jetson.splice(jetsonIndex, 1);
      await company.save();
      return deletedJetson[0];
    } catch (error) {
      throw error;
    }
  }
}

module.exports = JetsonDAO;
