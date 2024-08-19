const { Company } = require('../models/company.model');
let cache = {};
let cacheUserCompany = {};
let cacheUserCompanyEachMonth = {};
class StatsDAO {
  // Get statistics by company
  async getStatisticsByCompanyId(companyId) {

    try {
      const company = await Company.findById(companyId, 'incidents -_id');
      if (!company) {
        throw new Error('Compañía no encontrada');
      }

      let Cuentas = {
        Casco: 0,
        Chaleco: 0,
        Guantes: 0,
        Lentes: 0,
        Orejeras: 0,
        Respirador: 0,
      };

      company.incidents.forEach(incident => {
        incident.EPPs.forEach(epp => {
          if (Cuentas.hasOwnProperty(epp)) {
            Cuentas[epp]++;
          }
        });
      });
      
      return Cuentas;
    } catch (error) {
      throw error;
    }
  }

  // Get statistics by company sorted by month
  async getStatisticsByCompanyIdEachMonth(companyId) {
    try {
      const company = await Company.findById(companyId);
      if (!company) {
        throw new Error('Compañía no encontrada');
      }

      let Cuentas = {
        Mes: [],
      };

      const incidentsByYear = company.incidents.filter(incident => incident.date.getFullYear() === new Date().getFullYear());

      const incidentsByMonth = incidentsByYear.reduce((acc, incident) => {
        const month = incident.date.getMonth();
        acc[month] = acc[month] || [];
        acc[month].push(incident);
        return acc;
      }, []);

      Cuentas.Mes = incidentsByMonth.map((incidents, index) => {
        let CuentasMes = {
          nombre: new Date(2024, index).toLocaleString('es-ES', { month: 'long' }),
          Registrados: 0,
          Amonestados: 0,
          Descartados: 0,
          Casco: 0,
          Chaleco: 0,
          Guantes: 0,
          Lentes: 0,
          Orejeras: 0,
          Respirador: 0,
          Total: 0
        };

        incidents.forEach(incident => {
          CuentasMes.Total++;
          if (incident.Deleted) {
            CuentasMes.Descartados++;
            if (incident.Reported) {
              CuentasMes.Amonestados++;
            }
          } else {
            CuentasMes.Registrados++;
          }

          incident.EPPs.forEach(epp => {
            if (CuentasMes.hasOwnProperty(epp)) {
              CuentasMes[epp]++;
            }
          });
        });

        return CuentasMes;
      });
      
      return Cuentas;
    } catch (error) {
      throw error;
    }
  }

  // Get incidents by intervals of 5 days each month
  // 1-5, 6-10, 11-15, 16-20, 21-25, 26-End
  async getIncidentsByIntervals(companyId) {
    try {
      const company = await Company.findById(companyId, 'incidents -_id');
      if (!company) {
        throw new Error('Compañía no encontrada');
      }

      let Cuentas = {
        Mes: [],
      };

      const incidentsByYear = company.incidents.filter(incident => incident.date.getFullYear() === new Date().getFullYear());

      const incidentsByMonth = incidentsByYear.reduce((acc, incident) => {
        const month = incident.date.getMonth();
        acc[month] = acc[month] || [];
        acc[month].push(incident);
        return acc;
      }, []);

      Cuentas.Mes = incidentsByMonth.map((incidents, index) => {
        let CuentasMes = {
          nombre: new Date(2024, index).toLocaleString('es-ES', { month: 'long' }),
          '1-5': 0,
          '6-10': 0,
          '11-15': 0,
          '16-20': 0,
          '21-25': 0,
          '26-End': 0,
          Total: 0
        };

        incidents.forEach(incident => {
          CuentasMes.Total++;
          const day = incident.date.getDate();
          if (day <= 5) {
            CuentasMes['1-5']++;
          } else if (day <= 10) {
            CuentasMes['6-10']++;
          } else if (day <= 15) {
            CuentasMes['11-15']++;
          } else if (day <= 20) {
            CuentasMes['16-20']++;
          } else if (day <= 25) {
            CuentasMes['21-25']++;
          } else {
            CuentasMes['26-End']++;
          }
        });

        return CuentasMes;
      });

      return Cuentas;
    } catch (error) {
      throw error;
    }
  }

