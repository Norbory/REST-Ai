const { Company } = require('../models/Company.model');

class StatsDAO {
  async getStatisticsByCompanyId_Week(companyId) {
    try {
      const company = await Company.findById(companyId);

      if (!company) {
        throw new Error('Compañía no encontrada');
      }

      const hoy = new Date();
      const primerDiaDeEstaSemana = new Date(hoy);
      primerDiaDeEstaSemana.setDate(hoy.getDate() - hoy.getDay());

      let cuentaCasco = 0;
      let cuentaChaleco = 0;
      let cuentaGuantes = 0;
      let cuentaLentes = 0;
      let cuentaOrejeras = 0;
      let cuentaRespirador = 0;
      let cuentaTotal = 0;

      // Filtrar incidentes de esta semana
      const incidentesEstaSemana = company.incidents.filter(incidente =>
        incidente.date >= primerDiaDeEstaSemana
      );

      // Iterar sobre los incidentes y contar los EPPs
      incidentesEstaSemana.forEach(incidente => {
        incidente.EPPs.forEach(epp => {
          switch (epp) {
            case 'Casco':
              cuentaCasco++;
              break;
            case 'Chaleco':
              cuentaChaleco++;
              break;
            case 'Guantes':
              cuentaGuantes++;
              break;
            case 'Lentes':
              cuentaLentes++;
              break;
            case 'Orejeras':
              cuentaOrejeras++;
              break;
            case 'Respirador':
              cuentaRespirador++;
              break;
            default:
              break;
          }
        });
      });

      // Calcular la cuenta total
      cuentaTotal = cuentaCasco + cuentaChaleco + cuentaGuantes + cuentaLentes + cuentaOrejeras + cuentaRespirador;

        // Crear el objeto de respuesta
    const statistics = {
        Casco: cuentaCasco,
        Chaleco: cuentaChaleco,
        Guantes: cuentaGuantes,
        Lentes: cuentaLentes,
        Orejeras: cuentaOrejeras,
        Respirador: cuentaRespirador,
        Total: cuentaTotal
    };

      return statistics ;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = StatsDAO;
