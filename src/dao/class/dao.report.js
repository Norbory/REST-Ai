const { Company, Report } = require('../models/Company.model');

class ReportDAO {
  async subirReporte(incidentId, reportData) {
    try {
      const nuevoReporte = await Report.create(reportData);

      const company = await Company.findOne({ 'incidents._id': incidentId }, { 'incidents.$': 1 });

      if (company) {
        const incident = company.incidents[0];

        incident.reportes.push(nuevoReporte._id);

        await company.save();
      } else {
        throw new Error('Incidente no encontrado');
      }
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ReportDAO;