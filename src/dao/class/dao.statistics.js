const { Company } = require('../models/company.model');
let cache = {};
let cacheUserCompany = {};
let cacheUserCompanyEachMonth = {};
class StatsDAO {
  // Get statistics by company
  async getStatisticsByCompanyId(companyId) {
    const cachedData = cache[companyId];
    if (cachedData) {
      // Every hour in milliseconds
      const oneHour = 60 * 60 * 1000;
      const now = Date.now();
      if (now - cachedData.timestamp < oneHour) {
        return cachedData.data;
      }
    }
    try {
      const company = await Company.findById(companyId);
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

      // Update the cache with the new data and the current timestamp
      cache[companyId] = {
        data: Cuentas,
        timestamp: Date.now()
      };

      return Cuentas;
    } catch (error) {
      throw error;
    }
  }

  // Get statistics by user's company (for Supervisor)
  async getStatisticsByUserCompany(companyId, userId) {
    const cachedData = cacheUserCompany[companyId];
    if (cachedData) {
      // Every hour in milliseconds
      const oneHour = 60 * 60 * 1000;
      const now = Date.now();
      if (now - cachedData.timestamp < oneHour) {
        return cachedData.data;
      }
    }
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
      // Cache the result
      cacheUserCompany[companyId] = {
        data: Cuentas,
        timestamp: Date.now()
      };
      return Cuentas;
    } catch (error) {
      throw error;
    }
  }

  // Get statistics by user's company sorted by month (for User)
  async getStatisticsByUserCompanyEachMonth (companyId, userId) {
    const cachedData = cacheUserCompanyEachMonth[companyId];
    if (cachedData) {
      // Every hour in milliseconds
      const oneHour = 60 * 60 * 1000;
      const now = Date.now();
      if (now - cachedData.timestamp < oneHour) {
        return cachedData.data;
      }
    }
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
      // Cache the result
      cacheUserCompanyEachMonth[companyId] = {
        data: Cuentas,
        timestamp: Date.now()
      };
      return Cuentas;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = StatsDAO;
