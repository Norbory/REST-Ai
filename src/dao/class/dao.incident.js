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

  async getIncidentsByCompanyIdAndDate(companyId, date) {
    try {
      const company = await Company.findById(companyId);
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