  // Get statistics by user's company (for Supervisor)
  async getStatisticsByUserCompany(companyId, userId) {
    try {
      const company = await Company.findById(companyId, 'incidents users -_id');
      if (!company) {
        throw new Error('Compañía no encontrada');
      }
      const user = company.users.id(userId, 'name -_id');
      if (!user) {
        throw new Error('Usuario no encontrado');
      }
      let Cuentas = {
        Nombre: user.name,
        Registrados: 0,
        Amonestados: 0,
        Descartados: 0,
        Casco: 0,
        Chaleco: 0,
        Guantes: 0,
        Lentes: 0,
        Orejeras: 0,
        Respirador: 0,
        Total: 0
      };
  
      const incidentesWithSupervisor = company.incidents.filter(incident => incident.supervisor === user.name);
      Cuentas.Total = incidentesWithSupervisor.length;
      const incidentesEliminados = incidentesWithSupervisor.filter(incident => incident.Deleted);
      Cuentas.Registrados = Cuentas.Total - incidentesEliminados.length;
      const incidentesAmonestados = incidentesEliminados.filter(incident => incident.Reported);
      Cuentas.Amonestados = incidentesAmonestados.length;
      Cuentas.Descartados = incidentesEliminados.length - incidentesAmonestados.length;
  
      incidentesAmonestados.forEach(incident => {
        incident.EPPs.forEach(epp => {
          if (Cuentas.hasOwnProperty(epp)) {
            Cuentas[epp]++;
          }
        });
      });
      return Cuentas;
    } catch (error) {
      throw error;
    }
  }

  // Get statistics by all areas by each month
  async getStatisticsByAreasEachMonth(companyId) {
    try {
      const company = await Company.findById(companyId, 'incidents areas -_id');
      if (!company) {
        throw new Error('Compañía no encontrada');
      }
      const incidentsByYear = company.incidents.filter(incident => incident.date.getFullYear() === new Date().getFullYear());
      const areas = company.areas;
      
      let Cuentas = {};

      // Count total of incidents by each area
      areas.forEach(area => {
        Cuentas[area.Name] = incidentsByYear.filter(incident => incident.areaName === area.Name).length;
      });

      // Count total of non area incidents
      Cuentas['Sin Área'] = incidentsByYear.filter(incident => !incident.areaName).length;

      return Cuentas;
    } catch (error) {
      throw error;
    }
  }

  // Get statistics by user's company sorted by month (for User)
  async getStatisticsByUserCompanyEachMonth (companyId, userId) {
    
    try {
      const company = await Company.findById(companyId);
      if (!company) {
        throw new Error('Compañía no encontrada');
      }
      const user = company.users.id(userId);
      if (!user) {
        throw new Error('Usuario no encontrado');
      }
  
      let Cuentas = {
        Nombre: user.name,
        Mes: [],
      };
  
      const incidentesWithSupervisor = company.incidents.filter(incident => incident.supervisor === user.name);
      const incidentsByCurrentYear = incidentesWithSupervisor.filter(incident => incident.date.getFullYear() === new Date().getFullYear());
  
      const incidentsByMonth = incidentsByCurrentYear.reduce((acc, incident) => {
        const month = incident.date.getMonth();
        acc[month] = acc[month] || [];
        acc[month].push(incident);
        return acc;
      }, []);
  
      Cuentas.Mes = incidentsByMonth.map((incidents, index) => {
        let CuentasMes = {
          nombre: new Date(2020, index).toLocaleString('es-ES', { month: 'long' }),
          Registrados: 0,
          Amonestados: 0,
          Descartados: 0,
          Casco: 0,
          Chaleco: 0,
          Guantes: 0,
          Lentes: 0,
          Orejeras: 0,
          Respirador: 0,
          Total: 0
        };
  
        incidents.forEach(incident => {
          if (incident.supervisor !== user.name) {
            return;
          }
  
          CuentasMes.Total++;
          if (incident.Deleted) {
            CuentasMes.Descartados++;
            if (incident.Reported) {
              CuentasMes.Amonestados++;
            }
          } else {
            CuentasMes.Registrados++;
          }
  
          incident.EPPs.forEach(epp => {
            if (CuentasMes.hasOwnProperty(epp)) {
              CuentasMes[epp]++;
            }
          });
        });
  
        return CuentasMes;
      });

      return Cuentas;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = StatsDAO;
