const { Company, Report } = require('../models/company.model');

class ReportDAO {
  async subirReporte(incidentId, reportData) {
    try {
      const nuevoReporte = await Report.create(reportData);

      const company = await Company.findOne({ 'incidents._id': incidentId }, { 'incidents.$': 1 });

      if (company) {
        const incident = company.incidents[0];

        incident.reportes.push(nuevoReporte._id);

        await Company.updateOne({ 'incidents._id': incidentId }, { $set: { 'incidents.$.reportes': incident.reportes } });
      } else {
        throw new Error('Incidente no encontrado');
      }
    } catch (error) {
      throw error;
    }
  }

  async getReportByIncidentId(incidentId) {
    try {
      const company = await Company.findOne({ 'incidents._id': incidentId }, { 'incidents.$': 1 });

      if (company) {
        const incident = company.incidents[0];

        const reportes = await Report.find({ _id: { $in: incident.reportes } });

        return reportes;
      } else {
        throw new Error('Incidente no encontrado');
      }
    } catch (error) {
      throw error;
    }
  }

}



module.exports = ReportDAO;
