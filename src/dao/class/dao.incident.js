const {Company} = require('../models/company.model');
const { Incident } = require('../models/incident.model');
class IncidentDAO {
  // Get all incidents
  // only incidents for an specific company
  async getAllIncidentsByCompanyId(companyId) {
    try {
      const incidents = await Incident.findById(companyId, 'incidents -_id').sort({date: -1});
      if (!incidents) {
        throw new Error('Compañía no encontrada');
      }
      return incidents;
    } catch (error) {
      throw error;
    }
  }

  // Metodo para obtener lista de incidentes
  async getIncidentsByCompanyId(companyId) {
    try {
      const company = await Company.findById(companyId, 'incidents -_id');
      if (!company) {
        throw new Error('Compañía no encontrada');
      }
      const incidentsSorted = company.incidents.sort((a, b) => new Date(b.date) - new Date(a.date));
      return incidentsSorted;
    } catch (error) {
      throw error;
    }
  }

  // Metodo para obtener lista de incidentes Not Deleted
  async getIncidentsNotDeletedByCompanyId(companyId) {
    try {
      const company = await Company.findById(companyId, 'incidents -_id');
      if (!company) {
        throw new Error('Compañía no encontrada');
      }
      const incidentsNotDeleted = company.incidents.filter(incident => !incident.Deleted);
      const incidentsSorted = incidentsNotDeleted.sort((a, b) => new Date(b.date) - new Date(a.date));
      return incidentsSorted;
    } catch (error) {
      throw error;
    }
  }

  // Metodo para obtener lista de incidentes Deleted
  async getIncidentsDeletedByCompanyId(companyId) {
    try {
      const company = await Company.findById(companyId, 'incidents -_id');
      if (!company) {
        throw new Error('Compañía no encontrada');
      }
      const incidentsDeleted = company.incidents.filter(incident => incident.Deleted);
      const incidentsSorted = incidentsDeleted.sort((a, b) => new Date(b.ModifyDate) - new Date(a.ModifyDate));
      return incidentsSorted;
    } catch (error) {
      throw error;
    }
  }

  // Metodo para obtener un incidente por ID
  async getIncidentById(companyId, incidentId) {
    try {
      const company = await Company.findById(companyId, 'incidents -_id');
      if (!company) {
        throw new Error('Compañía no encontrada');
      }
      const incidentIndex = company.incidents.findIndex(incident => incident._id.toString() === incidentId);
      if (incidentIndex === -1) {
        throw new Error('Incident not found');
      }
      const incident = company.incidents[incidentIndex];
      return incident;
    } catch (error) {
      throw error;
    }
  }

  // Metodo para añadir un incidente
  async addIncident(companyId, incidentData) {
    try {
      const company = await Company.findById(companyId, 'incidents');
      company.incidents.push(incidentData);
      const savedCompany = await company.save();
      return savedCompany.incidents[savedCompany.incidents.length - 1];
    } catch (error) {
      throw error;
    }
  }

  // Metodo para actualizar un incidente
  async updateIncident(companyId, incidentId, newData) {
    try {
      const company = await Company.findById(companyId , 'incidents');
      if (!company) {
        throw new Error('Compañía no encontrada');
      }
      const incidentIndex = company.incidents.findIndex(incident => incident._id.toString() === incidentId);
      if (incidentIndex === -1) {
        throw new Error('Incident not found');
      }
      company.incidents[incidentIndex].set(newData);
      const incident= company.incidents[incidentIndex];
      await company.save();
      return incident;
    } catch (error) {
      throw error;
    }
  }

  // Metodo para eliminar un incidente
  async deleteIncident(companyId, incidentId) {
    try {
      const company = await Company.findById(companyId , 'incidents');
      const incidentIndex = company.incidents.findIndex(incident => incident._id.toString() === incidentId);
      if (incidentIndex === -1) {
        throw new Error('Incident not found');
      }
      company.incidents.splice(incidentIndex, 1);
      await company.save();
    } catch (error) {
      throw error;
    }
  } 

  async getIncidentsByCompanyIdAndDate(companyId, date) {
    try {
      const company = await Company.findById(companyId, 'incidents');
      const incidents = company.incidents.filter(incident => {
        const incidentDate = new Date(incident.date);
        return incidentDate.toISOString().slice(0, 10) === date.toISOString().slice(0, 10);
      });
      return incidents;
    } catch (error) {
      throw error;
    }
  }

  async getWeeklyStatistics() {
    try {
      const incidents = await Company.aggregate([
        {
          $unwind: "$incidents"
        },
        {
          $match: {
            "incidents.date": {
              $gte: new Date(new Date() - 7 * 24 * 60 * 60 * 1000) // Fecha de hace una semana
            }
          }
        },
        {
          $group: {
            _id: null,
            totalDetections: { $sum: 1 },
            totalIncompleteEPPs: { $sum: { $size: "$incidents.EPPs" } },
            totalReports: { $sum: { $cond: ["$incidents.Reported", 1, 0] } },
            daysWithoutIncidents: { $sum: 1 }
          }
        }
      ]);

      const weeklyStats = {
        totalDetections: incidents[0].totalDetections,
        totalIncompleteEPPs: incidents[0].totalIncompleteEPPs,
        totalReports: incidents[0].totalReports,
        daysWithoutIncidents: incidents[0].daysWithoutIncidents
      };

      return weeklyStats;
    } catch (error) {
      throw error;
    }
  }

  async getMonthlyStatistics() {
    try {

      const monthNames = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
      ];

      const currentMonth = new Date().getMonth() + 1; // El mes actual (1-12)

      const incidents = await Company.aggregate([
        {
          $unwind: "$incidents"
        },
        {
          $match: {
            "incidents.date": {
              $gte: new Date(new Date().getFullYear(), currentMonth - 1, 1), // Primer día del mes actual
              $lt: new Date(new Date().getFullYear(), currentMonth, 1) // Primer día del próximo mes
            }
          }
        },
        {
          $group: {
            _id: null,
            totalDetections: { $sum: 1 },
            totalIncompleteEPPs: { $sum: { $size: "$incidents.EPPs" } },
            totalReports: { $sum: { $cond: ["$incidents.Reported", 1, 0] } }
          }
        }
      ]);

      const currentMonthName = monthNames[currentMonth];

      const monthlyStats = {
        month: currentMonthName,
        totalDetections: incidents[0].totalDetections,
        totalIncompleteEPPs: incidents[0].totalIncompleteEPPs,
        totalReports: incidents[0].totalReports
      };

      return monthlyStats;
    } catch (error) {
      throw error;
    }
  }
}




module.exports = IncidentDAO;
