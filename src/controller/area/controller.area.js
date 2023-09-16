const express = require('express');
const router = express.Router();

const AreaDAO = require('../../dao/class/dao.area');

// Obtener todas las áreas de una compañía
router.get('/:companyId/areas', async (req, res) => {
  const companyId = req.params.companyId;
  try {
    const areas = await AreaDAO.getAreasByCompanyId(companyId);
    res.json(areas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Obtener un área por su ID
router.get('/:companyId/areas/:areaId', async (req, res) => {
  const companyId = req.params.companyId;
  const areaId = req.params.areaId;
  try {
    const area = await AreaDAO.getAreaById(companyId, areaId);
    res.json(area);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Agregar una nueva área a una compañía
router.post('/:companyId/areas', async (req, res) => {
  const companyId = req.params.companyId;
  const areaData = req.body;

  try {
    const newArea = await AreaDAO.addArea(companyId, areaData);
    res.status(201).json(newArea);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Actualizar una área existente
router.put('/:companyId/areas/:areaId', async (req, res) => {
  const companyId = req.params.companyId;
  const areaId = req.params.areaId;
  const newData = req.body;

  try {
    const updatedArea = await AreaDAO.updateArea(companyId, areaId, newData);
    res.json(updatedArea);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Eliminar una área por su ID
router.delete('/:companyId/areas/:areaId', async (req, res) => {
  const companyId = req.params.companyId;
  const areaId = req.params.areaId;

  try {
    const deletedArea = await AreaDAO.deleteArea(companyId, areaId);
    res.json(deletedArea);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
