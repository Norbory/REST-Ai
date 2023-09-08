const express = require('express');
const router = express.Router();
const AreaDAO = require('../dao/class/dao.area');

const Area = new AreaDAO;

// Obtener todas las áreas de una compañía
router.get('/:companyId/areas', async (req, res) => {
  const companyId = req.params.companyId;
  try {
    const areas = await Area.getAreasByCompanyId(companyId);
    res.json(areas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Agregar una nueva área a una compañía
router.post('/:companyId/areas', async (req, res) => {
  const companyId = req.params.companyId;
  const areaData = req.body;
  try {
    const newArea = await Area.addArea(companyId, areaData);
    res.json(newArea);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
