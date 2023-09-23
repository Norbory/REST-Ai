const express = require('express');
const router = express.Router();
const JetsonDAO = require('../../dao/class/dao.jetson');

const Jetson= new JetsonDAO

// Obtener todas las Jetsons de una compañía
router.get('/:companyId/jetsons', async (req, res) => {
  const companyId = req.params.companyId;
  try {
    const jetsons = await Jetson.getJetsonsByCompanyId(companyId);
    res.json(jetsons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Obtener una Jetson por su ID
router.get('/:companyId/jetsons/:jetsonId', async (req, res) => {
  const companyId = req.params.companyId;
  const jetsonId = req.params.jetsonId;
  try {
    const jetson = await Jetson.getJetsonById(companyId, jetsonId);
    res.json(jetson);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Agregar una nueva Jetson a una compañía
router.post('/:companyId/jetsons', async (req, res) => {
  const companyId = req.params.companyId;
  const jetsonData = req.body;

  try {
    const newJetson = await Jetson.addJetson(companyId, jetsonData);
    res.status(201).json(newJetson);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Actualizar una Jetson existente
router.put('/:companyId/jetsons/:jetsonId', async (req, res) => {
  const companyId = req.params.companyId;
  const jetsonId = req.params.jetsonId;
  const newData = req.body;

  try {
    const updatedJetson = await Jetson.updateJetson(companyId, jetsonId, newData);
    res.json(updatedJetson);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Eliminar una Jetson por su ID
router.delete('/:companyId/jetsons/:jetsonId', async (req, res) => {
  const companyId = req.params.companyId;
  const jetsonId = req.params.jetsonId;

  try {
    const deletedJetson = await Jetson.deleteJetson(companyId, jetsonId);
    res.json(deletedJetson);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;