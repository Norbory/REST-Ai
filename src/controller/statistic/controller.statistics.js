const { Router } = require('express')
const router = Router()
const StatsDAO = require('../../dao/class/dao.statistics');
const Statistics = new StatsDAO();

// POST /stats
router.get('/:companyId/statistics', async (req, res) => {
  try {
    const companyId = req.params.companyId;
    const statistics = await Statistics.getStatisticsByCompanyId_Week(companyId);

    res.json(statistics);
  } catch (error) {
    console.error('Error al obtener estadísticas:', error);
    res.status(500).json({ error: 'Error al obtener estadísticas' });
  }
});

module.exports = router;
