const { Company } = require('../models/company.model');

class StatsDAO {
  // Get statistics by company
  async getStatisticsByCompanyId (companyId) {
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
        Total: 0
      };
      company.incidents.forEach(incident => {
        incident.EPPs.forEach(epp => {
          switch (epp) {
            case 'Casco':
              Cuentas.Casco++;
              break;
            case 'Chaleco':
              Cuentas.Chaleco++;
              break;
            case 'Guantes':
              Cuentas.Guantes++;
              break;
            case 'Lentes':
              Cuentas.Lentes++;
              break;
            case 'Orejeras':
              Cuentas.Orejeras++;
              break;
            case 'Respirador':
              Cuentas.Respirador++;
              break;
            default:
              break;
          }
        });
      });
      Cuentas.Total = Cuentas.Casco + Cuentas.Chaleco + Cuentas.Guantes + Cuentas.Lentes + Cuentas.Orejeras + Cuentas.Respirador;
      return Cuentas;
    } catch (error) {
      throw error;
    }
  };

  // Get statistics by user's company (for Supervisor)
  async getStatisticsByUserCompany (companyId, userId) {
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
        if (incident.supervisor !== user.name) {
          return Cuentas;
        }
        incident.EPPs.forEach(epp => {
          switch (epp) {
            case 'Casco':
              Cuentas.Casco++;
              break;
            case 'Chaleco':
              Cuentas.Chaleco++;
              break;
            case 'Guantes':
              Cuentas.Guantes++;
              break;
            case 'Lentes':
              Cuentas.Lentes++;
              break;
            case 'Orejeras':
              Cuentas.Orejeras++;
              break;
            case 'Respirador':
              Cuentas.Respirador++;
              break;
            default:
              break;
          }
        });
      });
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
        Mes:[{
          nombre: '',
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
        }],
      };
      const incidentesWithSupervisor = company.incidents.filter(incident => incident.supervisor === user.name);
      // Incidents current Year
      const incidentsByCurrentYear = incidentesWithSupervisor.filter(incident => incident.date.getFullYear() === new Date().getFullYear());
      // Incidents by each month
      const incidentsByMonth = incidentsByCurrentYear.reduce((acc, incident) => {
        const month = incident.date.getMonth();
        acc[month] = acc[month] || [];
        acc[month].push(incident);
        return acc;
      }, []);

      Cuentas.Mes = incidentsByMonth.map((incidents, index) => {
        let CuentasMes = {
          nombre: '',
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
        CuentasMes.nombre = new Date(2020, index).toLocaleString('es-ES', { month: 'long' });
        // Cuentas por mes
        const incidentesWithSupervisor = incidents.filter(incident => incident.supervisor === user.name);
        CuentasMes.Total = incidentesWithSupervisor.length;
        const incidentesEliminados = incidentesWithSupervisor.filter(incident => incident.Deleted);
        CuentasMes.Registrados = CuentasMes.Total - incidentesEliminados.length;
        const incidentesAmonestados = incidentesEliminados.filter(incident => incident.Reported);
        CuentasMes.Amonestados = incidentesAmonestados.length;
        CuentasMes.Descartados = incidentesEliminados.length - incidentesAmonestados.length;
        // Cuentas por mes y por EPP
        incidents.map((incident, index) => {
          if (incident.supervisor !== user.name) {
            return CuentasMes;
          }
          incident.EPPs.forEach(epp => {
            switch (epp) {
              case 'Casco':
                CuentasMes.Casco++;
                break;
              case 'Chaleco':
                CuentasMes.Chaleco++;
                break;
              case 'Guantes':
                CuentasMes.Guantes++;
                break;
              case 'Lentes':
                CuentasMes.Lentes++;
                break;
              case 'Orejeras':
                CuentasMes.Orejeras++;
                break;
              case 'Respirador':
                CuentasMes.Respirador++;
                break;
              default:
                break;
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
