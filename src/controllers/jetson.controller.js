import {JetsonDAO} from '../dao/class/dao.jetson.js'

const Jetson = new JetsonDAO;

// Obtener todos los jetsons de una compañía
 export const getJetson = async (req, res) => {
  const companyId = req.params.companyId;
  try {
    const jetsons = await Jetson.getJetsonsByCompanyId(companyId);
    res.json(jetsons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Agregar un nuevo jetson a una compañía
export const addNewJetson = async (req, res) => {
  const companyId = req.params.companyId;
  const jetsonData = req.body;
  try {
    const newJetson = await Jetson.addJetson(companyId, jetsonData);
    res.json(newJetson);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


