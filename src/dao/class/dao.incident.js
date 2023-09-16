const Company = require('../models/Company.model');

class IncidentDAO {
  async getIncidentsByCompanyId(companyId) {
    try {
      const company = await Company.findById(companyId);
      return company.incidents;
    } catch (error) {
      throw error;
    }
  }

  async addIncident(companyId, incidentData) {
    try {
      const company = await Company.findById(companyId);
      company.incidents.push(incidentData);
      const savedCompany = await company.save();
      return savedCompany.incidents[savedCompany.incidents.length - 1];
    } catch (error) {
      throw error;
    }
  }

  async updateIncident(companyId, incidentId, newData) {
    try {
      const company = await Company.findById(companyId);
      const incident = company.incidents.id(incidentId);
      if (!incident) throw new Error('Incident not found');
      
      incident.set(newData);
      const savedCompany = await company.save();
      return incident;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = IncidentDAO;
