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

// Agregar un área a una compañía
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

// Agrega más rutas según tus necesidades (actualizar, eliminar, etc.)

module.exports = router;
