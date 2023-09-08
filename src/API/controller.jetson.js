const express = require('express');
const router = express.Router();
const JetsonDAO = require('../dao/class/dao.jetson');

const Jetson = new JetsonDAO;

// Obtener todos los jetsons de una compañía
router.get('/:companyId/jetsons', async (req, res) => {
  const companyId = req.params.companyId;
  try {
    const jetsons = await Jetson.getJetsonsByCompanyId(companyId);
    res.json(jetsons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Agregar un nuevo jetson a una compañía
router.post('/:companyId/jetsons', async (req, res) => {
  const companyId = req.params.companyId;
  const jetsonData = req.body;
  try {
    const newJetson = await Jetson.addJetson(companyId, jetsonData);
    res.json(newJetson);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
